
import { useState, useEffect } from "react";
import { useInView } from "react-intersection-observer";

const Partners = () => {
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

  const partners = [
    { name: "Signa Tech", delay: 100 },
  ];

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
        
        <div className="flex justify-center">
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
      </div>
    </section>
  );
};

export default Partners;
