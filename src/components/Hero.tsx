
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, MessageCircle, HeartPulse } from "lucide-react";

const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <section id="home" className="relative overflow-hidden pt-16 pb-12 sm:pt-20 sm:pb-16 lg:pt-28 lg:pb-20">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
        <div className="absolute top-[10%] right-[15%] w-[300px] h-[300px] lg:w-[500px] lg:h-[500px] bg-blue-400 rounded-full mix-blend-multiply filter blur-[80px] opacity-20 animate-pulse-soft"></div>
        <div className="absolute bottom-[20%] left-[10%] w-[250px] h-[250px] lg:w-[400px] lg:h-[400px] bg-purple-400 rounded-full mix-blend-multiply filter blur-[80px] opacity-20 animate-pulse-soft" style={{ animationDelay: "1s" }}></div>
      </div>

      <div className="relative z-10 section-container">
        <div className="flex flex-col lg:flex-row lg:items-center">
          {/* Hero Text Content */}
          <div className={`w-full lg:w-1/2 lg:pr-12 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="inline-block mb-3 px-4 py-1.5 bg-blue-50 rounded-full">
              <p className="text-xs sm:text-sm font-medium text-blue-600">Intelligence as a Service</p>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
              <span className="text-gradient">SparkStorm AI</span>
            </h1>
            
            <p className="text-lg md:text-xl text-gray-600 mb-6 max-w-2xl">
              SparkStorm AI delivers cutting-edge conversational AI chatbots and secure healthcare applications to transform your business and empower your users.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button className="btn-primary inline-flex items-center gap-2">
                Book a Demo <ArrowRight size={16} />
              </Button>
              <Button variant="outline" className="btn-secondary">
                Request a Quote
              </Button>
            </div>
          </div>
          
          {/* Hero Visual Content - Now with feature cards only */}
          <div className={`w-full lg:w-1/2 mt-10 lg:mt-0 transition-all duration-700 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="relative h-[260px] md:h-[360px]">
              {/* Chatbot Card */}
              <div className="glass-card absolute top-0 left-0 p-6 w-[200px] md:w-[260px] animate-float">
                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                  <MessageCircle className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold mb-2">AI Chatbots</h3>
                <p className="text-sm text-gray-500">Custom conversational AI for your business</p>
              </div>
              
              {/* Health App Card */}
              <div className="glass-card absolute bottom-0 right-0 p-6 w-[200px] md:w-[260px] animate-float" style={{ animationDelay: "1.5s" }}>
                <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center mb-4">
                  <HeartPulse className="w-6 h-6 text-purple-600" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Health Vault</h3>
                <p className="text-sm text-gray-500">Secure medical data at your fingertips</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Wave Separator */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden">
        <svg
          className="w-full h-auto"
          viewBox="0 0 1440 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0 50L48 45.7C96 41.3 192 32.7 288 30.8C384 29 480 34 576 41.2C672 48.3 768 57.7 864 57.5C960 57.3 1056 47.7 1152 44.2C1248 40.7 1344 43.3 1392 44.7L1440 46V101H1392C1344 101 1248 101 1152 101C1056 101 960 101 864 101C768 101 672 101 576 101C480 101 384 101 288 101C192 101 96 101 48 101H0V50Z"
            fill="white"
            fillOpacity="0.05"
          />
          <path
            d="M0 75L48 69.2C96 63.3 192 51.7 288 51.8C384 52 480 64 576 69.2C672 74.3 768 72.7 864 72.5C960 72.3 1056 73.7 1152 73.8C1248 74 1344 73 1392 72.5L1440 72V101H1392C1344 101 1248 101 1152 101C1056 101 960 101 864 101C768 101 672 101 576 101C480 101 384 101 288 101C192 101 96 101 48 101H0V75Z"
            fill="white"
            fillOpacity="0.1"
          />
        </svg>
      </div>
    </section>
  );
};

export default Hero;
