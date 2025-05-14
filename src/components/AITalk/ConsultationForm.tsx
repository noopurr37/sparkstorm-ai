import { useState } from "react";
import { useForm } from "react-hook-form";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { User, Mail, Users, CalendarDays } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import RequireAuth from "@/components/RequireAuth";

interface ConsultationFormData {
  name: string;
  email: string;
  company?: string;
  topic: string;
  message?: string;
}

const ConsultationForm = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ConsultationFormData>();
  
  const onSubmit = async (data: ConsultationFormData) => {
    setIsSubmitting(true);
    
    try {
      // Send data to Supabase
      const { error } = await supabase
        .from('consultation_requests')
        .insert({
          name: data.name,
          email: data.email,
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
    <RequireAuth feature="Consultation Booking">
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
    </RequireAuth>
  );
};

export default ConsultationForm;
