
-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Anyone can submit contact forms" ON public.contact_submissions;
DROP POLICY IF EXISTS "Only admins can view contact submissions" ON public.contact_submissions;
DROP POLICY IF EXISTS "Anyone can submit AI talk requests" ON public.ai_talk_requests;
DROP POLICY IF EXISTS "Only admins can view AI talk requests" ON public.ai_talk_requests;
DROP POLICY IF EXISTS "Anyone can submit consultation requests" ON public.consultation_requests;
DROP POLICY IF EXISTS "Only admins can view consultation requests" ON public.consultation_requests;
DROP POLICY IF EXISTS "Anyone can join waitlist" ON public.mediwallet_waitlist;
DROP POLICY IF EXISTS "Only admins can view waitlist" ON public.mediwallet_waitlist;
DROP POLICY IF EXISTS "Anyone can subscribe to newsletter" ON public.newsletter_subscriptions;
DROP POLICY IF EXISTS "Only admins can view newsletter subscriptions" ON public.newsletter_subscriptions;

-- Drop existing constraints if they exist
ALTER TABLE public.contact_submissions DROP CONSTRAINT IF EXISTS check_contact_rate_limit;
ALTER TABLE public.ai_talk_requests DROP CONSTRAINT IF EXISTS check_ai_talk_rate_limit;
ALTER TABLE public.consultation_requests DROP CONSTRAINT IF EXISTS check_consultation_rate_limit;

-- Enable Row Level Security on all public-facing tables
ALTER TABLE public.contact_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ai_talk_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.consultation_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.mediwallet_waitlist ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.newsletter_subscriptions ENABLE ROW LEVEL SECURITY;

-- Create a security definer function to check if user is admin
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN AS $$
BEGIN
  -- For now, we'll check if the user has a specific email domain
  -- You can modify this logic based on your admin identification needs
  RETURN (
    SELECT CASE 
      WHEN auth.email() LIKE '%@sparkstorm.ai' THEN true
      ELSE false
    END
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER STABLE;

-- Allow public INSERT access for form submissions (people need to submit forms)
-- But restrict SELECT access to admins only

-- Contact submissions policies
CREATE POLICY "Anyone can submit contact forms" ON public.contact_submissions
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Only admins can view contact submissions" ON public.contact_submissions
  FOR SELECT USING (public.is_admin());

-- AI talk requests policies  
CREATE POLICY "Anyone can submit AI talk requests" ON public.ai_talk_requests
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Only admins can view AI talk requests" ON public.ai_talk_requests
  FOR SELECT USING (public.is_admin());

-- Consultation requests policies
CREATE POLICY "Anyone can submit consultation requests" ON public.consultation_requests
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Only admins can view consultation requests" ON public.consultation_requests
  FOR SELECT USING (public.is_admin());

-- MediWallet waitlist policies
CREATE POLICY "Anyone can join waitlist" ON public.mediwallet_waitlist
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Only admins can view waitlist" ON public.mediwallet_waitlist
  FOR SELECT USING (public.is_admin());

-- Newsletter subscriptions policies
CREATE POLICY "Anyone can subscribe to newsletter" ON public.newsletter_subscriptions
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Only admins can view newsletter subscriptions" ON public.newsletter_subscriptions
  FOR SELECT USING (public.is_admin());

-- Add rate limiting function to prevent spam
CREATE OR REPLACE FUNCTION public.check_rate_limit(
  table_name TEXT,
  email_address TEXT,
  time_window INTERVAL DEFAULT '1 hour'::INTERVAL,
  max_submissions INTEGER DEFAULT 5
)
RETURNS BOOLEAN AS $$
DECLARE
  submission_count INTEGER;
BEGIN
  -- Check submission count in the time window
  EXECUTE format(
    'SELECT COUNT(*) FROM public.%I WHERE email = $1 AND created_at > NOW() - $2',
    table_name
  ) USING email_address, time_window INTO submission_count;
  
  RETURN submission_count < max_submissions;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Add constraint to enforce rate limiting on contact submissions
ALTER TABLE public.contact_submissions 
ADD CONSTRAINT check_contact_rate_limit 
CHECK (public.check_rate_limit('contact_submissions', email));

-- Add constraint to enforce rate limiting on AI talk requests
ALTER TABLE public.ai_talk_requests 
ADD CONSTRAINT check_ai_talk_rate_limit 
CHECK (public.check_rate_limit('ai_talk_requests', email));

-- Add constraint to enforce rate limiting on consultation requests
ALTER TABLE public.consultation_requests 
ADD CONSTRAINT check_consultation_rate_limit 
CHECK (public.check_rate_limit('consultation_requests', email));
