
import { useEffect, useState } from "react";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import MediFeature from "@/components/MediWallet/MediFeature";
import { Helmet } from "react-helmet-async";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import {
  Activity,
  CreditCard,
  FileText,
  Upload,
  HelpCircle,
  Calendar,
  Heart,
  Stethoscope,
  RefreshCw,
  UserPlus,
  ArrowUpRight,
  Loader2,
  Wallet,
} from "lucide-react";

const MediWallet = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const checkUser = async () => {
      setLoading(true);
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        setUser(session.user);
      }
      setLoading(false);
    };

    checkUser();
  }, []);

  const handleDemoBooking = () => {
    navigate("/book-demo");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <Helmet>
        <title>MediWallet | SparkStorm AI</title>
        <meta name="description" content="MediWallet - Simplifying healthcare finances and data management" />
      </Helmet>

      <Header />

      <main className="container mx-auto px-4 py-12">
        <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">MediWallet</h1>
            <p className="text-gray-600">Your complete healthcare finance management solution</p>
          </div>
          <div className="mt-4 md:mt-0">
            <Button onClick={handleDemoBooking} size="lg" className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700">
              Book a Demo
              <ArrowUpRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Product Hunt Badge - Dark Theme */}
        <div className="flex justify-end mb-6">
          <a 
            href="https://www.producthunt.com/posts/mediwallet?embed=true&utm_source=badge-featured&utm_medium=badge&utm_source=badge-mediwallet" 
            target="_blank" 
            rel="noopener noreferrer"
          >
            <img 
              src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=965559&theme=dark&t=1747261562110" 
              alt="MediWallet - Health Data at Fingertips | Product Hunt" 
              style={{ width: '250px', height: '54px' }} 
              width="250" 
              height="54" 
            />
          </a>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : user ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="col-span-full bg-gradient-to-r from-blue-50 to-indigo-50">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Wallet className="mr-2 h-5 w-5 text-blue-600" />
                  Welcome to Your MediWallet
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p>Your healthcare finance hub is getting ready! We're building tools to help you manage medical bills, insurance claims, and healthcare savings in one place.</p>
                <div className="mt-4 flex items-center text-sm text-blue-600">
                  <RefreshCw className="mr-1 h-4 w-4" />
                  <span>Early access coming soon</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <FileText className="mr-2 h-5 w-5 text-blue-600" />
                  Medical Bills
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">Upload, track, and organize all your medical bills in one secure location</p>
                <Button variant="outline" className="w-full" disabled>
                  <Upload className="mr-2 h-4 w-4" />
                  Upload Bills
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <CreditCard className="mr-2 h-5 w-5 text-blue-600" />
                  Insurance Claims
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">Monitor the status of your insurance claims and reimbursements</p>
                <Button variant="outline" className="w-full" disabled>
                  <Activity className="mr-2 h-4 w-4" />
                  View Claims
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Calendar className="mr-2 h-5 w-5 text-blue-600" />
                  Appointments
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">Schedule and manage your healthcare appointments</p>
                <Button variant="outline" className="w-full" disabled>
                  <Calendar className="mr-2 h-4 w-4" />
                  Coming Soon
                </Button>
              </CardContent>
            </Card>
          </div>
        ) : (
          <>
            {/* Hero section for non-logged in users */}
            <section className="py-12">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                <div className="flex flex-col justify-center">
                  <h2 className="text-4xl font-bold mb-6">Simplify Your Healthcare Finances</h2>
                  <p className="text-lg text-gray-600 mb-8">
                    MediWallet helps you manage medical bills, insurance claims, and healthcare spending all in one secure platform.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Button 
                      onClick={() => navigate("/auth")} 
                      size="lg"
                      className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
                    >
                      Create Account
                      <UserPlus className="ml-2 h-4 w-4" />
                    </Button>
                    <Button 
                      variant="outline" 
                      size="lg" 
                      onClick={handleDemoBooking}
                    >
                      Request Demo
                    </Button>
                  </div>
                </div>
                <div className="flex items-center justify-center">
                  <img 
                    src="/lovable-uploads/7ba572ae-889a-4931-8912-e97b44970777.png"
                    alt="MediWallet Dashboard Preview" 
                    className="max-w-full h-auto rounded-lg shadow-lg"
                  />
                </div>
              </div>
            </section>

            {/* Features section */}
            <section className="py-16">
              <h3 className="text-2xl font-bold mb-10 text-center">Key Features</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <MediFeature 
                  icon={<FileText className="h-6 w-6 text-blue-600" />}
                  title="Medical Bill Organization"
                  description="Upload and organize all your medical bills in one secure location. Receive notifications for upcoming payments."
                />
                <MediFeature 
                  icon={<CreditCard className="h-6 w-6 text-blue-600" />}
                  title="Insurance Claim Tracking"
                  description="Monitor the status of your insurance claims and receive alerts when a claim is processed or requires attention."
                />
                <MediFeature 
                  icon={<Heart className="h-6 w-6 text-blue-600" />}
                  title="Health Savings Management"
                  description="Track your HSA/FSA spending and get insights into your healthcare expenses with detailed reports."
                />
                <MediFeature 
                  icon={<HelpCircle className="h-6 w-6 text-blue-600" />}
                  title="Bill Negotiation Assistance"
                  description="Get help negotiating your medical bills through our network of healthcare advocates."
                />
                <MediFeature 
                  icon={<Stethoscope className="h-6 w-6 text-blue-600" />}
                  title="Provider Network"
                  description="Find in-network doctors and facilities that accept your insurance to help avoid surprise bills."
                />
                <MediFeature 
                  icon={<Upload className="h-6 w-6 text-blue-600" />}
                  title="Document Storage"
                  description="Securely store and access your medical records, insurance cards, and healthcare documents."
                />
              </div>
            </section>
          </>
        )}
      </main>
    </div>
  );
};

export default MediWallet;
