
import React, { useState, useRef, useEffect } from 'react';
import { Bot, X, Send, User } from 'lucide-react';
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
}

const AIAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
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
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);
  
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const toggleChat = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      toast({
        title: "SparkStorm AI Assistant",
        description: "How can I help you today?",
        duration: 3000,
      });
    }
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

    // Simulate AI response after a short delay
    setTimeout(() => {
      processUserMessage(inputValue);
      setIsTyping(false);
    }, 1000);
  };

  const processUserMessage = (message: string) => {
    const lowerCaseMessage = message.toLowerCase();
    let response = '';

    // Navigation requests
    if (lowerCaseMessage.includes('home') || lowerCaseMessage.includes('go to home')) {
      navigate('/');
      response = "I've navigated you to our home page.";
    } 
    else if (lowerCaseMessage.includes('services') || lowerCaseMessage.includes('go to services')) {
      navigate('/#services');
      response = "I've scrolled to our services section. We offer a range of AI solutions for businesses.";
    }
    else if (lowerCaseMessage.includes('team') || lowerCaseMessage.includes('go to team')) {
      navigate('/#team');
      response = "I've scrolled to our team section. Meet our talented team of experts!";
    }
    else if (lowerCaseMessage.includes('contact') || lowerCaseMessage.includes('go to contact')) {
      navigate('/#contact');
      response = "I've scrolled to our contact section. Feel free to reach out to us!";
    }
    
    // Company information
    else if (lowerCaseMessage.includes('about') || lowerCaseMessage.includes('what is sparkstorm')) {
      response = "SparkStorm AI is a leading provider of artificial intelligence solutions. We specialize in creating custom AI tools and services that help businesses automate processes, gain insights from their data, and enhance customer experiences.";
    }
    else if (lowerCaseMessage.includes('founder') || lowerCaseMessage.includes('ceo')) {
      response = "SparkStorm AI was founded by Noopur Gupta, who currently serves as our CEO. She has a strong vision for ethical AI development and application.";
    }
    else if (lowerCaseMessage.includes('service') || lowerCaseMessage.includes('what do you offer')) {
      response = "We offer a range of AI services including custom AI development, AI integration, machine learning models, natural language processing solutions, computer vision systems, and AI consulting.";
    }
    else if (lowerCaseMessage.includes('contact') || lowerCaseMessage.includes('reach')) {
      response = "You can contact us through our contact form on the website, or email us directly at info@sparkstorm.ai. We're always happy to answer your questions!";
    }
    else if (lowerCaseMessage.includes('location') || lowerCaseMessage.includes('where are you')) {
      response = "Our headquarters is located in California, but we serve clients globally.";
    }
    else if (lowerCaseMessage.includes('cost') || lowerCaseMessage.includes('pricing')) {
      response = "Our pricing varies based on the scope and requirements of each project. We offer custom solutions tailored to your specific needs. Contact us for a personalized quote!";
    }
    // Generic fallback
    else {
      response = "Thank you for your message! I'm still learning and may not have all the answers. For specific information about our services or to discuss how we can help your business, please contact our team through the contact form or email info@sparkstorm.ai.";
    }

    // Add bot response
    const botMessage: Message = {
      id: messages.length + 2,
      content: response,
      sender: 'bot',
      timestamp: new Date(),
    };
    
    setMessages((prev) => [...prev, botMessage]);
  };

  return (
    <>
      {/* Chat button */}
      <button
        onClick={toggleChat}
        className="fixed bottom-6 right-6 bg-blue-600 hover:bg-blue-700 text-white rounded-full p-4 shadow-lg z-50 transition-all duration-300 hover:scale-110"
        aria-label="Chat with SparkStorm AI Assistant"
      >
        <Bot size={24} />
      </button>

      {/* Chat window */}
      {isOpen && (
        <Card className="fixed bottom-24 right-6 w-80 sm:w-96 h-[500px] max-h-[calc(100vh-150px)] flex flex-col bg-white rounded-xl shadow-xl z-50 border border-gray-200 overflow-hidden">
          {/* Header */}
          <div className="p-4 bg-blue-600 text-white flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Avatar className="h-8 w-8 border-2 border-white">
                <AvatarImage src="/lovable-uploads/7879e10d-f875-48a1-a7a4-43be226d30a0.png" alt="SparkStorm AI" />
                <AvatarFallback>AI</AvatarFallback>
              </Avatar>
              <div>
                <h3 className="font-semibold">SparkStorm AI Assistant</h3>
                <p className="text-xs opacity-75">Online</p>
              </div>
            </div>
            <Button variant="ghost" size="icon" onClick={toggleChat} className="text-white hover:bg-blue-700">
              <X size={18} />
            </Button>
          </div>

          {/* Messages container */}
          <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
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

          {/* Input form */}
          <form onSubmit={handleSubmit} className="p-3 bg-white border-t border-gray-200 flex gap-2">
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
          </form>
        </Card>
      )}
    </>
  );
};

export default AIAssistant;
