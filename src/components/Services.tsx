
import { useEffect, useState, useRef } from "react";
import { useInView } from "react-intersection-observer";
import { MessageCircle, HeartPulse, Zap, Bot, Shield, BarChart } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface ServiceCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  delay: number;
}

const ServiceCard = ({ icon, title, description, delay }: ServiceCardProps) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });
  
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    if (inView) {
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, delay);
      
      return () => clearTimeout(timer);
    }
  }, [inView, delay]);
  
  return (
    <div 
      ref={ref}
      className={`card-hover transition-all duration-700 ease-out ${
        isVisible 
          ? "opacity-100 translate-y-0" 
          : "opacity-0 translate-y-12"
      }`}
    >
      <Card className="h-full border border-gray-200 bg-white/50 backdrop-blur-sm">
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
        <CardFooter>
          <Button variant="ghost" className="p-0 text-blue-600 hover:text-blue-800 hover:bg-transparent">
            Learn more
          </Button>
        </CardFooter>
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
      icon: <Bot className="w-7 h-7 text-blue-600" />,
      title: "AI Chatbots for Business",
      description: "Custom conversational AI solutions designed to automate customer interactions, answer queries, and enhance overall business efficiency.",
      delay: 100,
    },
    {
      icon: <HeartPulse className="w-7 h-7 text-blue-600" />,
      title: "Personal Health Vault App",
      description: "A secure mobile application that empowers users to store, manage, and access their medical records anytime, anywhere.",
      delay: 200,
    },
    {
      icon: <Zap className="w-7 h-7 text-blue-600" />,
      title: "Business Process Automation",
      description: "Streamline repetitive tasks and workflows with intelligent automation solutions that save time and reduce errors.",
      delay: 300,
    },
    {
      icon: <Shield className="w-7 h-7 text-blue-600" />,
      title: "Secure Healthcare Solutions",
      description: "HIPAA-compliant healthcare applications designed with advanced security features to protect sensitive patient information.",
      delay: 400,
    },
    {
      icon: <MessageCircle className="w-7 h-7 text-blue-600" />,
      title: "Customer Engagement Tools",
      description: "Enhance customer relationships with intelligent conversation systems that provide personalized support 24/7.",
      delay: 500,
    },
    {
      icon: <BarChart className="w-7 h-7 text-blue-600" />,
      title: "AI-Powered Analytics",
      description: "Gain valuable insights from your data with advanced analytics and reporting tools powered by artificial intelligence.",
      delay: 600,
    },
  ];

  return (
    <section id="services" className="py-16 relative bg-gray-50">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMzMTgyQ0UiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDM0aDR2MWgtNHYtMXptMC0yaDF2NWgtMXYtNXptMi0yaDF2MWgtMXYtMXptLTIgMmgxdjFoLTF2LTF6bS0yLTJoMXY0aC0xdi00em0tMiAwaDF2MWgtMXYtMXptLTIgMGgxdjFoLTF2LTF6bS0yIDBoMXYxaC0xdi0xem0tMiAwaDF2MWgtMXYtMXptLTIgMGgxdjFoLTF2LTF6TTExIDM0aDR2MWgtNHYtMXptMC0yaDF2NWgtMXYtNXptMi0yaDF2MWgtMXYtMXptLTIgMmgxdjFoLTF2LTF6bS0yLTJoMXY0aC0xdi00em0tMiAwaDF2MWgtMXYtMXptLTIgMGgxdjFoLTF2LTF6bS0yIDBoMXYxaC0xdi0xem0tMiAwaDF2MWgtMXYtMXptLTIgMGgxdjFoLTF2LTF6TTYxIDM0aDR2MWgtNHYtMXptMC0yaDF2NWgtMXYtNXptMi0yaDF2MWgtMXYtMXptLTIgMmgxdjFoLTF2LTF6bS0yLTJoMXY0aC0xdi00em0tMiAwaDF2MWgtMXYtMXptLTIgMGgxdjFoLTF2LTF6bS0yIDBoMXYxaC0xdi0xem0tMiAwaDF2MWgtMXYtMXptLTIgMGgxdjFoLTF2LTF6TTExIDloNHYxaC00Vjl6bTAtMmgxdjVoLTFWN3ptMi0yaDF2MWgtMVY1em0tMiAyaDF2MWgtMVY3em0tMi0yaDF2NGgtMVY1em0tMiAwaDF2MWgtMVY1em0tMiAwaDF2MWgtMVY1em0tMiAwaDF2MWgtMVY1em0tMiAwaDF2MWgtMVY1em0tMiAwaDF2MWgtMVY1ek0zNiA5aDR2MWgtNFY5em0wLTJoMXY1aC0xVjd6bTItMmgxdjFoLTFWNXptLTIgMmgxdjFoLTFWN3ptLTItMmgxdjRoLTFWNXptLTIgMGgxdjFoLTFWNXptLTIgMGgxdjFoLTFWNXptLTIgMGgxdjFoLTFWNXptLTIgMGgxdjFoLTFWNXptLTIgMGgxdjFoLTFWNXpNMTEgNTloNHYxaC00di0xem0wLTJoMXY1aC0xdi01em0yLTJoMXYxaC0xdi0xem0tMiAyaDF2MWgtMXYtMXptLTItMmgxdjRoLTF2LTR6bS0yIDBoMXYxaC0xdi0xem0tMiAwaDF2MWgtMXYtMXptLTIgMGgxdjFoLTF2LTF6bS0yIDBoMXYxaC0xdi0xem0tMiAwaDF2MWgtMXYtMXpNMzYgNTloNHYxaC00di0xem0wLTJoMXY1aC0xdi01em0yLTJoMXYxaC0xdi0xem0tMiAyaDF2MWgtMXYtMXptLTItMmgxdjRoLTF2LTR6bS0yIDBoMXYxaC0xdi0xem0tMiAwaDF2MWgtMXYtMXptLTIgMGgxdjFoLTF2LTF6bS0yIDBoMXYxaC0xdi0xem0tMiAwaDF2MWgtMXYtMXpNNjEgNTloNHYxaC00di0xem0wLTJoMXY1aC0xdi01em0yLTJoMXYxaC0xdi0xem0tMiAyaDF2MWgtMXYtMXptLTItMmgxdjRoLTF2LTR6bS0yIDBoMXYxaC0xdi0xem0tMiAwaDF2MWgtMXYtMXptLTIgMGgxdjFoLTF2LTF6bS0yIDBoMXYxaC0xdi0xem0tMiAwaDF2MWgtMXYtMXpNNjEgMzRoNHYxaC00di0xem0wLTJoMXY1aC0xdi01em0yLTJoMXYxaC0xdi0xem0tMiAyaDF2MWgtMXYtMXptLTItMmgxdjRoLTF2LTR6bS0yIDBoMXYxaC0xdi0xem0tMiAwaDF2MWgtMXYtMXptLTIgMGgxdjFoLTF2LTF6bS0yIDBoMXYxaC0xdi0xem0tMiAwaDF2MWgtMXYtMXpNNjEgOWg0djFoLTRWOXptMC0yaDF2NWgtMVY3em0yLTJoMXYxaC0xVjV6bS0yIDJoMXYxaC0xVjd6bS0yLTJoMXY0aC0xVjV6bS0yIDBoMXYxaC0xVjV6bS0yIDBoMXYxaC0xVjV6bS0yIDBoMXYxaC0xVjV6bS0yIDBoMXYxaC0xVjV6bS0yIDBoMXYxaC0xVjV6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-50"></div>
      
      <div className="section-container" ref={ref}>
        <div className="text-center max-w-3xl mx-auto mb-10">
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
            We deliver innovative technology solutions that transform how businesses operate and how people manage their health information.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <ServiceCard
              key={index}
              icon={service.icon}
              title={service.title}
              description={service.description}
              delay={service.delay}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
