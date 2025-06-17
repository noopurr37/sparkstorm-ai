
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
        <title>AI Events & Speaking | SparkStorm AI</title>
        <meta name="description" content="AI Events and speaking engagements by SparkStorm AI CEO Noopur Gupta" />
      </Helmet>
      
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <Tabs defaultValue="summit" className="w-full" onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="summit">AI Talk with Noopur</TabsTrigger>
            <TabsTrigger value="request">Book AI Talk</TabsTrigger>
          </TabsList>
          
          <TabsContent value="summit" className="space-y-8">
            <div className="mb-12">
              <h1 className="text-3xl md:text-4xl font-bold text-gradient bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-cyan-400 mb-8">
                Recent Event Highlights
              </h1>
              
              <div className="grid md:grid-cols-2 gap-8 items-center mb-12">
                <div className="bg-black rounded-lg overflow-hidden shadow-xl">
                  <img 
                    src="/lovable-uploads/a3a1e859-eb07-48d6-a5fc-6f5afaf30be0.png" 
                    alt="AUTMHQ Tech Summit" 
                    className="w-full h-auto"
                  />
                </div>
                
                <div className="space-y-4">
                  <h2 className="text-2xl md:text-3xl font-bold">
                    AUTMHQ Tech Summit 2025
                  </h2>
                  <p className="text-lg">
                    Event by Austin Urban Technology Movement (AUTMHQ)
                  </p>
                  <div className="flex items-center text-gray-700 space-x-2">
                    <CalendarDays className="h-5 w-5 text-primary" />
                    <span>Sat, May 17, 2025 (Completed)</span>
                  </div>
                  <div className="flex items-start text-gray-700 space-x-2">
                    <span className="mt-1">📍</span>
                    <span>506 Congress Ave, Austin, Texas, US, 78701</span>
                  </div>
                  
                  <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-md mt-6">
                    <p className="font-medium text-blue-700">
                      SparkStorm AI CEO Noopur Gupta spoke on the "Emerging Technology" panel.
                    </p>
                    <p className="text-blue-600 mt-2">
                      She shared insights on an entrepreneur's early struggles in website development and AI innovation.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-12">
              <h2 className="text-2xl font-bold mb-6">Other Past Events</h2>
              <div className="grid md:grid-cols-3 gap-6">
                <Card>
                  <CardContent className="pt-6">
                    <h3 className="text-xl font-bold">Austin Women in Technology Conference</h3>
                    <p className="text-sm text-gray-500 mt-1">April 5, 2025</p>
                    <p className="mt-3">Panel discussion on breaking barriers for women in AI and tech entrepreneurship at the WTC Texas Conference.</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="pt-6">
                    <h3 className="text-xl font-bold">GenAI Collective Summit</h3>
                    <p className="text-sm text-gray-500 mt-1">March 12, 2025</p>
                    <p className="mt-3">Noopur presented on AI applications in medical data management and patient care optimization.</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="pt-6">
                    <h3 className="text-xl font-bold">The Austin Forum on Technology & Society</h3>
                    <p className="text-sm text-gray-500 mt-1">February 8, 2025</p>
                    <p className="mt-3">Featured speaker on the ethical implications of AI in business and society.</p>
                  </CardContent>
                </Card>
              </div>
              
              <div className="grid md:grid-cols-3 gap-6 mt-6">
                <Card>
                  <CardContent className="pt-6">
                    <h3 className="text-xl font-bold">AI Camp at Capital Factory</h3>
                    <p className="text-sm text-gray-500 mt-1">January 15, 2025</p>
                    <p className="mt-3">Workshop on leveraging AI to scale early-stage startups with limited resources.</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="pt-6">
                    <h3 className="text-xl font-bold">InnoTech Women's Summit</h3>
                    <p className="text-sm text-gray-500 mt-1">December 8, 2024</p>
                    <p className="mt-3">Keynote on "AI for Entrepreneurs: Navigating the Future of Business" at the annual conference.</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="pt-6">
                    <h3 className="text-xl font-bold">Antler's ATX Female Founder Galentine's Day</h3>
                    <p className="text-sm text-gray-500 mt-1">November 22, 2024</p>
                    <p className="mt-3">Fireside chat on AI innovation and entrepreneurship at Austin Public Library's Faulk Central Library.</p>
                  </CardContent>
                </Card>
              </div>
              
              <div className="grid md:grid-cols-3 gap-6 mt-6">
                <Card>
                  <CardContent className="pt-6">
                    <h3 className="text-xl font-bold">TEXAS EMBASSY at SXSW</h3>
                    <p className="text-sm text-gray-500 mt-1">October 5, 2024</p>
                    <p className="mt-3">Panel on "Health & Human Performance" discussing AI applications in healthcare and wellness technology.</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="pt-6">
                    <h3 className="text-xl font-bold">Better Business Bureau AI Conference</h3>
                    <p className="text-sm text-gray-500 mt-1">September 18, 2024</p>
                    <p className="mt-3">"Artificial Intelligence in Real Life" - practical applications for businesses of all sizes.</p>
                  </CardContent>
                </Card>
              </div>
            </div>
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
