
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { User, Mail, Users, CalendarDays } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

const consultationSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100, "Name must be less than 100 characters"),
  email: z.string().trim().email("Invalid email address").max(255, "Email must be less than 255 characters"),
  company: z.string().trim().max(200, "Company must be less than 200 characters").optional(),
  topic: z.string().trim().min(1, "Topic is required").max(200, "Topic must be less than 200 characters"),
  message: z.string().trim().max(2000, "Message must be less than 2000 characters").optional(),
});

type ConsultationFormData = z.infer<typeof consultationSchema>;

const ConsultationForm = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ConsultationFormData>({
    resolver: zodResolver(consultationSchema),
  });
  
  const onSubmit = async (data: ConsultationFormData) => {
    setIsSubmitting(true);
    
    try {
      // Check rate limit
      const { data: rateLimitOk } = await supabase.rpc('check_rate_limit', {
        table_name: 'consultation_requests',
        email_address: data.email,
        time_window: '01:00:00',
        max_submissions: 3
      });

      if (!rateLimitOk) {
        toast({
          title: "Too many attempts",
          description: "Please wait before submitting another request",
          variant: "destructive",
        });
        setIsSubmitting(false);
        return;
      }

      // Send data to Supabase
      const { error } = await supabase
        .from('consultation_requests')
        .insert({
          name: data.name,
          email: data.email.toLowerCase(),
          company: data.company || null,
          topic: data.topic,
          message: data.message || null
        });
      
      if (error) throw error;
      
      toast({
        title: "Consultation Request Submitted",
        description: "We'll contact you shortly to schedule your consultation with Noopur.",
      });
      
      reset();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to submit request. Please try again.",
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
            {...register("name", { required: "Name is required" })}
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
            {...register("email", { 
              required: "Email is required",
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: "Please enter a valid email address",
              },
            })}
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
            {...register("company")}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="topic" className="flex items-center gap-2">
            <CalendarDays className="h-4 w-4 text-primary" /> Consultation Topic
          </Label>
          <Input
            id="topic"
            placeholder="What would you like to discuss?"
            {...register("topic", { required: "Topic is required" })}
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
            {...register("message")}
          />
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
