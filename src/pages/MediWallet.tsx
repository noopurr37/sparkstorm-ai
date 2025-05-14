
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import { Loader2, Calendar, FileText, BellRing, DollarSign, ChevronRight } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import MediFeature from "@/components/MediWallet/MediFeature";
import MediWalletSignup from "@/components/MediWalletSignup";
import { useNavigate } from "react-router-dom";

const MediWallet = () => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState("dashboard");
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    const checkUser = async () => {
      setLoading(true);
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user || null);
      setLoading(false);
    };

    checkUser();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user || null);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>MediWallet | SparkStorm AI</title>
      </Helmet>

      <Header />

      <main className="container mx-auto px-4 py-12">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="mb-4 text-4xl font-bold tracking-tight sm:text-5xl">
            MediWallet
          </h1>
          <p className="mb-8 text-lg text-gray-600">
            Your comprehensive healthcare financial management solution
          </p>
          
          {/* Dark Product Hunt Badge */}
          <div className="mb-8 flex justify-center">
            <a 
              href="https://www.producthunt.com/posts/mediwallet?embed=true&utm_source=badge-featured&utm_medium=badge&utm_source=badge-mediwallet" 
              target="_blank"
              className="rounded-md border border-gray-300 shadow-sm transition-all hover:shadow-md"
            >
              <img 
                src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=965559&theme=dark&t=1747261562110" 
                alt="MediWallet - Health Data at Fingertips | Product Hunt" 
                style={{ width: 250, height: 54 }} 
                width="250" 
                height="54" 
              />
            </a>
          </div>
        </div>

        {user ? (
          <div className="mx-auto max-w-6xl">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="mb-8 grid w-full grid-cols-3 lg:grid-cols-5">
                <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
                <TabsTrigger value="appointments">Appointments</TabsTrigger>
                <TabsTrigger value="documents">Documents</TabsTrigger>
                <TabsTrigger value="bills">Bills</TabsTrigger>
                <TabsTrigger value="notifications">Notifications</TabsTrigger>
              </TabsList>

              <TabsContent value="dashboard">
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  <MediFeature
                    icon={<Calendar className="h-10 w-10 text-blue-600" />}
                    title="Upcoming Appointments"
                    description="You have 2 upcoming appointments scheduled for this month."
                    action={() => setActiveTab("appointments")}
                    actionText="View Calendar"
                  />
                  <MediFeature
                    icon={<FileText className="h-10 w-10 text-green-600" />}
                    title="Medical Documents"
                    description="3 new medical records have been uploaded to your account."
                    action={() => setActiveTab("documents")}
                    actionText="View Documents"
                  />
                  <MediFeature
                    icon={<DollarSign className="h-10 w-10 text-yellow-600" />}
                    title="Bills & Insurance"
                    description="You have 1 pending payment due on June 15, 2023."
                    action={() => setActiveTab("bills")}
                    actionText="Manage Payments"
                  />
                </div>

                <Card className="mt-8">
                  <CardHeader>
                    <CardTitle className="text-xl font-bold">Your Health Overview</CardTitle>
                    <CardDescription>
                      A summary of your recent healthcare activity and upcoming events
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-col space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Annual Physical</p>
                          <p className="text-sm text-gray-500">Dr. Sarah Johnson</p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">June 24, 2023</p>
                          <p className="text-sm text-gray-500">9:30 AM</p>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Lab Results</p>
                          <p className="text-sm text-gray-500">Blood Work Analysis</p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">Processing</p>
                          <p className="text-sm text-gray-500">Est. June 15, 2023</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button variant="outline">Export Data</Button>
                    <Button>Schedule New Appointment</Button>
                  </CardFooter>
                </Card>

                <Card className="mt-6">
                  <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                      <CardTitle className="text-xl font-bold">MediWallet Benefits</CardTitle>
                      <CardDescription>
                        Enhance your healthcare experience with these features
                      </CardDescription>
                    </div>
                    <BellRing className="h-6 w-6 text-primary" />
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-4">
                      <li className="flex items-center">
                        <ChevronRight className="mr-2 h-4 w-4 text-primary" />
                        <span>Track all your medical expenses in one place</span>
                      </li>
                      <li className="flex items-center">
                        <ChevronRight className="mr-2 h-4 w-4 text-primary" />
                        <span>Secure storage for medical records and prescriptions</span>
                      </li>
                      <li className="flex items-center">
                        <ChevronRight className="mr-2 h-4 w-4 text-primary" />
                        <span>Insurance claim tracking and assistance</span>
                      </li>
                      <li className="flex items-center">
                        <ChevronRight className="mr-2 h-4 w-4 text-primary" />
                        <span>Appointment scheduling and reminders</span>
                      </li>
                    </ul>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full" onClick={() => navigate("/book-demo")}>
                      Learn More About Premium Features
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>

              <TabsContent value="appointments">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-xl font-bold">Your Appointments</CardTitle>
                    <CardDescription>View and manage your upcoming appointments</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-center text-gray-500">Coming soon! This feature is still in development.</p>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="documents">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-xl font-bold">Your Documents</CardTitle>
                    <CardDescription>Access and manage your medical documents</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-center text-gray-500">Coming soon! This feature is still in development.</p>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="bills">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-xl font-bold">Bills & Insurance</CardTitle>
                    <CardDescription>Track your bills and insurance claims</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-center text-gray-500">Coming soon! This feature is still in development.</p>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="notifications">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-xl font-bold">Notifications</CardTitle>
                    <CardDescription>Stay updated on your healthcare events</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-center text-gray-500">Coming soon! This feature is still in development.</p>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        ) : (
          <div className="mx-auto mt-16 max-w-lg text-center">
            <h2 className="mb-4 text-2xl font-bold">Join MediWallet</h2>
            <p className="mb-8 text-gray-600">
              Sign up to access all features of MediWallet including appointment tracking, document storage, and billing management.
            </p>
            <MediWalletSignup />
          </div>
        )}
      </main>
    </>
  );
};

export default MediWallet;
