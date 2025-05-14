
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { CalendarDays, User, Mail, Users, Speaker } from "lucide-react";

interface AITalkRequestFormData {
  name: string;
  email: string;
  organization: string;
  eventDate: string;
  audienceSize: string;
  topic: string;
  additionalInfo: string;
}

const AITalkRequestForm = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AITalkRequestFormData>();
  
  const onSubmit = async (data: AITalkRequestFormData) => {
    setIsSubmitting(true);
    
    try {
      // Here you would typically send the data to your server/API
      console.log("Form submitted:", data);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Request Submitted",
        description: "We'll get back to you soon regarding your AI talk request.",
      });
      
      reset();
    } catch (error) {
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
