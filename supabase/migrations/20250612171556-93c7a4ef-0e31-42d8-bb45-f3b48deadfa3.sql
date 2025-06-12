
-- Fix RLS policies for contact_submissions to allow public form submissions
-- Drop existing restrictive policies
DROP POLICY IF EXISTS "Enable insert for all users" ON public.contact_submissions;
DROP POLICY IF EXISTS "Enable select for admins" ON public.contact_submissions;

-- Create a new policy that allows anyone to insert contact submissions
CREATE POLICY "Allow public contact form submissions" ON public.contact_submissions
  FOR INSERT 
  WITH CHECK (true);

-- Keep admin-only select policy for viewing submissions
CREATE POLICY "Admins can view contact submissions" ON public.contact_submissions
  FOR SELECT 
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM auth.users 
      WHERE auth.users.id = auth.uid() 
      AND auth.users.email LIKE '%@sparkstorm.ai'
    )
  );
