
-- First, let's completely clean up any existing policies
DROP POLICY IF EXISTS "Anyone can submit contact forms" ON public.contact_form_submissions;
DROP POLICY IF EXISTS "Allow public contact form submissions" ON public.contact_form_submissions;
DROP POLICY IF EXISTS "Only admins can view contact submissions" ON public.contact_form_submissions;

-- Now create a single, clear policy for public insertions
CREATE POLICY "Public can insert contact forms" ON public.contact_form_submissions
  FOR INSERT TO anon, authenticated WITH CHECK (true);

-- And a separate policy for viewing (admins only)
CREATE POLICY "Admins can view contact submissions" ON public.contact_form_submissions
  FOR SELECT TO authenticated USING (
    EXISTS (
      SELECT 1 FROM auth.users 
      WHERE auth.users.id = auth.uid() 
      AND auth.users.email LIKE '%@sparkstorm.ai'
    )
  );
