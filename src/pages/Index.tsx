
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
import MediWalletSignup from "@/components/MediWalletSignup";
import { useToast } from "@/hooks/use-toast";
import { Helmet } from "react-helmet-async";
import { Linkedin, Instagram, Lock } from "lucide-react";

const Index = () => {
  const { toast } = useToast();

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>SparkStorm AI | Intelligence as a Service</title>
        <meta name="description" content="Intelligence as a Service - SparkStorm AI provides cutting-edge AI solutions led by Noopur Gupta, CEO and Founder" />
        <meta property="og:title" content="SparkStorm AI | Intelligence as a Service" />
        <meta property="og:description" content="Intelligence as a Service - We ignite ideas into intelligent products with customized AI solutions for your business needs." />
        <meta name="keywords" content="SparkStorm AI, Intelligence as a Service, Noopur Gupta, AI solutions" />
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
        
        {/* MediWallet Signup Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Coming Soon: MediWallet
              </h2>
              <p className="text-lg text-gray-600 mb-4">
                Our innovative healthcare finance management solution is launching soon. 
                Sign up now to join our waitlist.
              </p>
              <div className="flex items-center justify-center gap-2 text-sm text-blue-600">
                <Lock size={16} />
                <span>Premium features will require an account</span>
              </div>
            </div>
            
            <div className="max-w-md mx-auto">
              <MediWalletSignup />
            </div>
          </div>
        </section>
        
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
