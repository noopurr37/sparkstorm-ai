
import TeamMember from "./team/TeamMember";
import TeamSection from "./team/TeamSection";

const Team = () => {
  const teamMembers = [
    {
      name: "Noopur Gupta",
      role: "Founder & CEO",
      image: "/lovable-uploads/5ac2a7b6-3eb0-412b-80f2-19a5e51bd19d.png",
      delay: 100,
      linkedinUrl: "https://www.linkedin.com/in/noopurgupta01/",
      instagramUrl: "https://www.instagram.com/noopurrofficial",
      email: "noopurr@sparkstorm.ai",
    },
  ];
  
  const advisoryBoard = [
    {
      name: "Sivapunniyam Dakshinamurthy",
      role: "Advisory Board Member",
      image: "/lovable-uploads/16c72fb9-4b68-4d2c-9837-ed5d77bdf7c7.png",
      delay: 500,
      linkedinUrl: "https://www.linkedin.com/in/sivapunniyamdakshinamurthy",
    },
    {
      name: "Girija Sivapunniyam",
      role: "Advisory Board Member",
      image: "/lovable-uploads/e799f8e7-efe8-421a-8904-fb3bc81e1aae.png",
      delay: 600,
      linkedinUrl: "https://www.linkedin.com/in/girijasivapunniyam/",
    }
  ];

  return (
    <section id="team" className="py-8 bg-white">
      <div className="section-container">
        <TeamSection
          title="Our Team"
          description="We're a diverse team of experienced professionals passionate about creating intelligent AI solutions that transform businesses."
        >
          <div className="flex justify-center">
            <div className="max-w-sm mx-auto">
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
          </div>
        </TeamSection>

        <div className="mt-20">
          <TeamSection
            title="Advisory Board"
            description="Our advisory board brings decades of industry experience and expertise to guide our strategic direction."
          >
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
                  />
                ))}
              </div>
            </div>
          </TeamSection>
        </div>
      </div>
    </section>
  );
};

export default Team;
