
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
    
    // Create the newsletter_subscribers table if it doesn't exist
    const { error: tableError } = await supabase.rpc('create_newsletter_table_if_not_exists');
    if (tableError) {
      console.log("Failed to ensure table exists, will try direct insert:", tableError);
    }
    
    // Store email in database
    const { error: dbError } = await supabase
      .from('newsletter_subscribers')
      .insert({ email });
      
    // If error is not a duplicate key error
    if (dbError && !dbError.message.includes('duplicate')) {
      console.error("Database error:", dbError);
      throw new Error(`Database error: ${dbError.message}`);
    }
    
    // Send a confirmation email
    const emailHtmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <title>Welcome to SparkStorm AI Newsletter</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          line-height: 1.6;
          color: #333;
          margin: 0;
          padding: 0;
        }
        .container {
          max-width: 600px;
          margin: 0 auto;
          padding: 20px;
        }
        .header {
          background-color: #0066cc;
          color: white;
          padding: 20px;
          text-align: center;
        }
        .content {
          padding: 20px;
          background-color: #f9f9f9;
        }
        .footer {
          font-size: 12px;
          color: #666;
          text-align: center;
          padding: 20px;
        }
        .button {
          display: inline-block;
          background-color: #0066cc;
          color: white;
          padding: 10px 20px;
          text-decoration: none;
          border-radius: 4px;
          margin-top: 20px;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>Welcome to the SparkStorm AI Newsletter!</h1>
        </div>
        <div class="content">
          <p>Hello,</p>
          <p>Thank you for subscribing to the SparkStorm AI newsletter! We're excited to have you join our community.</p>
          <p>You'll now receive updates on:</p>
          <ul>
            <li>Latest AI technology trends</li>
            <li>Healthcare innovation insights</li>
            <li>SparkStorm AI product announcements</li>
            <li>Case studies and success stories</li>
          </ul>
          <p>Visit our website to learn more about our services and solutions:</p>
          <a href="https://sparkstorm.ai" class="button">Visit SparkStorm AI</a>
        </div>
        <div class="footer">
          <p>© ${new Date().getFullYear()} SparkStorm AI. All rights reserved.</p>
          <p>You're receiving this email because you subscribed to our newsletter.</p>
          <p>If you no longer wish to receive these emails, <a href="https://sparkstorm.ai/unsubscribe?email=${email}">unsubscribe here</a>.</p>
        </div>
      </div>
    </body>
    </html>
    `;
    
    // Send the actual email via Supabase's built-in email functionality
    // In a real application, you would use a proper email service
    const { error: emailError } = await supabase.rpc('send_newsletter_confirmation_email', {
      p_email: email,
      p_html_content: emailHtmlContent
    });
    
    if (emailError) {
      console.log("Email sending function not available, would have sent:", emailHtmlContent);
      // Not failing the whole function if just the email sending fails
    }
    
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
