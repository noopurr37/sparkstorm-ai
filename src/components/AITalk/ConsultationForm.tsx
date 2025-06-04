
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { User, Mail, Users, CalendarDays } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const formSchema = z.object({
  name: z.string()
    .min(1, "Name is required")
    .max(100, "Name must be less than 100 characters")
    .regex(/^[a-zA-Z\s'-]+$/, "Name contains invalid characters"),
  email: z.string()
    .email("Invalid email address")
    .max(254, "Email must be less than 254 characters"),
  company: z.string()
    .optional()
    .refine((val) => !val || val.length <= 200, "Company name must be less than 200 characters"),
  topic: z.string()
    .min(1, "Topic is required")
    .max(200, "Topic must be less than 200 characters"),
  message: z.string()
    .optional()
    .refine((val) => !val || val.length <= 1000, "Message must be less than 1000 characters"),
});

type ConsultationFormData = z.infer<typeof formSchema>;

const ConsultationForm = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [lastSubmitTime, setLastSubmitTime] = useState(0);
  
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ConsultationFormData>({
    resolver: zodResolver(formSchema),
  });

  // Input sanitization function
  const sanitizeInput = (input: string): string => {
    return input
      .trim()
      .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '') // Remove script tags
      .replace(/[<>]/g, ''); // Remove HTML brackets
  };
  
  const onSubmit = async (data: ConsultationFormData) => {
    // Rate limiting: prevent submissions within 60 seconds
    const now = Date.now();
    if (now - lastSubmitTime < 60000) {
      toast({
        title: "Please wait",
        description: "Please wait 1 minute before submitting another request.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    
    try {
      console.log("Submitting consultation request:", data);
      
      // Sanitize all text inputs
      const sanitizedData = {
        name: sanitizeInput(data.name),
        email: data.email.trim().toLowerCase(),
        company: data.company ? sanitizeInput(data.company) : null,
        topic: sanitizeInput(data.topic),
        message: data.message ? sanitizeInput(data.message) : null
      };
      
      // Send data to Supabase
      const { error } = await supabase
        .from('consultation_requests')
        .insert(sanitizedData);
      
      if (error) throw error;
      
      setLastSubmitTime(now);
      
      toast({
        title: "Consultation Request Submitted",
        description: "We'll contact you shortly to schedule your consultation with Noopur.",
      });
      
      reset();
    } catch (error) {
      console.error("Error submitting form:", error);
      toast({
        title: "Error",
        description: "There was a problem submitting your request. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 bg-white p-6 rounded-lg shadow-sm border">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold">Request Consultation Information</h2>
        <p className="text-sm text-gray-500">
          Fill out this form to receive more information about scheduling a consultation
        </p>
      </div>
      
      <div className="grid gap-4">
        <div className="space-y-2">
          <Label htmlFor="name" className="flex items-center gap-2">
            <User className="h-4 w-4 text-primary" /> Your Name
          </Label>
          <Input
            id="name"
            placeholder="Full name"
            maxLength={100}
            {...register("name")}
          />
          {errors.name && (
            <p className="text-sm text-red-500">{errors.name.message}</p>
          )}
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="email" className="flex items-center gap-2">
            <Mail className="h-4 w-4 text-primary" /> Email Address
          </Label>
          <Input
            id="email"
            placeholder="you@example.com"
            type="email"
            maxLength={254}
            {...register("email")}
          />
          {errors.email && (
            <p className="text-sm text-red-500">{errors.email.message}</p>
          )}
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="company" className="flex items-center gap-2">
            <Users className="h-4 w-4 text-primary" /> Company (Optional)
          </Label>
          <Input
            id="company"
            placeholder="Your company name"
            maxLength={200}
            {...register("company")}
          />
          {errors.company && (
            <p className="text-sm text-red-500">{errors.company.message}</p>
          )}
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="topic" className="flex items-center gap-2">
            <CalendarDays className="h-4 w-4 text-primary" /> Consultation Topic
          </Label>
          <Input
            id="topic"
            placeholder="What would you like to discuss?"
            maxLength={200}
            {...register("topic")}
          />
          {errors.topic && (
            <p className="text-sm text-red-500">{errors.topic.message}</p>
          )}
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="message">Additional Information (Optional)</Label>
          <Textarea
            id="message"
            placeholder="Any specific questions or information about what you'd like to discuss"
            rows={4}
            maxLength={1000}
            {...register("message")}
          />
          {errors.message && (
            <p className="text-sm text-red-500">{errors.message.message}</p>
          )}
        </div>
      </div>
      
      <Button
        type="submit"
        className="w-full bg-primary hover:bg-primary/90"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Submitting..." : "Submit Request"}
      </Button>
      
      <p className="text-xs text-center text-gray-500">
        We'll get back to you within 2 business days to discuss your request in detail.
      </p>
    </form>
  );
};

export default ConsultationForm;
