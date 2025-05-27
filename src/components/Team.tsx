import { useState, useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { Linkedin, Instagram, Mail } from "lucide-react";
import { AspectRatio } from "@/components/ui/aspect-ratio";

interface TeamMemberProps {
  name: string;
  role: string;
  image: string;
  delay: number;
  linkedinUrl: string;
  instagramUrl?: string;
  email: string;
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
            <a
              href={linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-blue-600 transition-colors"
              aria-label={`${name}'s LinkedIn`}
            >
              <Linkedin size={18} />
            </a>
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
            <a
              href={`mailto:${email}`}
              className="text-gray-400 hover:text-blue-500 transition-colors"
              aria-label={`Email ${name}`}
            >
              <Mail size={18} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

const Team = () => {
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
  
  const teamMembers = [
    {
      name: "Noopur Gupta",
      role: "Founder & CEO",
      image: "/lovable-uploads/ae1d15ed-0b22-438d-aede-6554e09de8ed.png",
      delay: 100,
      linkedinUrl: "https://www.linkedin.com/in/noopurgupta01/",
      instagramUrl: "https://www.instagram.com/noopurrofficial",
      email: "noopurgupta01@gmail.com",
    },
    {
      name: "Muzammil",
      role: "CPO",
      image: "/lovable-uploads/ba1a4abc-2473-4bae-8324-a56dfd73dcf2.png",
      delay: 200,
      linkedinUrl: "https://www.linkedin.com/in/muzammil-w-iqbal/",
      instagramUrl: "https://www.instagram.com/muzammil.iqbal.11",
      email: "muzammil.iqbal@gmail.com",
    },
    {
      name: "Shloak Gupta",
      role: "AI Developer",
      image: "/lovable-uploads/bec168c3-7297-4955-8076-b07a99337d80.png",
      delay: 300,
      linkedinUrl: "https://www.linkedin.com/in/shloak-gupta-428412218/",
      instagramUrl: "https://www.instagram.com/shloakgupta",
      email: "shloakgupta09@gmail.com",
    },
    {
      name: "Aarnav Chandraganti",
      role: "AI Developer",
      image: "/lovable-uploads/e7c668aa-10d3-4688-93eb-f9c2c4b685f9.png",
      delay: 400,
      linkedinUrl: "https://www.linkedin.com/in/aarnav-chandraganti/",
      instagramUrl: "https://www.instagram.com/aarnav_c_",
      email: "aarnav.chandraganti@gmail.com",
    },
  ];
  
  const advisoryBoard = [
    {
      name: "Sivapunniyam Dakshinamurthy",
      role: "Advisory Board Member",
      image: "/lovable-uploads/16c72fb9-4b68-4d2c-9837-ed5d77bdf7c7.png",
      delay: 500,
      linkedinUrl: "https://www.linkedin.com/in/sivapunniyamdakshinamurthy",
      email: "siva@example.com",
    },
    {
      name: "Girija Sivapunniyam",
      role: "Advisory Board Member",
      image: "/lovable-uploads/e799f8e7-efe8-421a-8904-fb3bc81e1aae.png",
      delay: 600,
      linkedinUrl: "https://www.linkedin.com/in/girijasivapunniyam/",
      email: "girija@example.com",
    }
  ];

  return (
    <section id="team" className="py-8 bg-white">
      <div className="section-container" ref={ref}>
        {/* Blue bubble box style for Our Team section - similar to Services section */}
        <div 
          className={`mb-12 text-center transition-all duration-700 bg-gradient-to-b from-blue-50 to-white rounded-2xl py-8 px-6 shadow-sm ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-blue-600 mb-4">Our Team</h2>
          <p className="section-description max-w-3xl mx-auto text-gray-600">
            We're a diverse team of experienced professionals passionate about creating 
            intelligent AI solutions that transform businesses.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {teamMembers.map((member, index) => (
            <TeamMember
              key={index}
              name={member.name}
              role={member.role}
              image={member.image}
              delay={member.delay}
              linkedinUrl={member.linkedinUrl}
              instagramUrl={member.instagramUrl}
              email={member.email}
            />
          ))}
        </div>

        {/* Advisory Board Section with blue bubble box style - similar to Services section */}
        <div 
          className={`mt-20 mb-12 text-center transition-all duration-700 bg-gradient-to-b from-blue-50 to-white rounded-2xl py-8 px-6 shadow-sm ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-blue-600 mb-4">Advisory Board</h2>
          <p className="section-description max-w-3xl mx-auto text-gray-600">
            Our advisory board brings decades of industry experience and expertise to guide our strategic direction.
          </p>
        </div>

        {/* Center advisory board members */}
        <div className="flex justify-center">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-2xl mx-auto">
            {advisoryBoard.map((member, index) => (
              <TeamMember
                key={`advisor-${index}`}
                name={member.name}
                role={member.role}
                image={member.image}
                delay={member.delay}
                linkedinUrl={member.linkedinUrl}
                email={member.email}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Team;
