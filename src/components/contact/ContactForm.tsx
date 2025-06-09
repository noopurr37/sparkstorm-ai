
import { useState } from "react";
import { MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

const formSchema = z.object({
  name: z.string()
    .min(1, "Name is required")
    .max(100, "Name must be less than 100 characters")
    .regex(/^[a-zA-Z\s'-]+$/, "Name contains invalid characters"),
  email: z.string()
    .email("Invalid email address")
    .max(254, "Email must be less than 254 characters"),
  phone: z.string()
    .optional()
    .refine((val) => !val || /^[\+]?[1-9][\d]{0,15}$/.test(val), "Invalid phone number"),
  subject: z.string()
    .optional()
    .refine((val) => !val || val.length <= 200, "Subject must be less than 200 characters"),
  message: z.string()
    .min(1, "Message is required")
    .max(2000, "Message must be less than 2000 characters"),
});

type FormValues = z.infer<typeof formSchema>;

const ContactForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [lastSubmitTime, setLastSubmitTime] = useState(0);
  const { toast } = useToast();
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
    },
  });

  const sanitizeInput = (input: string): string => {
    return input
      .trim()
      .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
      .replace(/[<>]/g, '');
  };

  const handleSubmit = async (formData: FormValues) => {
    const now = Date.now();
    if (now - lastSubmitTime < 30000) {
      toast({
        title: "Please wait",
        description: "Please wait 30 seconds before submitting another message.",
        variant: "destructive",
      });
      return;
    }

    console.log("Form submission started");
    console.log("Current URL:", window.location.href);
    console.log("Supabase URL:", "https://ykcidfmkvreidsuscert.supabase.co");
    
    setIsSubmitting(true);
    
    try {
      const insertData = {
        name: sanitizeInput(formData.name),
        email: formData.email.trim().toLowerCase(),
        phone: formData.phone ? sanitizeInput(formData.phone) : null,
        subject: formData.subject ? sanitizeInput(formData.subject) : null,
        message: sanitizeInput(formData.message)
      };
      
      console.log("Attempting to insert data:", insertData);
      
      // Test connection with a simple query first
      console.log("Testing Supabase connection...");
      const { data: testData, error: testError } = await supabase
        .from('contact_submissions')
        .select('count', { count: 'exact', head: true });
      
      if (testError) {
        console.error("Connection test failed:", testError);
        throw new Error(`Connection failed: ${testError.message}`);
      }
      
      console.log("Connection test successful, proceeding with insert...");
      
      const { data, error } = await supabase
        .from('contact_submissions')
        .insert(insertData)
        .select();

      if (error) {
        console.error("Insert error:", error);
        throw error;
      }

      console.log("Form submitted successfully:", data);
      setLastSubmitTime(now);
      
      toast({
        title: "Message Sent!",
        description: "Thank you for your inquiry. We'll get back to you soon.",
      });
      
      form.reset();
    } catch (error: any) {
      console.error('Error submitting form:', error);
      
      let errorMessage = "There was an error sending your message.";
      
      // Handle specific error types
      if (error.message?.includes('Failed to fetch') || error.name === 'TypeError') {
        errorMessage = "Unable to connect to the server. This might be a network or CORS issue. Please check that you're accessing the site from an allowed domain.";
      } else if (error.message?.includes('CORS')) {
        errorMessage = "CORS error: The current domain is not allowed to connect to the backend. Please contact support.";
      } else if (error.code === 'PGRST301') {
        errorMessage = "Database connection issue. Please try again in a moment.";
      } else if (error.message && error.message.length < 200) {
        errorMessage = error.message;
      }
      
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="glass-card p-8">
      <h3 className="text-2xl font-bold mb-6">Send Us a Message</h3>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Full Name <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Your name"
                      {...field}
                      disabled={isSubmitting}
                      maxLength={100}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Email <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="your@email.com"
                      {...field}
                      disabled={isSubmitting}
                      maxLength={254}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Your phone number"
                      {...field}
                      disabled={isSubmitting}
                      maxLength={20}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="subject"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Subject</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="How can we help?"
                      {...field}
                      disabled={isSubmitting}
                      maxLength={200}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          
          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Message <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Your message"
                    rows={5}
                    className="resize-none"
                    {...field}
                    disabled={isSubmitting}
                    maxLength={2000}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <div>
            <Button type="submit" className="btn-primary" disabled={isSubmitting}>
              <MessageSquare className="mr-2 h-4 w-4" />
              {isSubmitting ? "Sending..." : "Send Message"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default ContactForm;
