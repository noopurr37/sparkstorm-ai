
import { useState, useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { Linkedin, Instagram, Mail } from "lucide-react";

interface TeamMemberProps {
  name: string;
  role: string;
  image: string;
  delay: number;
  linkedinUrl?: string;
  instagramUrl?: string;
  email?: string;
}

const TeamMember = ({ name, role, image, delay, linkedinUrl, instagramUrl, email }: TeamMemberProps) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
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
      <div className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 h-full">
        <div className="overflow-hidden bg-white relative" style={{ height: "300px" }}>
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover object-center"
            loading="lazy"
          />
        </div>
        <div className="p-6">
          <h3 className="text-xl font-semibold mb-1">{name}</h3>
          <p className="text-sm text-gray-500 mb-3">{role}</p>
          <div className="flex space-x-3">
            {linkedinUrl && (
              <a
                href={linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-blue-600 transition-colors"
                aria-label={`${name}'s LinkedIn`}
              >
                <Linkedin size={18} />
              </a>
            )}
            {instagramUrl && (
              <a
                href={instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-pink-500 transition-colors"
                aria-label={`${name}'s Instagram`}
              >
                <Instagram size={18} />
              </a>
            )}
            {email && (
              <a
                href={`mailto:${email}`}
                className="text-gray-400 hover:text-blue-500 transition-colors"
                aria-label={`Email ${name}`}
              >
                <Mail size={18} />
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamMember;
