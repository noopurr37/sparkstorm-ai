
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { CalendarDays, User, Mail, Users, Speaker } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { AITalkRequestFormData } from "@/components/contact/types";
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
  organization: z.string()
    .min(1, "Organization is required")
    .max(200, "Organization name must be less than 200 characters"),
  eventDate: z.string()
    .min(1, "Event date is required")
    .refine((date) => new Date(date) > new Date(), "Event date must be in the future"),
  audienceSize: z.string()
    .optional()
    .refine((val) => !val || /^\d+$/.test(val), "Audience size must be a number"),
  topic: z.string()
    .min(1, "Topic is required")
    .max(200, "Topic must be less than 200 characters"),
  additionalInfo: z.string()
    .optional()
    .refine((val) => !val || val.length <= 1000, "Additional info must be less than 1000 characters"),
});

type FormData = z.infer<typeof formSchema>;

const AITalkRequestForm = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [lastSubmitTime, setLastSubmitTime] = useState(0);
  
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  // Input sanitization function
  const sanitizeInput = (input: string): string => {
    return input
      .trim()
      .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '') // Remove script tags
      .replace(/[<>]/g, ''); // Remove HTML brackets
  };
  
  const onSubmit = async (data: FormData) => {
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
      console.log("Submitting AI talk request:", data);
      
      // Sanitize all text inputs
      const sanitizedData = {
        name: sanitizeInput(data.name),
        email: data.email.trim().toLowerCase(),
        organization: sanitizeInput(data.organization),
        event_date: data.eventDate,
        audience_size: data.audienceSize ? sanitizeInput(data.audienceSize) : null,
        topic: sanitizeInput(data.topic),
        additional_info: data.additionalInfo ? sanitizeInput(data.additionalInfo) : null
      };
      
      // Send data to Supabase
      const { error } = await supabase
        .from('ai_talk_requests')
        .insert(sanitizedData);
      
      if (error) throw error;
      
      setLastSubmitTime(now);
      
      toast({
        title: "Request Submitted",
        description: "We'll get back to you soon regarding your AI talk request.",
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
        <h2 className="text-2xl font-bold">Request AI Talk</h2>
        <p className="text-sm text-gray-500">
          Fill out this form to request a custom AI talk for your event or organization
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
          <Label htmlFor="organization" className="flex items-center gap-2">
            <Users className="h-4 w-4 text-primary" /> Organization
          </Label>
          <Input
            id="organization"
            placeholder="Company or organization name"
            maxLength={200}
            {...register("organization")}
          />
          {errors.organization && (
            <p className="text-sm text-red-500">{errors.organization.message}</p>
          )}
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="eventDate" className="flex items-center gap-2">
              <CalendarDays className="h-4 w-4 text-primary" /> Event Date
            </Label>
            <Input
              id="eventDate"
              type="date"
              min={new Date().toISOString().split('T')[0]}
              {...register("eventDate")}
            />
            {errors.eventDate && (
              <p className="text-sm text-red-500">{errors.eventDate.message}</p>
            )}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="audienceSize" className="flex items-center gap-2">
              <Users className="h-4 w-4 text-primary" /> Audience Size
            </Label>
            <Input
              id="audienceSize"
              placeholder="Estimated number"
              pattern="[0-9]*"
              {...register("audienceSize")}
            />
            {errors.audienceSize && (
              <p className="text-sm text-red-500">{errors.audienceSize.message}</p>
            )}
          </div>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="topic" className="flex items-center gap-2">
            <Speaker className="h-4 w-4 text-primary" /> Preferred Topic
          </Label>
          <Input
            id="topic"
            placeholder="AI topic you're interested in"
            maxLength={200}
            {...register("topic")}
          />
          {errors.topic && (
            <p className="text-sm text-red-500">{errors.topic.message}</p>
          )}
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="additionalInfo">Additional Information</Label>
          <Textarea
            id="additionalInfo"
            placeholder="Any specific requirements, questions, or details about your event"
            rows={4}
            maxLength={1000}
            {...register("additionalInfo")}
          />
          {errors.additionalInfo && (
            <p className="text-sm text-red-500">{errors.additionalInfo.message}</p>
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

export default AITalkRequestForm;
