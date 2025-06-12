
-- Fix RLS policies on the correct table that the form is actually using
-- First, let's check and fix the contact_submissions table (which the form actually uses)

-- Drop any existing policies on contact_submissions
DROP POLICY IF EXISTS "Public can insert contact submissions" ON public.contact_submissions;
DROP POLICY IF EXISTS "Admins can view contact submissions" ON public.contact_submissions;
DROP POLICY IF EXISTS "Enable insert for all users" ON public.contact_submissions;
DROP POLICY IF EXISTS "Enable select for admins" ON public.contact_submissions;

-- Disable and re-enable RLS to clear any caching
ALTER TABLE public.contact_submissions DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_submissions ENABLE ROW LEVEL SECURITY;

-- Create a very permissive insert policy for contact_submissions
CREATE POLICY "Enable insert for all users" ON public.contact_submissions
  FOR INSERT 
  WITH CHECK (true);

-- Create a select policy for admins on contact_submissions
CREATE POLICY "Enable select for admins" ON public.contact_submissions
  FOR SELECT 
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM auth.users 
      WHERE auth.users.id = auth.uid() 
      AND auth.users.email LIKE '%@sparkstorm.ai'
    )
  );
