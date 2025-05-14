
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Mail, AlertCircle, Check, Bell, Lock, UserPlus } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Link } from "react-router-dom";

const MediWalletSignup = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      toast({
        title: "Email Required",
        description: "Please enter your email address to sign up for MediWallet updates.",
        variant: "destructive",
      });
      return;
    }
    
    setIsSubmitting(true);

    try {
      // Store in the waitlist table
      const { error } = await supabase
        .from('mediwallet_waitlist')
        .insert({ email, name: name || null });

      if (error) throw error;

      // Show success message
      setShowSuccess(true);
      setEmail("");
      setName("");
      
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
      
      <p className="text-gray-600 mb-4">
        Join our waitlist to be the first to know when MediWallet launches and get access to exclusive features.
      </p>

      <div className="bg-blue-50 p-4 rounded-md mb-6">
        <div className="flex items-start gap-2">
          <Lock className="h-5 w-5 text-blue-600 mt-0.5" />
          <div>
            <h4 className="font-medium text-blue-700 mb-1">Create a SparkStorm Account</h4>
            <p className="text-sm text-blue-600 mb-3">For full access to MediWallet features when it launches, including personalized dashboards and secure document storage.</p>
            <Link to="/auth">
              <Button variant="outline" size="sm" className="border-blue-200 bg-white hover:bg-blue-50">
                <UserPlus className="mr-1 h-4 w-4" />
                Create Account
              </Button>
            </Link>
          </div>
        </div>
      </div>

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
