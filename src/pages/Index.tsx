
import { useEffect } from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Affiliations from "@/components/Affiliations";
import Partners from "@/components/Partners";
import Team from "@/components/Team";
import Testimonials from "@/components/Testimonials";
import Newsletter from "@/components/Newsletter";
import Contact from "@/components/Contact";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const { toast } = useToast();
  
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
        <Affiliations />
        <Partners />
        <Team />
        <Testimonials />
        <Newsletter />
        <Contact />
      </main>
      <footer className="bg-gray-900 text-white py-8 text-center">
        <div className="container mx-auto px-4">
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
