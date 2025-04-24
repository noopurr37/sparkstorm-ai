
import { useState, useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { ContactForm } from "./contact/ContactForm";
import { ContactInfo } from "./contact/ContactInfo";

const Contact = () => {
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
    <section id="contact" className="py-24 bg-white relative">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMzMTgyQ0UiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDM0aDR2MWgtNHYtMXptMC0yaDF2NWgtMXYtNXptMi0yaDF2MWgtMXYtMXptLTIgMmgxdjFoLTF2LTF6bS0yLTJoMXY0aC0xdi00em0tMiAwaDF2MWgtMXYtMXptLTIgMGgxdjFoLTF2LTF6bS0yIDBoMXYxaC0xdi0xem0tMiAwaDF2MWgtMXYtMXptLTIgMGgxdjFoLTF2LTF6TTExIDM0aDR2MWgtNHYtMXptMC0yaDF2NWgtMXYtNXptMi0yaDF2MWgtMXYtMXptLTIgMmgxdjFoLTF2LTF6bS0yLTJoMXY0aC0xdi00em0tMiAwaDF2MWgtMXYtMXptLTIgMGgxdjFoLTF2LTF6bS0yIDBoMXYxaC0xdi0xem0tMiAwaDF2MWgtMXYtMXptLTIgMGgxdjFoLTF2LTF6TTYxIDM0aDR2MWgtNHYtMXptMC0yaDF2NWgtMXYtNXptMi0yaDF2MWgtMXYtMXptLTIgMmgxdjFoLTF2LTF6bS0yLTJoMXY0aC0xdi00em0tMiAwaDF2MWgtMXYtMXptLTIgMGgxdjFoLTF2LTF6bS0yIDBoMXYxaC0xdi0xem0tMiAwaDF2MWgtMXYtMXptLTIgMGgxdjFoLTF2LTF6TTExIDloNHYxaC00Vjl6bTAtMmgxdjVoLTFWN3ptMi0yaDF2MWgtMVY1em0tMiAyaDF2MWgtMVY3em0tMi0yaDF2NGgtMVY1em0tMiAwaDF2MWgtMVY1em0tMiAwaDF2MWgtMVY1em0tMiAwaDF2MWgtMVY1em0tMiAwaDF2MWgtMVY1em0tMiAwaDF2MWgtMVY1ek0zNiA5aDR2MWgtNFY5em0wLTJoMXY1aC0xVjd6bTItMmgxdjFoLTFWNXptLTIgMmgxdjFoLTFWN3ptLTItMmgxdjRoLTFWNXptLTIgMGgxdjFoLTFWNXptLTIgMGgxdjFoLTFWNXptLTIgMGgxdjFoLTFWNXptLTIgMGgxdjFoLTFWNXptLTIgMGgxdjFoLTFWNXpNMTEgNTloNHYxaC00di0xem0wLTJoMXY1aC0xdi01em0yLTJoMXYxaC0xdi0xem0tMiAyaDF2MWgtMXYtMXptLTItMmgxdjRoLTF2LTR6bS0yIDBoMXYxaC0xdi0xem0tMiAwaDF2MWgtMXYtMXptLTIgMGgxdjFoLTF2LTF6bS0yIDBoMXYxaC0xdi0xem0tMiAwaDF2MWgtMXYtMXpNMzYgNTloNHYxaC00di0xem0wLTJoMXY1aC0xdi01em0yLTJoMXYxaC0xdi0xem0tMiAyaDF2MWgtMXYtMXptLTItMmgxdjRoLTF2LTR6bS0yIDBoMXYxaC0xdi0xem0tMiAwaDF2MWgtMXYtMXptLTIgMGgxdjFoLTF2LTF6bS0yIDBoMXYxaC0xdi0xem0tMiAwaDF2MWgtMXYtMXpNNjEgNTloNHYxaC00di0xem0wLTJoMXY1aC0xdi01em0yLTJoMXYxaC0xdi0xem0tMiAyaDF2MWgtMXYtMXptLTItMmgxdjRoLTF2LTR6bS0yIDBoMXYxaC0xdi0xem0tMiAwaDF2MWgtMXYtMXptLTIgMGgxdjFoLTF2LTF6bS0yIDBoMXYxaC0xdi0xem0tMiAwaDF2MWgtMXYtMXpNNjEgMzRoNHYxaC00di0xem0wLTJoMXY1aC0xdi01em0yLTJoMXYxaC0xdi0xem0tMiAyaDF2MWgtMXYtMXptLTItMmgxdjRoLTF2LTR6bS0yIDBoMXYxaC0xdi0xem0tMiAwaDF2MWgtMXYtMXptLTIgMGgxdjFoLTF2LTF6bS0yIDBoMXYxaC0xdi0xem0tMiAwaDF2MWgtMXYtMXpNNjEgOWg0djFoLTRWOXptMC0yaDF2NWgtMVY3em0yLTJoMXYxaC0xVjV6bS0yIDJoMXYxaC0xVjd6bS0yLTJoMXY0aC0xVjV6bS0yIDBoMXYxaC0xVjV6bS0yIDBoMXYxaC0xVjV6bS0yIDBoMXYxaC0xVjV6bS0yIDBoMXYxaC0xVjV6bS0yIDBoMXYxaC0xVjV6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-30"></div>
      
      <div className="section-container relative z-10" ref={ref}>
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-block mb-4 px-4 py-1.5 bg-blue-50 rounded-full">
            <p className="text-xs sm:text-sm font-medium text-blue-600">Get in Touch</p>
          </div>
          
          <h2 className={`text-3xl md:text-4xl font-bold mb-6 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}>
            Contact Us
          </h2>
          
          <p className={`text-lg text-gray-600 max-w-2xl mx-auto transition-all duration-700 delay-100 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}>
            Have questions about our AI solutions or want to discuss a potential project? We'd love to hear from you.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div 
            className={`lg:col-span-1 transition-all duration-700 delay-200 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <ContactInfo />
          </div>
          
          <div 
            className={`lg:col-span-2 transition-all duration-700 delay-300 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
