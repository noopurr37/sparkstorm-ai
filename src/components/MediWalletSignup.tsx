import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Check, Bell } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const waitlistSchema = z.object({
  email: z.string().trim().email("Invalid email address").max(255, "Email must be less than 255 characters"),
  name: z.string().trim().max(100, "Name must be less than 100 characters").optional(),
});

type WaitlistFormData = z.infer<typeof waitlistSchema>;

const MediWalletSignup = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<WaitlistFormData>({
    resolver: zodResolver(waitlistSchema),
  });

  const onSubmit = async (data: WaitlistFormData) => {
    setIsSubmitting(true);

    try {
      const { data: rateLimitOk } = await supabase.rpc('check_rate_limit', {
        table_name: 'mediwallet_waitlist',
        email_address: data.email,
        time_window: '01:00:00',
        max_submissions: 3,
      });

      if (!rateLimitOk) {
        toast({
          title: "Too many attempts",
          description: "Please wait before submitting another request.",
          variant: "destructive",
        });
        setIsSubmitting(false);
        return;
      }

      const { error } = await supabase
        .from('mediwallet_waitlist')
        .insert({ email: data.email.toLowerCase(), name: data.name || null });

      if (error) throw error;

      setShowSuccess(true);
      reset();

      toast({
        title: "Successfully signed up!",
        description: "You'll receive updates when MediWallet launches.",
      });
    } catch (error) {
      console.error('Error submitting form');
      toast({
        title: "Sign-up failed",
        description: "There was an error signing up. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-gradient-to-b from-blue-50 to-white p-6 md:p-8 rounded-lg shadow-sm border border-blue-100">
      <h3 className="text-xl md:text-2xl font-bold text-navy-blue mb-3">
        Sign Up for MediWallet Updates
      </h3>

      <p className="text-gray-600 mb-6">
        Join our waitlist to be the first to know when MediWallet launches and get access to exclusive features.
      </p>

      {showSuccess ? (
        <Alert className="bg-green-50 border-green-200">
          <Check className="h-4 w-4 text-green-600" />
          <AlertTitle className="text-green-700">Thank you for signing up!</AlertTitle>
          <AlertDescription className="text-green-600">
            We'll notify you when MediWallet launches with early access opportunities.
          </AlertDescription>
        </Alert>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <Input
              type="email"
              placeholder="Your email address"
              className="w-full"
              {...register("email")}
            />
            {errors.email && (
              <p className="text-sm text-red-500 mt-1">{errors.email.message}</p>
            )}
          </div>

          <div>
            <Input
              type="text"
              placeholder="Your name (optional)"
              className="w-full"
              {...register("name")}
            />
            {errors.name && (
              <p className="text-sm text-red-500 mt-1">{errors.name.message}</p>
            )}
          </div>

          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-primary hover:bg-primary/90"
          >
            {isSubmitting ? (
              <>Signing up...</>
            ) : (
              <>
                <Bell className="mr-2 h-4 w-4" />
                Get Updates
              </>
            )}
          </Button>

          <p className="text-xs text-gray-500 text-center">
            By signing up, you'll receive important updates about MediWallet's launch and features.
          </p>
        </form>
      )}
    </div>
  );
};

export default MediWalletSignup;
