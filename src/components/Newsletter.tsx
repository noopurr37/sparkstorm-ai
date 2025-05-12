
import { useState, useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const Newsletter = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  
  const [isVisible, setIsVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  
  useEffect(() => {
    if (inView) {
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 100);
      
      return () => clearTimeout(timer);
    }
  }, [inView]);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      toast({
        title: "Error",
        description: "Please enter your email address.",
        variant: "destructive",
        duration: 2000,
      });
      return;
    }
    
    if (!isValidEmail(email)) {
      toast({
        title: "Error",
        description: "Please enter a valid email address.",
        variant: "destructive",
        duration: 2000,
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Store email in localStorage
      localStorage.setItem("sparkstorm_newsletter_email", email);
      
      // Call the newsletter-confirmation function directly
      const response = await supabase.functions.invoke('newsletter-confirmation', {
        body: { email }
      });
      
      if (response.error) {
        throw new Error(response.error.message);
      }
      
      // Display success toast
      toast({
        title: "Thank you for subscribing to our SparkStorm AI newsletter!",
        description: "You will receive the latest updates on AI technology, healthcare innovation, and exclusive insights from our experts.",
        duration: 2000, // Changed to 2 seconds
      });
      
      console.log("Newsletter subscription successful:", email);
      
      setEmail("");
    } catch (error) {
      console.error("Newsletter subscription error:", error);
      
      toast({
        title: "Subscription Error",
        description: "There was an issue with your subscription. Please try again later.",
        variant: "destructive",
        duration: 2000, // Changed to 2 seconds
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const isValidEmail = (email: string) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  };

  return (
    <section className="py-8 bg-gradient-primary text-white relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-blue-400 rounded-full opacity-20 mix-blend-overlay filter blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-cyan-400 rounded-full opacity-20 mix-blend-overlay filter blur-3xl"></div>
      
      <div className="section-container relative z-10" ref={ref}>
        <div className="max-w-3xl mx-auto text-center">
          <div 
            className={`transition-all duration-700 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Stay Updated with SparkStorm AI
            </h2>
            <p className="text-lg opacity-90 mb-6 max-w-2xl mx-auto">
              Subscribe to our newsletter for the latest updates on AI technology, healthcare innovation, and exclusive insights from our experts.
            </p>
          </div>
          
          <form 
            onSubmit={handleSubmit}
            className={`flex flex-col sm:flex-row gap-3 max-w-xl mx-auto transition-all duration-700 delay-200 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <Input
              type="email"
              placeholder="Enter your email"
              className="h-12 rounded-full bg-white/10 backdrop-blur-md border-white/20 text-white placeholder:text-white/70 flex-grow"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isSubmitting}
            />
            <Button 
              type="submit" 
              className="h-12 px-8 rounded-full bg-white text-blue-600 hover:bg-white/90 hover:text-blue-700 transition-all duration-300"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Subscribing..." : "Subscribe"} {!isSubmitting && <Send className="ml-2 h-4 w-4" />}
            </Button>
          </form>
          
          <p 
            className={`text-sm opacity-80 mt-4 transition-all duration-700 delay-300 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            We respect your privacy. Unsubscribe at any time.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
