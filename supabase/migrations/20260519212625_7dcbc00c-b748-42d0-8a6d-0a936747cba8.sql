-- 1. Harden check_rate_limit: allow-list tables + cap time window to prevent enumeration
CREATE OR REPLACE FUNCTION public.check_rate_limit(
  table_name text,
  email_address text,
  time_window interval DEFAULT '01:00:00'::interval,
  max_submissions integer DEFAULT 5
)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $function$
DECLARE
  submission_count INTEGER;
  effective_window INTERVAL;
BEGIN
  -- Hard allow-list of tables that public forms may rate-limit against
  IF table_name NOT IN (
    'newsletter_subscriptions',
    'contact_submissions',
    'consultation_requests',
    'ai_talk_requests',
    'mediwallet_waitlist'
  ) THEN
    RAISE EXCEPTION 'Invalid table for rate limiting';
  END IF;

  -- Cap lookback to 24h so callers cannot probe history (e.g. '100 years')
  IF time_window IS NULL OR time_window > INTERVAL '24 hours' THEN
    effective_window := INTERVAL '24 hours';
  ELSE
    effective_window := time_window;
  END IF;

  EXECUTE format(
    'SELECT COUNT(*) FROM public.%I WHERE email = $1 AND created_at > NOW() - $2',
    table_name
  ) USING email_address, effective_window INTO submission_count;

  RETURN submission_count < max_submissions;
END;
$function$;

-- 2. Drop duplicate INSERT policies (keep the "submit" variant)
DROP POLICY IF EXISTS "Anyone can insert AI talk requests" ON public.ai_talk_requests;
DROP POLICY IF EXISTS "Anyone can insert consultation requests" ON public.consultation_requests;
DROP POLICY IF EXISTS "Anyone can insert waitlist entries" ON public.mediwallet_waitlist;

-- Also drop the redundant duplicate SELECT policy on contact_submissions
DROP POLICY IF EXISTS "Admins can view contact submissions" ON public.contact_submissions;

-- 3. Remove contact_submissions (PII) from realtime publication
DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM pg_publication_tables
    WHERE pubname = 'supabase_realtime'
      AND schemaname = 'public'
      AND tablename = 'contact_submissions'
  ) THEN
    EXECUTE 'ALTER PUBLICATION supabase_realtime DROP TABLE public.contact_submissions';
  END IF;
END $$;