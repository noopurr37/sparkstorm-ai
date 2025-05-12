
import { useEffect } from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Team from "@/components/Team";
import Services from "@/components/Services";
import Affiliations from "@/components/Affiliations";
import Testimonials from "@/components/Testimonials";
import Newsletter from "@/components/Newsletter";
import Contact from "@/components/Contact";
import AIAssistant from "@/components/AIAssistant";
import { useToast } from "@/hooks/use-toast";
import { Helmet } from "react-helmet-async";
import { Linkedin, Instagram } from "lucide-react";

const Index = () => {
  const { toast } = useToast();
  
  // Calendly URL (in case it's needed for other buttons later)
  const calendlyUrl = "https://calendly.com/noopurgupta01/1x1";

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>SparkStorm AI | Intelligence as a Service</title>
        <meta name="description" content="SparkStorm AI provides cutting-edge AI solutions led by Noopur Gupta, CEO and Founder" />
        <meta property="og:title" content="Schedule Time with SparkStorm AI | Intelligence as a Service" />
        <meta property="og:description" content="Led by Noopur Gupta, CEO and Founder, with Muzammil Sheikh, COO, Rachel Pulice, UX Designer, Aarnav Chandraganti and Shloak, AI Developers" />
        <meta name="keywords" content="SparkStorm AI, Noopur Gupta, AI solutions, Intelligence as a Service, Muzammil Sheikh, Rachel Pulice, Aarnav Chandraganti, Shloak" />
      </Helmet>
      
      <Header />
      <main className="space-y-0">
        <Hero />
        <div className="bg-gradient-to-b from-white to-gray-50">
          <Services />
          <Team />
          <Testimonials />
        </div>
        <div className="bg-gradient-to-b from-white to-gray-50 py-4">
          <Affiliations />
        </div>
        <Newsletter />
        <Contact />
      </main>
      <footer className="bg-navy-blue text-white py-8 text-center">
        <div className="container mx-auto px-4">
          <div className="mb-4">
            <img 
              src="/lovable-uploads/e82a7fa3-a351-4944-9c59-f357e283e95d.png" 
              alt="SparkStorm AI Logo" 
              className="h-10 mx-auto" 
            />
          </div>
          <p className="text-sm">© {new Date().getFullYear()} SparkStorm AI. All rights reserved.</p>
          <div className="mt-4 flex justify-center space-x-6">
            <a href="https://www.linkedin.com/company/sparkstormai" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition flex items-center">
              <Linkedin size={18} className="mr-1" /> LinkedIn
            </a>
            <a href="https://www.instagram.com/sparkstormai" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition flex items-center">
              <Instagram size={18} className="mr-1" /> Instagram
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition">Privacy Policy</a>
            <a href="#" className="text-gray-400 hover:text-white transition">Terms of Service</a>
            <a href="#contact" className="text-gray-400 hover:text-white transition">Contact Us</a>
          </div>
        </div>
      </footer>
      <AIAssistant />
    </div>
  );
};

export default Index;
