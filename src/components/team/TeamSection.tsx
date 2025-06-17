
import { useState, useEffect } from "react";
import { useInView } from "react-intersection-observer";

interface TeamSectionProps {
  title: string;
  description: string;
  children: React.ReactNode;
}

const TeamSection = ({ title, description, children }: TeamSectionProps) => {
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

  return (
    <div ref={ref}>
      <div 
        className={`mb-12 text-center transition-all duration-700 bg-gradient-to-b from-blue-50 to-white rounded-2xl py-8 px-6 shadow-sm ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        <h2 className="text-3xl md:text-4xl font-bold text-blue-600 mb-4">{title}</h2>
        <p className="section-description max-w-3xl mx-auto text-gray-600">
          {description}
        </p>
      </div>
      {children}
    </div>
  );
};

export default TeamSection;
