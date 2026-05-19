
-- Fix storage policies for course-videos: use is_admin() instead of broken service_role check
DROP POLICY IF EXISTS "Admins can upload course videos" ON storage.objects;
DROP POLICY IF EXISTS "Admins can update course videos" ON storage.objects;
DROP POLICY IF EXISTS "Admins can delete course videos" ON storage.objects;

CREATE POLICY "Admins can upload course videos"
ON storage.objects FOR INSERT TO authenticated
WITH CHECK (bucket_id = 'course-videos' AND public.is_admin());

CREATE POLICY "Admins can update course videos"
ON storage.objects FOR UPDATE TO authenticated
USING (bucket_id = 'course-videos' AND public.is_admin());

CREATE POLICY "Admins can delete course videos"
ON storage.objects FOR DELETE TO authenticated
USING (bucket_id = 'course-videos' AND public.is_admin());

-- Restrict Realtime channel subscriptions to admins only (covers contact_submissions exposure)
ALTER TABLE IF EXISTS realtime.messages ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Admins only can subscribe to realtime" ON realtime.messages;
CREATE POLICY "Admins only can subscribe to realtime"
ON realtime.messages FOR SELECT TO authenticated
USING (public.is_admin());

-- Pin search_path on functions and revoke broad EXECUTE on is_admin
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS boolean
LANGUAGE plpgsql
STABLE SECURITY DEFINER
SET search_path = public
AS $function$
BEGIN
  RETURN (
    SELECT CASE 
      WHEN auth.email() LIKE '%@sparkstorm.ai' THEN true
      ELSE false
    END
  );
END;
$function$;

CREATE OR REPLACE FUNCTION public.check_rate_limit(table_name text, email_address text, time_window interval DEFAULT '01:00:00'::interval, max_submissions integer DEFAULT 5)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $function$
DECLARE
  submission_count INTEGER;
BEGIN
  EXECUTE format(
    'SELECT COUNT(*) FROM public.%I WHERE email = $1 AND created_at > NOW() - $2',
    table_name
  ) USING email_address, time_window INTO submission_count;
  RETURN submission_count < max_submissions;
END;
$function$;

REVOKE EXECUTE ON FUNCTION public.is_admin() FROM anon, authenticated, public;
