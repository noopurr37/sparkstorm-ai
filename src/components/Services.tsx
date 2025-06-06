import React, { useState, useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { MessageSquare, Globe, Smartphone, HeartPulse } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

interface ServiceCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  delay: number;
  linkTo?: string;
  requiresAuth?: boolean;
}

const ServiceCard = ({ icon, title, description, delay, linkTo, requiresAuth }: ServiceCardProps) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });
  
  const [isVisible, setIsVisible] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  
  useEffect(() => {
    if (inView) {
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, delay);
      
      return () => clearTimeout(timer);
    }
  }, [inView, delay]);

  useEffect(() => {
    // Get user status if we need it for navigation
    if (requiresAuth) {
      const getUser = async () => {
        const { data: { session } } = await supabase.auth.getSession();
        setUser(session?.user || null);
      };
      getUser();
    }
  }, [requiresAuth]);
  
  const handleClick = () => {
    if (linkTo) {
      if (requiresAuth && !user) {
        navigate("/auth", { 
          state: { 
            redirectTo: linkTo,
            message: "Please sign in or create an account to access MediWallet" 
          } 
        });
      } else {
        navigate(linkTo);
      }
    }
  };

  return (
    <div 
      ref={ref}
      className={`card-hover transition-all duration-700 ease-out ${
        isVisible 
          ? "opacity-100 translate-y-0" 
          : "opacity-0 translate-y-12"
      } ${linkTo ? "cursor-pointer" : ""}`}
      onClick={handleClick}
    >
      <Card className="h-full border border-gray-200 bg-white/50 backdrop-blur-sm hover:shadow-md transition-shadow">
        <CardHeader>
          <div className="w-14 h-14 rounded-full bg-blue-50 flex items-center justify-center mb-4">
            {icon}
          </div>
          <CardTitle className="text-xl font-semibold">{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <CardDescription className="text-gray-500 text-base">
            {description}
          </CardDescription>
        </CardContent>
      </Card>
    </div>
  );
};

const Services = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    if (inView) {
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 100);
      
      return () => clearTimeout(timer);
    }
  }, [inView]);
  
  const services = [
    {
      icon: <MessageSquare className="w-7 h-7 text-blue-600" />,
      title: "AI Chatbots",
      description: "Custom conversational AI chatbots designed to automate customer interactions, answer queries, and enhance your business's digital presence 24/7.",
      delay: 100,
    },
    {
      icon: <Globe className="w-7 h-7 text-blue-600" />,
      title: "Website Development",
      description: "Professional, responsive websites built with modern technologies to showcase your brand, engage visitors, and drive conversions.",
      delay: 200,
    },
    {
      icon: <Smartphone className="w-7 h-7 text-blue-600" />,
      title: "Mobile Applications",
      description: "Feature-rich mobile apps for iOS and Android that provide seamless user experiences and help your business reach customers on any device.",
      delay: 300,
    },
    {
      icon: <HeartPulse className="w-7 h-7 text-blue-600" />,
      title: "MediWallet",
      description: "Secure, HIPAA-compliant applications for storing and managing personal health records with advanced security features to protect sensitive information.",
      delay: 400,
      linkTo: "/mediwallet",
      requiresAuth: true,
    },
  ];

  return (
    <section id="services" className="py-10 relative bg-gray-50">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMzMTgyQ0UiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDM0aDR2MWgtNHYtMXptMC0yaDF2NWgtMXYtNXptMi0yaDF2MWgtMXYtMXptLTIgMmgxdjFoLTF2LTF6bS0yLTJoMXY0aC0xdi00em0tMiAwaDF2MWgtMXYtMXptLTIgMGgxdjFoLTF2LTF6bS0yIDBoMXYxaC0xdi0xem0tMiAwaDF2MWgtMXYtMXptLTIgMGgxdjFoLTF2LTF6bS0yIDBoMXYxaC0xdi0xem0tMiAwaDF2MWgtMXYtMXpNMTEgNTloNHYxaC00di0xem0wLTJoMXY1aC0xdi01em0yLTJoMXYxaC0xdi0xem0tMiAyaDF2MWgtMXYtMXptLTItMmgxdjRoLTFWN3ptMi0yaDF2MWgtMVY1em0tMiAwaDF2MWgtMVY3em0tMi0yaDF2NGgtMVY1em0tMiAwaDF2MWgtMVY1em0tMiAwaDF2MWgtMVY1em0tMiAwaDF2MWgtMVY1em0tMiAwaDF2MWgtMVY1ek0zNiA5aDR2MWgtNFY5em0wLTJoMXY1aC0xdi01em0yLTJoMXYxaC0xdi0xem0tMiAyaDF2MWgtMXYtMXptLTItMmgxdjRoLTF2LTR6bS0yIDBoMXYxaC0xdi0xem0tMiAwaDF2MWgtMXYtMXptLTIgMGgxdjFoLTF2LTF6bS0yIDBoMXYxaC0xdi0xem0tMiAwaDF2MWgtMXYtMXptLTIgMGgxdjFoLTF2LTF6bS0yIDBoMXYxaC0xdi0xem0tMiAwaDF2MWgtMXYtMXpNNjEgNTloNHYxaC00di0xem0wLTJoMXY1aC0xdi01em0yLTJoMXYxaC0xdi0xem0tMiAyaDF2MWgtMXYtMXptLTItMmgxdjRoLTF2LTR6bS0yIDBoMXYxaHQtMVYtMXptLTIgMGgxdjFoLTF2LTF6bS0yIDBoMXYxaC0xdi0xem0tMiAwaDF2MWgtMXYtMXptLTIgMGgxdjFoLTF2LTF6bTYxIDM0aDR2MWgtNFYtMXptMC0yaDF2NWgtMVYtNXptMi0yaDF2MWgtMVYtMXptLTIgMmgxdjFoLTF2LTF6bS0yLTJoMXY0aC0xdi00em0tMiAwaDF2MWgtMVYtMXptLTIgMGgxdjFoLTF2LTF6bS0yIDBoMXYxaC0xdi0xem0tMiAwaDF2MWgtMVYtMXptLTIgMGgxdjFoLTF2LTF6bTYxIDloNHYxaC00VjltMC0yaDF2NWgtMVY3em0yLTJoMXYxaC0xVjV6bS0yIDJoMXYxaC0xVjd6bS0yLTJoMXY0aC0xVjV6bS0yIDBoMXYxaC0xVjV6bS0yIDBoMXYxaC0xVjV6bS0yIDBoMXYxaC0xVjV6bS0yIDBoMXYxaC0xVjV6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-50"></div>
      
      <div className="section-container" ref={ref}>
        <div className="text-center max-w-3xl mx-auto mb-8">
          <div className="inline-block mb-3 px-4 py-1.5 bg-blue-50 rounded-full">
            <p className="text-xs sm:text-sm font-medium text-blue-600">Our Services</p>
          </div>
          
          <h2 className={`text-3xl md:text-4xl font-bold mb-4 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}>
            Cutting-Edge AI Solutions for Modern Businesses
          </h2>
          
          <p className={`text-lg text-gray-600 max-w-2xl mx-auto transition-all duration-700 delay-100 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}>
            We deliver innovative technology solutions that transform how businesses operate and how people manage their digital presence.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <ServiceCard
              key={index}
              icon={service.icon}
              title={service.title}
              description={service.description}
              delay={service.delay}
              linkTo={service.linkTo}
              requiresAuth={service.requiresAuth}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
