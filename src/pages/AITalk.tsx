
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CalendarDays, User, Mail, Mic } from "lucide-react";
import AITalkRequestForm from "@/components/AITalk/AITalkRequestForm";

const AITalk = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<string>("summit");

  const handleRegisterClick = () => {
    window.open("https://www.zeffy.com/en-US/ticketing/autmhq-tech-summit--2025", "_blank");
  };

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>AI Talk Events | SparkStorm AI</title>
        <meta name="description" content="AI Talk Events and speaking engagements by SparkStorm AI CEO Noopur Gupta" />
      </Helmet>
      
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <Tabs defaultValue="summit" className="w-full" onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="summit">Upcoming Summit</TabsTrigger>
            <TabsTrigger value="request">Request AI Talk</TabsTrigger>
          </TabsList>
          
          <TabsContent value="summit" className="space-y-8">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="bg-black rounded-lg overflow-hidden shadow-xl">
                <img 
                  src="/lovable-uploads/a3a1e859-eb07-48d6-a5fc-6f5afaf30be0.png" 
                  alt="AUTMHQ Tech Summit" 
                  className="w-full h-auto"
                />
              </div>
              
              <div className="space-y-4">
                <h1 className="text-3xl md:text-4xl font-bold text-gradient bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-cyan-400">
                  AUTMHQ Tech Summit 2025
                </h1>
                <p className="text-lg">
                  Event by Austin Urban Technology Movement (AUTMHQ)
                </p>
                <div className="flex items-center text-gray-700 space-x-2">
                  <CalendarDays className="h-5 w-5 text-primary" />
                  <span>Sat, May 17, 2025, 1:00 PM - 5:00 PM (your local time)</span>
                </div>
                <div className="flex items-start text-gray-700 space-x-2">
                  <span className="mt-1">📍</span>
                  <span>506 Congress Ave, Austin, Texas, US, 78701</span>
                </div>
                
                <Button 
                  onClick={handleRegisterClick} 
                  className="mt-4 text-white bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 shadow-lg"
                  size="lg"
                >
                  Register Now
                </Button>
                
                <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-md mt-6">
                  <p className="font-medium text-blue-700">
                    SparkStorm AI CEO Noopur Gupta will be speaking on the "Emerging Technology" panel.
                  </p>
                  <p className="text-blue-600 mt-2">
                    She will be sharing insights on an entrepreneur's early struggles in website development and AI innovation.
                  </p>
                </div>
              </div>
            </div>
            
            <Card className="mt-8">
              <CardContent className="pt-6">
                <h2 className="text-2xl font-bold mb-4">About the Event</h2>
                <p className="mb-4">
                  This half-day summit will feature an expert-led panel, interactive workshops, intentional networking, and career-focused insights, all designed to bridge the digital divide and open new opportunities. Whether you're a tech professional, student, entrepreneur, or community advocate, the Tech Summit will leave you inspired, informed, and connected.
                </p>
                
                <div className="grid md:grid-cols-3 gap-6 mb-6">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="font-semibold">Date</h3>
                    <p>Saturday, May 17, 2025</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="font-semibold">Time</h3>
                    <p>1:00 PM – 5:00 PM</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="font-semibold">Location</h3>
                    <p>506 Congress Ave.</p>
                  </div>
                </div>
                
                <h2 className="text-2xl font-bold mt-8 mb-4">What to Expect</h2>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <span className="mr-2">💡</span>
                    <span>Thought-provoking discussions on the future of technology</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">🤝</span>
                    <span>Networking opportunities with industry leaders and changemakers</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">🎤</span>
                    <span>Insightful conversations on digital equity, innovation, and career pathways</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">📣</span>
                    <span>Information on how you can support and get involved with AUTMHQ's mission</span>
                  </li>
                </ul>
                
                <h2 className="text-2xl font-bold mt-8 mb-4">Itinerary</h2>
                <ul className="space-y-4">
                  <li className="flex">
                    <span className="font-medium min-w-[90px]">1:00 PM:</span>
                    <span>Doors Open; Networking</span>
                  </li>
                  <li className="flex">
                    <span className="font-medium min-w-[90px]">1:30 PM:</span>
                    <span>Interactive Workshop with Black Girls Think Tank: "Career Code Switch – Using AI to Translate Your Transferable Skills"</span>
                  </li>
                  <li className="flex bg-blue-50 p-2 rounded">
                    <span className="font-medium min-w-[90px]">2:30 PM:</span>
                    <span>Panel "Emerging Technology" with Waziri Garuba, Christopher Little, <span className="font-semibold">Noopur G.</span>, and moderated by AUTMHQ's Nareman Dabbas</span>
                  </li>
                  <li className="flex">
                    <span className="font-medium min-w-[90px]">3:30 PM:</span>
                    <span>Interactive Workshop with AUTMHQ: "Mastering Yourself with AI"</span>
                  </li>
                  <li className="flex">
                    <span className="font-medium min-w-[90px]">4:30 PM:</span>
                    <span>Closing Remarks; Networking</span>
                  </li>
                  <li className="flex">
                    <span className="font-medium min-w-[90px]">5:00 PM:</span>
                    <span>Event Ends</span>
                  </li>
                </ul>
                
                <div className="mt-8 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <p className="font-medium text-center">
                    Don't miss this opportunity to be part of the movement shaping a more inclusive and innovative future in tech!
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="request">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h1 className="text-3xl font-bold mb-4">Book Noopur for AI Talks</h1>
                <p className="text-lg mb-6">
                  Request a custom-tailored AI presentation for your event or organization. Our CEO Noopur Gupta offers engaging talks on various AI topics customized to your audience's needs and interests.
                </p>
                
                <div className="bg-gray-50 p-6 rounded-lg mb-8">
                  <h3 className="text-xl font-semibold mb-3">Popular Speaking Topics</h3>
                  <ul className="space-y-3">
                    <li className="flex">
                      <span className="mr-2">🚀</span>
                      <span>AI for Entrepreneurs: Navigating the Future of Business</span>
                    </li>
                    <li className="flex">
                      <span className="mr-2">💻</span>
                      <span>Building Intelligence as a Service: The Journey of SparkStorm AI</span>
                    </li>
                    <li className="flex">
                      <span className="mr-2">🔮</span>
                      <span>Ethical AI: Ensuring Responsible Innovation in Technology</span>
                    </li>
                    <li className="flex">
                      <span className="mr-2">📈</span>
                      <span>From Ideas to Implementation: AI Strategy for Startups</span>
                    </li>
                    <li className="flex">
                      <span className="mr-2">🌐</span>
                      <span>AI in Healthcare: Transforming Medical Data Management</span>
                    </li>
                  </ul>
                </div>
                
                <Card>
                  <CardContent className="pt-6">
                    <h3 className="text-xl font-semibold mb-3">Why Book Noopur?</h3>
                    <ul className="space-y-3">
                      <li className="flex items-start">
                        <div className="mr-3 mt-1 bg-blue-100 p-1.5 rounded-full text-blue-600">
                          <Mic className="h-4 w-4" />
                        </div>
                        <span>Engaging and insightful presentations tailored to your audience</span>
                      </li>
                      <li className="flex items-start">
                        <div className="mr-3 mt-1 bg-blue-100 p-1.5 rounded-full text-blue-600">
                          <User className="h-4 w-4" />
                        </div>
                        <span>Founder experience from building a successful AI startup</span>
                      </li>
                      <li className="flex items-start">
                        <div className="mr-3 mt-1 bg-blue-100 p-1.5 rounded-full text-blue-600">
                          <CalendarDays className="h-4 w-4" />
                        </div>
                        <span>Flexible scheduling for in-person or virtual events</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
              
              <div>
                <AITalkRequestForm />
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default AITalk;
