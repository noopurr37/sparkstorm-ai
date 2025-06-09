
-- Let's disable RLS temporarily to ensure we can insert
ALTER TABLE public.contact_form_submissions DISABLE ROW LEVEL SECURITY;

-- Re-enable it
ALTER TABLE public.contact_form_submissions ENABLE ROW LEVEL SECURITY;

-- Drop all existing policies to start fresh
DROP POLICY IF EXISTS "Public can insert contact forms" ON public.contact_form_submissions;
DROP POLICY IF EXISTS "Admins can view contact submissions" ON public.contact_form_submissions;
DROP POLICY IF EXISTS "Anyone can submit contact forms" ON public.contact_form_submissions;
DROP POLICY IF EXISTS "Allow public contact form submissions" ON public.contact_form_submissions;
DROP POLICY IF EXISTS "Only admins can view contact submissions" ON public.contact_form_submissions;

-- Create a very permissive insert policy
CREATE POLICY "Enable insert for all users" ON public.contact_form_submissions
  FOR INSERT 
  WITH CHECK (true);

-- Create a select policy for admins
CREATE POLICY "Enable select for admins" ON public.contact_form_submissions
  FOR SELECT 
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM auth.users 
      WHERE auth.users.id = auth.uid() 
      AND auth.users.email LIKE '%@sparkstorm.ai'
    )
  );
