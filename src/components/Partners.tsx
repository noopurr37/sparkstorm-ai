
import { useState, useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

// Define the type for team members
interface TeamMember {
  id: number;
  name: string;
  image: string;
  allowUpload: boolean;
  role?: string; // Make role optional
}

const Partners = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  
  const [isVisible, setIsVisible] = useState(false);
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([
    { id: 1, name: "Siva", image: "/lovable-uploads/8ef771d4-addc-488c-a4a2-394948b74e04.png", allowUpload: false },
    { id: 2, name: "Girija", image: "/lovable-uploads/65ee5a53-727d-49ed-8146-843c3eb992cc.png", allowUpload: false },
  ]);
  
  useEffect(() => {
    if (inView) {
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 100);
      
      return () => clearTimeout(timer);
    }
  }, [inView]);

  const partners = [
    { name: "Signa Tech", delay: 100 },
  ];

  const handleImageUpload = (id: number, event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const imageUrl = URL.createObjectURL(event.target.files[0]);
      setTeamMembers(prev => 
        prev.map(member => 
          member.id === id ? { ...member, image: imageUrl } : member
        )
      );
    }
  };

  return (
    <section id="partners" className="py-14 bg-white">
      <div className="section-container" ref={ref}>
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-block mb-3 px-4 py-1.5 bg-blue-50 rounded-full">
            <p className="text-xs sm:text-sm font-medium text-blue-600">Our Partners</p>
          </div>
          
          <h2 className={`text-3xl md:text-4xl font-bold mb-4 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}>
            Collaborating with Industry Leaders
          </h2>
          
          <p className={`text-lg text-gray-600 max-w-2xl mx-auto transition-all duration-700 delay-100 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}>
            We partner with innovative companies to deliver exceptional AI solutions and healthcare technologies.
          </p>
        </div>
        
        <div className="flex justify-center mb-12">
          {partners.map((partner, index) => (
            <div 
              key={index}
              className={`card-hover flex items-center justify-center transition-all duration-700 ease-out opacity-0 translate-y-8`}
              style={{ 
                transitionDelay: `${partner.delay}ms`,
                animation: isVisible ? `fade-in 0.6s ease-out ${partner.delay}ms forwards` : 'none'
              }}
            >
              <div className="h-28 w-full max-w-xs bg-gray-50 rounded-xl border border-gray-100 flex items-center justify-center p-6">
                <span className="text-lg font-medium text-gray-600">{partner.name}</span>
              </div>
            </div>
          ))}
        </div>

        <div className={`mt-12 transition-all duration-700 delay-200 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}>
          <h3 className="text-2xl font-bold text-center mb-8">Our Key Team Members</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {teamMembers.map((member) => (
              <div key={member.id} className="bg-gray-50 rounded-xl border border-gray-100 p-6">
                <div className="flex flex-col items-center">
                  <div className="w-40 h-40 mb-4 rounded-full overflow-hidden border-2 border-blue-100 flex items-center justify-center bg-gray-100">
                    {member.image ? (
                      <img 
                        src={member.image} 
                        alt={`${member.name}'s profile`} 
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="text-gray-400">No image</div>
                    )}
                  </div>
                  <h4 className="text-xl font-semibold mb-2">{member.name}</h4>
                  {member.role && (
                    <p className="text-gray-600 mb-3">{member.role}</p>
                  )}
                  {member.allowUpload && (
                    <div className="mt-2">
                      <Input
                        type="file"
                        accept="image/*"
                        id={`image-upload-${member.id}`}
                        onChange={(e) => handleImageUpload(member.id, e)}
                        className="cursor-pointer"
                      />
                      <label htmlFor={`image-upload-${member.id}`} className="block text-sm text-gray-600 mt-1">
                        Upload profile picture
                      </label>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Partners;
