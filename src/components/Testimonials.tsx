import { useState, useEffect, useRef } from "react";
import { useInView } from "react-intersection-observer";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Testimonial {
  quote: string;
  author: string;
  position: string;
  company?: string;
}

const Testimonials = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  
  const [isVisible, setIsVisible] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  
  useEffect(() => {
    if (inView) {
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 100);
      
      return () => clearTimeout(timer);
    }
  }, [inView]);
  
  const testimonials: Testimonial[] = [
    {
      quote: "SparkStorm AI's chatbot solution revolutionized our customer service operations. We've seen a 40% reduction in response times and significantly improved customer satisfaction.",
      author: "Alexandra Chen",
      position: "CTO",
      company: "RetailTech Inc."
    },
    {
      quote: "The MediWallet app has made managing my patients' medical records incredibly efficient. The secure access features give both my team and our patients peace of mind.",
      author: "Dr. Michael Rodriguez",
      position: "Medical Director",
      company: "Innovate Health"
    },
    {
      quote: "Working with SparkStorm AI has been a game-changer for our business. Their AI solutions streamlined our processes and helped us achieve remarkable growth in just six months.",
      author: "Sarah Johnson",
      position: "Operations Manager",
      company: "Global Solutions"
    },
    {
      quote: "SparkStorm AI and MediWallet will be so much better than the \"CD\" my mom's doctor gave to her years ago. I have to scramble on my phone looking for what supplements and herbs she takes every time I take her to her appointments.",
      author: "Sandra Gifford",
      position: "Marketing Strategist"
    },
    {
      quote: "This app is amazing. With as many times as we have moved, the MediWallet platform and SparkStorm AI would have been so, so important for us. It's clean, efficient, and remarkably easy to navigate.",
      author: "Jacquie",
      position: "Parent and Frequent Relocator"
    }
  ];
  
  const startAutoPlay = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000); // Change testimonial every 5 seconds
  };
  
  const stopAutoPlay = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };
  
  useEffect(() => {
    startAutoPlay();
    return () => stopAutoPlay();
  }, []);
  
  const handlePrev = () => {
    stopAutoPlay();
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    startAutoPlay();
  };
  
  const handleNext = () => {
    stopAutoPlay();
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
    startAutoPlay();
  };
  
  const handleDotClick = (index: number) => {
    stopAutoPlay();
    setActiveIndex(index);
    startAutoPlay();
  };

  return (
    <section id="testimonials" className="py-16 bg-gray-50">
      <div className="section-container" ref={ref}>
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-block mb-3 px-4 py-1.5 bg-blue-50 rounded-full">
            <p className="text-xs sm:text-sm font-medium text-blue-600">Testimonials</p>
          </div>
          
          <h2 className={`text-3xl md:text-4xl font-bold mb-4 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}>
            What Our Clients Say
          </h2>
          
          <p className={`text-lg text-gray-600 max-w-2xl mx-auto transition-all duration-700 delay-100 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}>
            Hear from businesses and professionals who have transformed their operations with our AI solutions.
          </p>
        </div>
        
        <div 
          className={`relative max-w-4xl mx-auto px-4 transition-all duration-700 delay-200 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          {/* Testimonial Slider */}
          <div className="overflow-hidden">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${activeIndex * 100}%)` }}
            >
              {testimonials.map((testimonial, index) => (
                <div key={index} className="w-full flex-shrink-0 px-4">
                  <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8 relative overflow-hidden">
                    <div className="absolute top-4 right-4 md:top-6 md:right-6 text-blue-100">
                      <Quote size={48} />
                    </div>
                    <blockquote className="relative z-10">
                      <p className="text-lg md:text-xl leading-relaxed font-medium text-gray-700 mb-6">
                        "{testimonial.quote}"
                      </p>
                      <footer>
                        <div className="flex items-center">
                          <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                            <span className="text-blue-600 font-bold text-lg">
                              {testimonial.author.charAt(0)}
                            </span>
                          </div>
                          <div>
                            <p className="font-semibold text-gray-900">{testimonial.author}</p>
                            <p className="text-gray-500">
                              {testimonial.position}
                            </p>
                          </div>
                        </div>
                      </footer>
                    </blockquote>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Navigation Buttons */}
          <div className="flex justify-between mt-6">
            <Button 
              variant="outline" 
              size="icon" 
              className="rounded-full shadow-sm"
              onClick={handlePrev}
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            
            <div className="flex items-center space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => handleDotClick(index)}
                  className={`h-2.5 w-2.5 rounded-full transition-all duration-300 ${
                    activeIndex === index ? "bg-blue-600 w-6" : "bg-gray-300"
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
            
            <Button 
              variant="outline" 
              size="icon" 
              className="rounded-full shadow-sm"
              onClick={handleNext}
              aria-label="Next testimonial"
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
