
import React, { useState, useRef, useEffect } from 'react';
import { X, Send, MessageSquare, ExternalLink, ChevronsUp, ChevronsDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';

interface Message {
  id: number;
  content: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  links?: { text: string, url: string }[];
}

const AIAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isBouncing, setIsBouncing] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      content: "Hi there! I'm SparkStorm AI Assistant. How can I help you today?",
      sender: 'bot',
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  
  // Trigger attention-grabbing animation periodically
  useEffect(() => {
    const bouncingInterval = setInterval(() => {
      if (!isOpen) {
        setIsBouncing(true);
        setTimeout(() => setIsBouncing(false), 2000);
      }
    }, 45000); // Bounce every 45 seconds if chat is closed
    
    return () => clearInterval(bouncingInterval);
  }, [isOpen]);
  
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isTyping]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const toggleChat = () => {
    setIsOpen(!isOpen);
    setIsMinimized(false);
    if (!isOpen) {
      toast({
        title: "SparkStorm AI Assistant",
        description: "How can I help you today?",
        duration: 3000,
      });
    }
  };
  
  const toggleMinimize = () => {
    setIsMinimized(!isMinimized);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: messages.length + 1,
      content: inputValue,
      sender: 'user',
      timestamp: new Date(),
    };
    
    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Process user message after a short delay to simulate AI thinking
    setTimeout(() => {
      const botResponse = processUserMessage(inputValue);
      
      const botMessage: Message = {
        id: messages.length + 2,
        content: botResponse.text,
        sender: 'bot',
        timestamp: new Date(),
        links: botResponse.links,
      };
      
      setMessages((prev) => [...prev, botMessage]);
      setIsTyping(false);
    }, 1000);
  };

  const processUserMessage = (message: string): { text: string, links?: { text: string, url: string }[] } => {
    const lowerCaseMessage = message.toLowerCase();
    
    // Context-aware responses
    
    // NAVIGATION REQUESTS
    if (lowerCaseMessage.includes('home') || lowerCaseMessage.includes('go to home')) {
      navigate('/');
      return { 
        text: "Here's our home page. Is there something specific you'd like to know about SparkStorm AI?"
      };
    } 
    
    // SERVICES INFORMATION
    else if (lowerCaseMessage.includes('services') || lowerCaseMessage.includes('go to services')) {
      navigate('/#services');
      return { 
        text: "Our services include AI chatbots, MediWallet health records platform, NLP solutions, computer vision systems, and custom AI development. Each solution is tailored to meet your specific business needs."
      };
    }
    
    // TEAM INFORMATION
    else if (lowerCaseMessage.includes('team') || lowerCaseMessage.includes('board') || lowerCaseMessage.includes('advisory')) {
      navigate('/#team');
      return { 
        text: "Our advisory board consists of Noopur Gupta (Founder & CEO), Muzammil (Fractional COO), Rachel Pulice (UX Designer), Aarnav Chandraganti (AI Developer), and Shloak Gupta (AI Developer). Each member brings unique expertise to deliver exceptional AI solutions."
      };
    }
    
    // CONTACT INFORMATION
    else if (lowerCaseMessage.includes('contact') || lowerCaseMessage.includes('get in touch')) {
      navigate('/#contact');
      return { 
        text: "You can reach our team by email at info@sparkstorm.ai, by phone at (555) 123-4567, or through our contact form. We're always happy to discuss how we can help with your AI needs."
      };
    }
    
    // PARTNERS INFORMATION
    else if (lowerCaseMessage.includes('partners') || lowerCaseMessage.includes('go to partners')) {
      navigate('/#partners');
      return { 
        text: "SparkStorm AI partners with leading technology firms, healthcare providers, and research institutions to deliver cutting-edge AI solutions."
      };
    }
    
    // TESTIMONIALS INFORMATION
    else if (lowerCaseMessage.includes('testimonials') || lowerCaseMessage.includes('reviews')) {
      navigate('/#testimonials');
      return { 
        text: "Our clients have experienced significant improvements in their operations through our AI solutions. We have testimonials from business leaders like Alexandra Chen and Sarah Johnson, healthcare professionals like Dr. Rodriguez, and users like Sandra Gifford and Jacquie who have benefited from our MediWallet platform."
      };
    }
    
    // NEWSLETTER INFORMATION
    else if (lowerCaseMessage.includes('newsletter') || lowerCaseMessage.includes('updates')) {
      navigate('/#newsletter');
      return { 
        text: "Our newsletter provides valuable insights into AI trends, case studies, and SparkStorm updates. You can subscribe to stay informed about the latest developments in AI technology and our new solutions."
      };
    }
    
    // INDIVIDUAL TEAM MEMBER INFORMATION
    else if (lowerCaseMessage.includes('noopur') || lowerCaseMessage.includes('founder') || lowerCaseMessage.includes('ceo')) {
      navigate('/#team');
      return { 
        text: "Noopur Gupta is the Founder & CEO of SparkStorm AI. She has a strong vision for ethical AI development and leads our company's strategic direction. You can connect with her on LinkedIn or Instagram.",
        links: [
          { text: "LinkedIn", url: "https://www.linkedin.com/in/noopurgupta01/" },
          { text: "Instagram", url: "https://www.instagram.com/noopurrofficial" }
        ]
      };
    }
    else if (lowerCaseMessage.includes('muzammil') || lowerCaseMessage.includes('coo') || lowerCaseMessage.includes('operations')) {
      navigate('/#team');
      return { 
        text: "Muzammil serves as our Fractional COO, overseeing operations and ensuring smooth execution of our projects and services. His expertise helps SparkStorm AI deliver consistent value to our clients.",
        links: [
          { text: "LinkedIn", url: "https://www.linkedin.com/in/muzammil-w-iqbal/" }
        ]
      };
    }
    else if (lowerCaseMessage.includes('rachel') || lowerCaseMessage.includes('pulice') || lowerCaseMessage.includes('design')) {
      navigate('/#team');
      return { 
        text: "Rachel Pulice is our UX Designer who creates intuitive, user-friendly interfaces for our AI solutions. Her designs ensure that our advanced technology remains accessible and easy to use.",
        links: [
          { text: "LinkedIn", url: "https://www.linkedin.com/in/rachel-pulice/" }
        ]
      };
    }
    else if (lowerCaseMessage.includes('aarnav') || lowerCaseMessage.includes('chandraganti')) {
      navigate('/#team');
      return { 
        text: "Aarnav Chandraganti is an AI Developer at SparkStorm AI who builds advanced machine learning models and implements cutting-edge AI solutions for our clients.",
        links: [
          { text: "LinkedIn", url: "https://www.linkedin.com/in/aarnav-chandraganti/" }
        ]
      };
    }
    else if (lowerCaseMessage.includes('shloak') || lowerCaseMessage.includes('gupta')) {
      navigate('/#team');
      return { 
        text: "Shloak Gupta serves as an AI Developer, creating sophisticated algorithms and AI-powered solutions that help our clients achieve their business objectives.",
        links: [
          { text: "LinkedIn", url: "https://www.linkedin.com/in/shloak-gupta-428412218/" }
        ]
      };
    }
    
    // SPECIFIC TESTIMONIAL REQUESTS
    else if (lowerCaseMessage.includes('testimonial')) {
      if (lowerCaseMessage.includes('sandra') || lowerCaseMessage.includes('gifford')) {
        return { 
          text: "Sandra Gifford shared: \"SparkStorm AI and MediWallet will be so much better than the 'CD' my mom's doctor gave to her years ago. I have to scramble on my phone looking for what supplements and herbs she takes every time I take her to her appointments.\""
        };
      }
      else if (lowerCaseMessage.includes('jacquie')) {
        return { 
          text: "Jacquie said: \"This app is amazing. With as many times as we have moved, the MediWallet platform and SparkStorm AI would have been so, so important for us. It's clean, efficient, and remarkably easy to navigate.\""
        };
      }
      else if (lowerCaseMessage.includes('michael') || lowerCaseMessage.includes('rodriguez') || lowerCaseMessage.includes('doctor')) {
        return { 
          text: "Dr. Michael Rodriguez shared: \"The MediWallet app has made managing my patients' medical records incredibly efficient. The secure access features give both my team and our patients peace of mind.\""
        };
      }
      else if (lowerCaseMessage.includes('alexandra') || lowerCaseMessage.includes('chen') || lowerCaseMessage.includes('chatbot')) {
        return { 
          text: "Alexandra Chen reported: \"SparkStorm AI's chatbot solution revolutionized our customer service operations. We've seen a 40% reduction in response times and significantly improved customer satisfaction.\""
        };
      }
      else if (lowerCaseMessage.includes('sarah') || lowerCaseMessage.includes('johnson')) {
        return { 
          text: "Sarah Johnson stated: \"Working with SparkStorm AI has been a game-changer for our business. Their AI solutions streamlined our processes and helped us achieve remarkable growth in just six months.\""
        };
      }
      else {
        return { 
          text: "Our clients have shared amazing feedback about our services. Sandra Gifford mentioned how MediWallet would help her manage her mother's medical information, while Jacquie highlighted how clean, efficient, and easy to navigate the platform is. Dr. Rodriguez praised the efficiency of our platform, and Alexandra Chen saw a 40% reduction in response times with our chatbot solution."
        };
      }
    }
    
    // PRODUCT-SPECIFIC INFORMATION
    else if (lowerCaseMessage.includes('mediwallet') || lowerCaseMessage.includes('medi wallet') || lowerCaseMessage.includes('health records') || lowerCaseMessage.includes('medical records')) {
      return { 
        text: "MediWallet is our secure personal health records platform that allows patients and healthcare providers to safely manage medical records. It features encrypted storage, easy access controls, and intuitive interfaces to simplify healthcare record management. It's particularly helpful for people like Sandra who need to track family members' medical information, and for families like Jacquie's who move frequently.",
        links: [
          { text: "Learn more about MediWallet", url: "/#services" }
        ]
      };
    }
    
    // AI TECHNOLOGY QUESTIONS
    else if (lowerCaseMessage.includes('ai') || lowerCaseMessage.includes('artificial intelligence')) {
      if (lowerCaseMessage.includes('benefit')) {
        return { 
          text: "SparkStorm AI solutions benefit businesses by automating repetitive tasks, providing data-driven insights, personalizing customer experiences, improving decision-making, and reducing operational costs. Our clients typically see efficiency improvements of 30-50% in their targeted processes."
        };
      }
      else if (lowerCaseMessage.includes('future') || lowerCaseMessage.includes('trend')) {
        return { 
          text: "The future of AI is moving toward more personalized, context-aware systems that can understand and anticipate human needs. At SparkStorm AI, we're particularly focused on developing AI that's transparent, ethical, and aligned with human values. Key trends we're watching include multimodal AI, advancements in large language models, edge AI deployment, and AI-human collaboration frameworks."
        };
      }
      else {
        return { 
          text: "Artificial Intelligence is our core expertise at SparkStorm. We develop custom AI solutions to help businesses automate tasks, gain insights, and create more personalized customer experiences. Our AI solutions are built with ethical considerations at the forefront, ensuring they remain transparent, fair, and aligned with your business values."
        };
      }
    }
    
    else if (lowerCaseMessage.includes('machine learning') || lowerCaseMessage.includes('ml')) {
      return { 
        text: "Our machine learning solutions at SparkStorm AI help businesses identify patterns in data, make predictions, and optimize processes. We develop custom ML models tailored to your specific needs, whether that's for predictive analytics, recommendation systems, anomaly detection, or process automation. Our ML models are continuously trained and improved to ensure they deliver accurate, reliable results."
      };
    }
    
    else if (lowerCaseMessage.includes('nlp') || lowerCaseMessage.includes('natural language')) {
      return { 
        text: "Our Natural Language Processing (NLP) solutions help businesses understand and generate human language, enabling applications like chatbots, sentiment analysis, and automated content creation. We use advanced NLP techniques to ensure our solutions can understand context, detect sentiment, and respond naturally. This technology powers our conversational AI assistants, content analysis tools, and language translation systems."
      };
    }
    
    else if (lowerCaseMessage.includes('computer vision') || lowerCaseMessage.includes('image recognition')) {
      return { 
        text: "SparkStorm's computer vision solutions enable machines to interpret and understand visual information, powering applications like object detection, facial recognition, and automated inspection systems. Our computer vision technology is used in healthcare for medical imaging analysis, in manufacturing for quality control, and in retail for inventory management and customer behavior analysis."
      };
    }
    
    // PRICING INFORMATION
    else if (lowerCaseMessage.includes('cost') || lowerCaseMessage.includes('pricing') || lowerCaseMessage.includes('price')) {
      return { 
        text: "Our pricing varies based on the scope and requirements of each project. We offer custom solutions tailored to your specific needs, with options ranging from project-based pricing to subscription models. For MediWallet, we have tiered pricing plans for individuals, families, and healthcare providers. Contact us for a personalized quote based on your organization's specific requirements.",
        links: [
          { text: "Contact for pricing", url: "/#contact" }
        ]
      };
    }
    
    // BOOKING INFORMATION
    else if (lowerCaseMessage.includes('book') || lowerCaseMessage.includes('demo') || lowerCaseMessage.includes('appointment') || lowerCaseMessage.includes('meeting')) {
      return { 
        text: "You can easily book a demo or consultation with our team by clicking the 'Book Demo' button in the top right corner of our website. This will give you direct access to Noopur Gupta's calendar, where you can select a time that works best for you. During this meeting, we can discuss your specific needs and show you how our AI solutions can address your challenges.",
        links: [
          { text: "Book a demo", url: "https://calendly.com/noopurgupta01/1x1" }
        ]
      };
    }
    
    // CASE STUDIES
    else if (lowerCaseMessage.includes('case') || lowerCaseMessage.includes('success') || lowerCaseMessage.includes('example')) {
      return { 
        text: "We've helped businesses across various industries implement AI solutions with impressive results. For example, we developed a predictive maintenance system for a manufacturing company that reduced downtime by 35%, a customer service AI for a retail business that improved response times by 60%, and a healthcare data analysis platform that increased diagnostic accuracy by 25%. These case studies demonstrate the tangible benefits our AI solutions can provide to your business."
      };
    }
    
    // GREETING RESPONSES
    else if (lowerCaseMessage.includes('hello') || lowerCaseMessage.includes('hi') || lowerCaseMessage.includes('hey')) {
      return { 
        text: "Hello! Welcome to SparkStorm AI. I'm your AI assistant, ready to help with information about our services, team, MediWallet platform, or anything else you'd like to know. How can I assist you today?"
      };
    }
    
    else if (lowerCaseMessage.includes('thank') || lowerCaseMessage.includes('thanks')) {
      return { 
        text: "You're welcome! I'm glad I could help. If you have any more questions about our services, MediWallet platform, or anything else, feel free to ask. We're committed to providing innovative AI solutions that make a real difference for our clients."
      };
    }
    
    // COMPANY INFORMATION
    else if (lowerCaseMessage.includes('about') || lowerCaseMessage.includes('what is') || lowerCaseMessage.includes('sparkstorm')) {
      return { 
        text: "SparkStorm AI is a leading provider of artificial intelligence solutions founded by Noopur Gupta. We specialize in creating custom AI tools and services that help businesses automate processes, gain insights from their data, and enhance customer experiences. Our flagship product, MediWallet, is revolutionizing how medical records are managed. Our team of AI experts, designers, and developers works closely with clients to deliver solutions that address their specific challenges.",
        links: [
          { text: "Our Services", url: "/#services" },
          { text: "Meet Our Team", url: "/#team" }
        ]
      };
    }
    
    // LOCATION INFORMATION
    else if (lowerCaseMessage.includes('location') || lowerCaseMessage.includes('where are you')) {
      return { 
        text: "Our headquarters is located in California, but we serve clients globally. Our remote-first approach allows us to collaborate with clients and partners around the world, providing AI solutions that meet international standards while addressing local needs."
      };
    }
    
    // ETHICAL AI
    else if (lowerCaseMessage.includes('ethic') || lowerCaseMessage.includes('responsible') || lowerCaseMessage.includes('bias')) {
      return { 
        text: "At SparkStorm AI, ethical AI development is a core principle. We design our solutions with transparency, fairness, and accountability in mind. This includes rigorous testing for biases, clear explanations of how our AI makes decisions, and privacy-preserving technologies. We believe AI should enhance human capabilities while respecting human values and rights."
      };
    }
    
    // IMPLEMENTATION PROCESS
    else if (lowerCaseMessage.includes('process') || lowerCaseMessage.includes('implement') || lowerCaseMessage.includes('how does it work')) {
      return { 
        text: "Our implementation process begins with a thorough assessment of your needs and goals. We then design a custom solution, develop and test it thoroughly, and provide comprehensive training and support during deployment. Throughout this process, we maintain clear communication and collaborate closely with your team to ensure the solution integrates seamlessly with your existing systems and processes. After implementation, we provide ongoing support and optimization to ensure continued success."
      };
    }
    
    // CUSTOM REQUEST
    else if (lowerCaseMessage.includes('custom') || lowerCaseMessage.includes('specific need') || lowerCaseMessage.includes('unique')) {
      return { 
        text: "We specialize in developing custom AI solutions tailored to your specific needs. Our team of experts will work closely with you to understand your challenges, objectives, and requirements, then design and implement a solution that addresses them effectively. Whether you need a custom chatbot, a specialized data analysis tool, or an integrated AI system, we can help you bring your vision to life.",
        links: [
          { text: "Contact us", url: "/#contact" },
          { text: "Book a consultation", url: "https://calendly.com/noopurgupta01/1x1" }
        ]
      };
    }
    
    // GENERIC FALLBACK
    else {
      return { 
        text: "Thank you for your question! As SparkStorm's AI assistant, I can help with information about our company, services, team, and AI technology. I can tell you about our MediWallet platform and how it helps users manage medical records. If you'd like more specific information, feel free to ask about our services, team members, case studies, or technology capabilities. If I couldn't answer your specific question, please contact our team through the contact form or email info@sparkstorm.ai for more specialized assistance.",
        links: [
          { text: "Our Services", url: "/#services" },
          { text: "Contact Us", url: "/#contact" }
        ]
      };
    }
  };

  return (
    <>
      {/* Enhanced chat button with animation */}
      <button
        onClick={toggleChat}
        className={`fixed bottom-6 right-6 bg-blue-600 hover:bg-blue-700 text-white rounded-full p-4 shadow-lg z-50 transition-all duration-300 hover:scale-110 ${
          isBouncing ? 'animate-bounce' : ''
        }`}
        aria-label="Chat with SparkStorm AI Assistant"
      >
        <MessageSquare size={24} className="text-white" />
      </button>

      {/* Chat window with minimize option */}
      {isOpen && (
        <Card 
          className={`fixed right-6 z-50 border border-gray-200 overflow-hidden transition-all duration-300 ease-in-out ${
            isMinimized 
              ? 'bottom-24 w-80 sm:w-72 h-14 rounded-full bg-blue-600 text-white'
              : 'bottom-24 w-80 sm:w-96 h-[500px] max-h-[calc(100vh-150px)] flex flex-col bg-white rounded-xl shadow-xl'
          }`}
        >
          {isMinimized ? (
            <div className="flex items-center justify-between w-full h-full px-4">
              <div className="flex items-center gap-2">
                <Avatar className="h-8 w-8 border-2 border-white bg-white">
                  <AvatarImage src="/lovable-uploads/e82a7fa3-a351-4944-9c59-f357e283e95d.png" alt="SparkStorm AI" className="p-1" />
                  <AvatarFallback>AI</AvatarFallback>
                </Avatar>
                <span className="font-semibold">SparkStorm AI Assistant</span>
              </div>
              <div className="flex gap-2">
                <Button variant="ghost" size="icon" onClick={toggleMinimize} className="text-white hover:bg-blue-700">
                  <ChevronsUp size={18} />
                </Button>
                <Button variant="ghost" size="icon" onClick={toggleChat} className="text-white hover:bg-blue-700">
                  <X size={18} />
                </Button>
              </div>
            </div>
          ) : (
            <>
              {/* Header */}
              <div className="p-4 bg-blue-600 text-white flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <Avatar className="h-8 w-8 border-2 border-white bg-white">
                    <AvatarImage src="/lovable-uploads/e82a7fa3-a351-4944-9c59-f357e283e95d.png" alt="SparkStorm AI" className="p-1" />
                    <AvatarFallback>AI</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-semibold">SparkStorm AI Assistant</h3>
                    <p className="text-xs opacity-75">Online</p>
                  </div>
                </div>
                <div className="flex gap-1">
                  <Button variant="ghost" size="icon" onClick={toggleMinimize} className="text-white hover:bg-blue-700">
                    <ChevronsDown size={18} />
                  </Button>
                  <Button variant="ghost" size="icon" onClick={toggleChat} className="text-white hover:bg-blue-700">
                    <X size={18} />
                  </Button>
                </div>
              </div>

              {/* Messages container */}
              <div ref={chatContainerRef} className="flex-1 overflow-y-auto p-4 bg-gray-50">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`mb-4 flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[80%] rounded-lg p-3 ${
                        msg.sender === 'user'
                          ? 'bg-blue-600 text-white rounded-br-none'
                          : 'bg-white border border-gray-200 rounded-bl-none'
                      }`}
                    >
                      {msg.content}
                      
                      {/* Display links if available */}
                      {msg.links && msg.links.length > 0 && (
                        <div className="mt-2 flex flex-col gap-1">
                          {msg.links.map((link, idx) => (
                            <a 
                              key={idx}
                              href={link.url}
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="flex items-center gap-1 text-sm font-medium text-blue-500 hover:text-blue-700 transition-colors"
                              onClick={(e) => {
                                e.preventDefault();
                                navigate(link.url);
                              }}
                            >
                              {link.text} <ExternalLink size={12} />
                            </a>
                          ))}
                        </div>
                      )}
                      
                      <div className={`text-xs mt-1 ${msg.sender === 'user' ? 'text-blue-100' : 'text-gray-400'}`}>
                        {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </div>
                    </div>
                  </div>
                ))}
                
                {isTyping && (
                  <div className="flex justify-start mb-4">
                    <div className="bg-white border border-gray-200 rounded-lg rounded-bl-none p-3 max-w-[80%]">
                      <div className="flex space-x-2">
                        <div className="w-2 h-2 bg-gray-300 rounded-full animate-pulse"></div>
                        <div className="w-2 h-2 bg-gray-300 rounded-full animate-pulse delay-75"></div>
                        <div className="w-2 h-2 bg-gray-300 rounded-full animate-pulse delay-150"></div>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Enhanced input form with suggestions */}
              <form onSubmit={handleSubmit} className="p-3 bg-white border-t border-gray-200">
                <div className="flex gap-2 mb-2">
                  <button 
                    type="button" 
                    className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors"
                    onClick={() => setInputValue("Tell me about MediWallet")}
                  >
                    MediWallet
                  </button>
                  <button 
                    type="button" 
                    className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors"
                    onClick={() => setInputValue("Book a demo")}
                  >
                    Book Demo
                  </button>
                  <button 
                    type="button" 
                    className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors"
                    onClick={() => setInputValue("Who is on your team?")}
                  >
                    Team
                  </button>
                </div>
                <div className="flex gap-2">
                  <input
                    ref={inputRef}
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Ask me anything about SparkStorm AI..."
                    className="flex-1 py-2 px-3 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <Button type="submit" size="icon" className="rounded-full">
                    <Send size={18} />
                  </Button>
                </div>
              </form>
            </>
          )}
        </Card>
      )}
    </>
  );
};

export default AIAssistant;
