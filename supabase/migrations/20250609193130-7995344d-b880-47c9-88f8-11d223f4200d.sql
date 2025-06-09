
-- Drop the existing policy that might be causing issues
DROP POLICY IF EXISTS "Anyone can submit contact forms" ON public.contact_form_submissions;

-- Create a new policy that properly allows public access for inserts
CREATE POLICY "Allow public contact form submissions" ON public.contact_form_submissions
  FOR INSERT WITH CHECK (true);
