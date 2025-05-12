
import { useState, useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { Linkedin, Instagram, Mail } from "lucide-react";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

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
        <div className="overflow-hidden bg-white">
          <AspectRatio ratio={1/1}>
            <img
              src={image}
              alt={name}
              className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
              loading="lazy"
              style={{ backgroundColor: "#FFFFFF" }}
            />
          </AspectRatio>
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

const AdvisoryMember = ({ name, role, image, delay, linkedinUrl, instagramUrl, email }: TeamMemberProps) => {
  // This component is similar to TeamMember but with a more compact design for advisory board
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
        <div className="overflow-hidden bg-white">
          <AspectRatio ratio={1/1}>
            <img
              src={image}
              alt={name}
              className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
              loading="lazy"
              style={{ backgroundColor: "#FFFFFF" }}
            />
          </AspectRatio>
        </div>
        <div className="p-4">
          <h3 className="text-lg font-semibold mb-1">{name}</h3>
          <p className="text-sm text-gray-500 mb-2">{role}</p>
          <div className="flex space-x-3">
            <a
              href={linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-blue-600 transition-colors"
              aria-label={`${name}'s LinkedIn`}
            >
              <Linkedin size={16} />
            </a>
            {instagramUrl && (
              <a
                href={instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-pink-500 transition-colors"
                aria-label={`${name}'s Instagram`}
              >
                <Instagram size={16} />
              </a>
            )}
            <a
              href={`mailto:${email}`}
              className="text-gray-400 hover:text-blue-500 transition-colors"
              aria-label={`Email ${name}`}
            >
              <Mail size={16} />
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
      role: "Fractional COO",
      image: "/lovable-uploads/ba1a4abc-2473-4bae-8324-a56dfd73dcf2.png",
      delay: 200,
      linkedinUrl: "https://www.linkedin.com/in/muzammil-w-iqbal/",
      instagramUrl: "https://www.instagram.com/muzammil.iqbal.11",
      email: "muzammil.iqbal@gmail.com",
    },
    {
      name: "Rachel Pulice",
      role: "UX Designer",
      image: "/lovable-uploads/8734bd9a-c4d3-48e9-866b-11fcff83b6e3.png",
      delay: 300,
      linkedinUrl: "https://www.linkedin.com/in/rachel-pulice/",
      email: "rachel.t.pulice@gmail.com",
    },
    {
      name: "Aarnav Chandraganti",
      role: "AI Developer",
      image: "/lovable-uploads/a85e3137-96df-4cdb-be96-50311cb0c20f.png",
      delay: 400,
      linkedinUrl: "https://www.linkedin.com/in/aarnav-chandraganti/",
      instagramUrl: "https://www.instagram.com/aarnav_c_",
      email: "aarnav.chandraganti@gmail.com",
    },
    {
      name: "Shloak Gupta",
      role: "AI Developer",
      image: "/lovable-uploads/bec168c3-7297-4955-8076-b07a99337d80.png",
      delay: 500,
      linkedinUrl: "https://www.linkedin.com/in/shloak-gupta-428412218/",
      instagramUrl: "https://www.instagram.com/shloakgupta",
      email: "shloakgupta09@gmail.com",
    },
  ];
  
  const advisoryBoard = [
    {
      name: "Siva",
      role: "Advisory Board Member",
      image: "/lovable-uploads/16c72fb9-4b68-4d2c-9837-ed5d77bdf7c7.png",
      delay: 600,
      linkedinUrl: "https://www.linkedin.com/",
      email: "siva@example.com",
    },
    {
      name: "Girija",
      role: "Advisory Board Member",
      image: "/lovable-uploads/e799f8e7-efe8-421a-8904-fb3bc81e1aae.png",
      delay: 700,
      linkedinUrl: "https://www.linkedin.com/",
      email: "girija@example.com",
    }
  ];

  return (
    <section id="team" className="py-8 bg-white">
      <div className="section-container" ref={ref}>
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-block mb-3 px-4 py-1.5 bg-blue-50 rounded-full">
            <p className="text-xs sm:text-sm font-medium text-blue-600">Meet Our Team</p>
          </div>
          
          <h2 className={`text-3xl md:text-4xl font-bold mb-4 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}>
            The Minds Behind SparkStorm AI
          </h2>
          
          <p className={`text-lg text-gray-600 max-w-2xl mx-auto transition-all duration-700 delay-100 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}>
            Our diverse team of experts is passionate about creating AI solutions that make a difference in people's lives.
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 mb-16">
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

        {/* Advisory Board Section */}
        <div className="text-center max-w-3xl mx-auto mt-16 mb-8">
          <div className="inline-block mb-3 px-4 py-1.5 bg-blue-50 rounded-full">
            <p className="text-xs sm:text-sm font-medium text-blue-600">Advisory Board</p>
          </div>
          
          <h2 className={`text-3xl md:text-4xl font-bold mb-4 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}>
            Strategic Guidance
          </h2>
          
          <p className={`text-lg text-gray-600 max-w-2xl mx-auto transition-all duration-700 delay-100 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}>
            Our advisory board provides expert guidance to help shape our vision and strategy.
          </p>
        </div>
        
        {/* Changed to max-w-4xl to allow a bit more space for consistent sizing */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto">
          {advisoryBoard.map((member, index) => (
            <div key={`advisor-${index}`} className="col-span-1 sm:col-span-1">
              <AdvisoryMember
                name={member.name}
                role={member.role}
                image={member.image}
                delay={member.delay}
                linkedinUrl={member.linkedinUrl}
                email={member.email}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Team;
