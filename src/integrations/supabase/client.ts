// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://ykcidfmkvreidsuscert.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlrY2lkZm1rdnJlaWRzdXNjZXJ0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDU1MzM3MDgsImV4cCI6MjA2MTEwOTcwOH0.GpYPY1nmmrv2tgaMzt5K-6P4lE347Vt_SoaUgYrX93g";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);