
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";

const newsletterSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, "Email is required")
    .email("Please enter a valid email address")
    .max(255, "Email must be less than 255 characters")
    .toLowerCase(),
});

const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate input with Zod
    const validation = newsletterSchema.safeParse({ email });
    
    if (!validation.success) {
      toast({
        title: "Invalid email",
        description: validation.error.errors[0].message,
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      const sanitizedEmail = validation.data.email;

      // Check rate limit
      const { data: rateLimitOk } = await supabase.rpc('check_rate_limit', {
        table_name: 'newsletter_subscriptions',
        email_address: sanitizedEmail,
        time_window: '01:00:00',
        max_submissions: 3
      });

      if (!rateLimitOk) {
        toast({
          title: "Too many attempts",
          description: "Please wait before subscribing again",
          variant: "destructive",
        });
        setIsLoading(false);
        return;
      }

      const { error } = await supabase
        .from('newsletter_subscriptions')
        .insert([{ email: sanitizedEmail }]);

      if (error) {
        if (error.code === '23505') {
          toast({
            title: "Already subscribed",
            description: "This email is already subscribed to our newsletter",
          });
        } else {
          throw error;
        }
      } else {
        toast({
          title: "Success!",
          description: "You've been subscribed to our newsletter.",
        });
        setEmail("");
      }
    } catch (error) {
      toast({
        title: "Subscription failed",
        description: "Please try again later",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="py-16 bg-gradient-to-br from-blue-600 to-blue-800">
      <div className="section-container text-center">
        <div className="max-w-2xl mx-auto">
          <Mail className="w-12 h-12 text-white mx-auto mb-6" />
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Stay Updated with AI Insights
          </h2>
          <p className="text-blue-100 mb-8 text-lg">
            Get the latest AI trends, insights, and exclusive content delivered to your inbox.
          </p>
          
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 bg-white/10 border-white/20 text-white placeholder:text-blue-100"
              disabled={isLoading}
            />
            <Button 
              type="submit" 
              className="bg-white text-blue-600 hover:bg-blue-50 font-semibold px-8"
              disabled={isLoading}
            >
              {isLoading ? "Subscribing..." : "Subscribe"}
            </Button>
          </form>
          
          <p className="text-blue-100 text-sm mt-4">
            No spam, unsubscribe at any time.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
