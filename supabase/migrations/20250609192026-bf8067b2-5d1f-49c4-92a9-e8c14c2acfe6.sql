
-- Update the RLS policy for contact submissions to allow public access
DROP POLICY IF EXISTS "Anyone can submit contact forms" ON public.contact_submissions;

-- Create a new policy that allows anyone to submit contact forms (no authentication required)
CREATE POLICY "Anyone can submit contact forms" ON public.contact_submissions
  FOR INSERT WITH CHECK (true);

-- Ensure the policy for viewing contact submissions remains admin-only
DROP POLICY IF EXISTS "Only admins can view contact submissions" ON public.contact_submissions;

CREATE POLICY "Only admins can view contact submissions" ON public.contact_submissions
  FOR SELECT USING (public.is_admin());
