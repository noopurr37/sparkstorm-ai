
import { useEffect } from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Team from "@/components/Team";
import Services from "@/components/Services";
import Affiliations from "@/components/Affiliations";
import Partners from "@/components/Partners";
import Testimonials from "@/components/Testimonials";
import Newsletter from "@/components/Newsletter";
import Contact from "@/components/Contact";
import AIAssistant from "@/components/AIAssistant";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const { toast } = useToast();
  
  // Calendly URL (in case it's needed for other buttons later)
  const calendlyUrl = "https://calendly.com/noopurgupta01/1x1";
  
  useEffect(() => {
    // Welcome toast when the page loads
    toast({
      title: "Welcome to SparkStorm AI",
      description: "Intelligence as a Service",
      duration: 5000,
    });

    // Check if user has subscribed to newsletter previously
    const subscribedEmail = localStorage.getItem("sparkstorm_newsletter_email");
    if (subscribedEmail) {
      // Show thank you message for previous subscribers
      toast({
        title: "Thank you for subscribing to our SparkStorm AI newsletter!",
        description: "You will receive the latest updates on AI technology, healthcare innovation, and exclusive insights from our experts.",
        duration: 5000,
      });
    }
  }, [toast]);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="space-y-0">
        <Hero />
        <Services />
        <Team />
        <Partners />
        <Testimonials />
        <Affiliations />
        <Newsletter />
        <Contact />
      </main>
      <footer className="bg-gray-900 text-white py-8 text-center">
        <div className="container mx-auto px-4">
          <div className="mb-4">
            <img 
              src="/lovable-uploads/e82a7fa3-a351-4944-9c59-f357e283e95d.png" 
              alt="SparkStorm AI Logo" 
              className="h-10 mx-auto" 
            />
          </div>
          <p className="text-sm">© {new Date().getFullYear()} SparkStorm AI. All rights reserved.</p>
          <div className="mt-4 flex justify-center space-x-4">
            <a href="#" className="text-gray-400 hover:text-white transition">Privacy Policy</a>
            <a href="#" className="text-gray-400 hover:text-white transition">Terms of Service</a>
            <a href="#" className="text-gray-400 hover:text-white transition">Contact Us</a>
          </div>
        </div>
      </footer>
      <AIAssistant />
    </div>
  );
};

export default Index;
