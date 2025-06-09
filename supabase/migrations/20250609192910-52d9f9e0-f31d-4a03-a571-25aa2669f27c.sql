
-- Create a table for contact form submissions
CREATE TABLE public.contact_form_submissions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT,
  email TEXT NOT NULL,
  phone TEXT,
  message TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.contact_form_submissions ENABLE ROW LEVEL SECURITY;

-- Create policy to allow anyone to submit contact forms (public access)
CREATE POLICY "Anyone can submit contact forms" ON public.contact_form_submissions
  FOR INSERT WITH CHECK (true);

-- Create policy to restrict viewing to admins only (you can modify this later)
CREATE POLICY "Only admins can view contact submissions" ON public.contact_form_submissions
  FOR SELECT USING (false); -- For now, no one can view - you can update this with proper admin logic later
