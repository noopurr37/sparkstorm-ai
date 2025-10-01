
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { CalendarDays, User, Mail, Users, Speaker } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

const aiTalkSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100, "Name must be less than 100 characters"),
  email: z.string().trim().email("Invalid email address").max(255, "Email must be less than 255 characters"),
  organization: z.string().trim().min(1, "Organization is required").max(200, "Organization must be less than 200 characters"),
  eventDate: z.string().min(1, "Event date is required"),
  audienceSize: z.string().trim().max(100, "Audience size must be less than 100 characters").optional(),
  topic: z.string().trim().min(1, "Topic is required").max(200, "Topic must be less than 200 characters"),
  additionalInfo: z.string().trim().max(2000, "Additional info must be less than 2000 characters").optional(),
});

type AITalkRequestFormData = z.infer<typeof aiTalkSchema>;

const AITalkRequestForm = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AITalkRequestFormData>({
    resolver: zodResolver(aiTalkSchema),
  });
  
  const onSubmit = async (data: AITalkRequestFormData) => {
    setIsSubmitting(true);
    
    try {
      // Check rate limit
      const { data: rateLimitOk } = await supabase.rpc('check_rate_limit', {
        table_name: 'ai_talk_requests',
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
        .from('ai_talk_requests')
        .insert({
          name: data.name,
          email: data.email.toLowerCase(),
          organization: data.organization,
          event_date: data.eventDate,
          audience_size: data.audienceSize || null,
          topic: data.topic,
          additional_info: data.additionalInfo || null
        });
      
      if (error) throw error;
      
      toast({
        title: "Request Submitted",
        description: "We'll get back to you soon regarding your AI talk request.",
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
          <Label htmlFor="organization" className="flex items-center gap-2">
            <Users className="h-4 w-4 text-primary" /> Organization
          </Label>
          <Input
            id="organization"
            placeholder="Company or organization name"
            {...register("organization", { required: "Organization is required" })}
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
              {...register("eventDate", { required: "Date is required" })}
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
              {...register("audienceSize")}
            />
          </div>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="topic" className="flex items-center gap-2">
            <Speaker className="h-4 w-4 text-primary" /> Preferred Topic
          </Label>
          <Input
            id="topic"
            placeholder="AI topic you're interested in"
            {...register("topic", { required: "Topic is required" })}
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
            {...register("additionalInfo")}
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

export default AITalkRequestForm;
