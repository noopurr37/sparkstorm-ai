
import { useEffect } from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Team from "@/components/Team";
import Affiliations from "@/components/Affiliations";
import Partners from "@/components/Partners";
import Testimonials from "@/components/Testimonials";
import Newsletter from "@/components/Newsletter";
import Contact from "@/components/Contact";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const { toast } = useToast();
  
  // Calendly URL (in case it's needed for other buttons later)
  const calendlyUrl = "https://calendly.com/noopurgupta01/1x1";
  
  useEffect(() => {
    // Welcome toast when the page loads
    toast({
      title: "Welcome to SparkStorm AI",
      description: "Discover our AI solutions and services",
      duration: 5000,
    });
  }, [toast]);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        <Services />
        <Team />
        <Affiliations />
        <Partners />
        <Testimonials />
        <Newsletter />
        <Contact />
      </main>
      <footer className="bg-gray-900 text-white py-8 text-center">
        <div className="container mx-auto px-4">
          <div className="mb-4">
            <img 
              src="/lovable-uploads/7ba572ae-889a-4931-8912-e97b44970777.png" 
              alt="SparkStorm AI Logo" 
              className="h-10 mx-auto filter brightness-100 contrast-100 saturate-150 hue-rotate-0"
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
    </div>
  );
};

export default Index;
