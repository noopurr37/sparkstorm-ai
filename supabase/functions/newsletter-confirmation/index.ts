
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.8";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface NewsletterRequest {
  email: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { email }: NewsletterRequest = await req.json();
    
    // Create a Supabase client for database operations
    const supabaseUrl = Deno.env.get("SUPABASE_URL") || "https://ykcidfmkvreidsuscert.supabase.co";
    const supabaseKey = Deno.env.get("SUPABASE_ANON_KEY") || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlrY2lkZm1rdnJlaWRzdXNjZXJ0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDU1MzM3MDgsImV4cCI6MjA2MTEwOTcwOH0.GpYPY1nmmrv2tgaMzt5K-6P4lE347Vt_SoaUgYrX93g";
    const supabase = createClient(supabaseUrl, supabaseKey);
    
    // Log the subscription
    console.log(`Newsletter subscription received for: ${email}`);
    
    // Store email in database
    const { error: dbError } = await supabase
      .from('newsletter_subscribers')
      .insert({ email })
      .select()
      .single();
      
    // If error is not a duplicate key error
    if (dbError && !dbError.message.includes('duplicate')) {
      console.error("Database error:", dbError);
      throw new Error(`Database error: ${dbError.message}`);
    }
    
    // In a real application, you would send the email via a service like Resend, SendGrid, etc.
    // For now, we'll use a mock implementation
    const emailResponse = {
      id: `newsletter-${Date.now()}`,
      status: "sent",
      email: email,
      message: "Thank you for subscribing to the SparkStorm AI newsletter!"
    };
    
    // Log successful operation
    console.log("Newsletter subscription processed successfully for:", email);

    return new Response(JSON.stringify(emailResponse), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error in newsletter-confirmation function:", error);
    
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
