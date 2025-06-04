
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Mail, AlertCircle, Check, Bell } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const MediWalletSignup = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [lastSubmitTime, setLastSubmitTime] = useState(0);
  const { toast } = useToast();

  // Input sanitization function
  const sanitizeInput = (input: string): string => {
    return input
      .trim()
      .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '') // Remove script tags
      .replace(/[<>]/g, ''); // Remove HTML brackets
  };

  // Enhanced email validation
  const isValidEmail = (email: string): boolean => {
    const emailPattern = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    return emailPattern.test(email) && email.length <= 254;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Rate limiting: prevent submissions within 30 seconds
    const now = Date.now();
    if (now - lastSubmitTime < 30000) {
      toast({
        title: "Please wait",
        description: "Please wait 30 seconds before signing up again.",
        variant: "destructive",
      });
      return;
    }
    
    if (!email) {
      toast({
        title: "Email Required",
        description: "Please enter your email address to sign up for MediWallet updates.",
        variant: "destructive",
      });
      return;
    }

    if (!isValidEmail(email)) {
      toast({
        title: "Invalid Email",
        description: "Please enter a valid email address.",
        variant: "destructive",
      });
      return;
    }

    if (name && name.length > 100) {
      toast({
        title: "Name too long",
        description: "Name must be less than 100 characters.",
        variant: "destructive",
      });
      return;
    }
    
    setIsSubmitting(true);

    try {
      console.log("Submitting MediWallet waitlist:", { email, name });
      
      // Sanitize inputs
      const sanitizedData = {
        email: email.trim().toLowerCase(),
        name: name ? sanitizeInput(name) : null
      };

      // Store in the waitlist table
      const { error } = await supabase
        .from('mediwallet_waitlist')
        .insert(sanitizedData);

      if (error) {
        // Check for duplicate email
        if (error.message.includes('duplicate') || error.code === '23505') {
          toast({
            title: "Already signed up",
            description: "This email is already on our waitlist.",
            variant: "destructive",
          });
          return;
        }
        throw error;
      }

      // Show success message
      setShowSuccess(true);
      setEmail("");
      setName("");
      setLastSubmitTime(now);
      
      toast({
        title: "Successfully signed up!",
        description: "You'll receive updates when MediWallet launches.",
      });
    } catch (error) {
      console.error('Error submitting form:', error);
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
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Input
              type="email"
              placeholder="Your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full"
              maxLength={254}
              required
            />
          </div>
          
          <div>
            <Input
              type="text"
              placeholder="Your name (optional)"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full"
              maxLength={100}
            />
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
