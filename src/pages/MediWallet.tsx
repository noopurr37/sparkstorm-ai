
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Helmet } from "react-helmet-async";
import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import MediFeature from "@/components/MediWallet/MediFeature";
import Header from "@/components/Header";
import { Loader2, ArrowRight } from "lucide-react";

const MediWallet = () => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is logged in
    const checkSession = async () => {
      setLoading(true);
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        toast({
          title: "Authentication required",
          description: "Please sign in to access MediWallet",
          variant: "destructive",
        });
        navigate("/auth");
        return;
      }
      
      setUser(session?.user || null);
      setLoading(false);
    };

    checkSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (event === 'SIGNED_OUT') {
          navigate("/auth");
        }
        setUser(session?.user || null);
      }
    );

    return () => subscription.unsubscribe();
  }, [navigate, toast]);

  const handleBookDemo = () => {
    navigate("/book-demo");
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <Helmet>
        <title>MediWallet | SparkStorm AI</title>
        <meta name="description" content="Secure medical data at your fingertips" />
      </Helmet>

      <Header />

      <main className="container mx-auto px-4 py-12">
        <div className="mb-12 text-center">
          <h1 className="mb-4 text-4xl font-bold md:text-5xl">
            MediWallet: Empowering Borderless Personal Health Management
          </h1>
          <p className="mx-auto max-w-3xl text-lg text-gray-600">
            A secure, AI-powered personal health vault that transforms fragmented 
            medical records into actionable intelligence.
          </p>
        </div>

        {/* Hero Section with Graphic */}
        <div className="mb-16 flex flex-col items-center rounded-2xl bg-gradient-primary p-8 text-white shadow-lg md:flex-row">
          <div className="md:w-1/2">
            <h2 className="mb-4 text-3xl font-bold">Secure Medical Data at Your Fingertips</h2>
            <p className="mb-6 text-lg">
              Our platform aggregates, organizes, and interprets medical data across borders, 
              giving travelers, caregivers, and clinicians instant clarity over complete medical histories.
            </p>
            <Button 
              onClick={handleBookDemo} 
              size="lg" 
              className="bg-white text-primary hover:bg-gray-100"
            >
              Book a Demo <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
          <div className="mt-8 flex justify-center md:mt-0 md:w-1/2">
            <img 
              src="/lovable-uploads/dfcc5169-02a0-4fa3-bff5-42f9c9ff85f6.png" 
              alt="Medical data visualization" 
              className="max-h-64 w-auto rounded-lg shadow-xl" 
            />
          </div>
        </div>

        {/* Features Section */}
        <section className="mb-16">
          <h2 className="mb-6 text-center text-3xl font-bold">App Features</h2>
          
          <div className="grid gap-8 md:grid-cols-3">
            <MediFeature
              title="Document Upload"
              description="Upload documents in PDF, JPG, and Voice formats to our Vector Table storage system. Share documents via email and connect with your device's photo library."
              icon="📄"
              iconBg="bg-blue-100"
            />
            <MediFeature
              title="AI Chat Interface"
              description="Interact with our chatbot using natural language queries about your uploaded medical documents for instant insights and clarity."
              icon="💬"
              iconBg="bg-green-100"
            />
            <MediFeature
              title="Comprehensive Dashboard"
              description="Manage documents and chat interactions through a centralized interface with analytics and data visualization tools."
              icon="📊"
              iconBg="bg-purple-100"
            />
          </div>
        </section>

        {/* New Mobile Features Section */}
        <section className="mb-16">
          <h2 className="mb-6 text-center text-3xl font-bold">Mobile Features</h2>
          
          <div className="grid gap-8 md:grid-cols-4">
            <MediFeature
              title="Mobile App"
              description="User-friendly mobile application accessible for everyone, ensuring healthcare data is always at your fingertips."
              icon="📱"
              iconBg="bg-blue-100"
            />
            <MediFeature
              title="Local LLM Integration"
              description="On-device AI processing for remote areas with limited connectivity, ensuring healthcare access anywhere."
              icon="🧠"
              iconBg="bg-purple-100"
            />
            <MediFeature
              title="Family Tree & Provider Access"
              description="Share medical records securely with family members and healthcare providers via QR codes."
              icon="👪"
              iconBg="bg-green-100"
            />
            <MediFeature
              title="Multi-Language Support"
              description="Voice and text support in multiple languages, breaking down communication barriers in healthcare."
              icon="🌐"
              iconBg="bg-orange-100"
            />
          </div>
        </section>

        {/* Technology Section */}
        <section className="mb-16 rounded-xl bg-gray-50 p-8">
          <h2 className="mb-6 text-center text-3xl font-bold">Powered by Advanced Technology</h2>
          
          <div className="grid gap-8 md:grid-cols-2">
            <Card className="overflow-hidden">
              <CardContent className="p-6">
                <h3 className="mb-3 text-xl font-semibold">Cutting-Edge AI Integration</h3>
                <p className="text-gray-600">
                  Leverages OCR, vector databases, Retrieval-Augmented Generation (RAG), 
                  and large-language-model (LLM) insights to transform fragmented health 
                  records into actionable intelligence in seconds.
                </p>
              </CardContent>
            </Card>
            
            <Card className="overflow-hidden">
              <CardContent className="p-6">
                <h3 className="mb-3 text-xl font-semibold">Secure Data Processing</h3>
                <ul className="ml-5 list-disc space-y-2 text-gray-600">
                  <li>Ingests PDFs, images, HL7/FHIR feeds, and wearable data via encrypted upload or API</li>
                  <li>Digitizes & structures using Google Vision OCR → JSON → columnar & vector indexes</li>
                  <li>Indexes semantically in ChromaDB for low-latency retrieval</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Challenges Section */}
        <section className="mb-16">
          <h2 className="mb-6 text-center text-3xl font-bold">Solving Critical Healthcare Challenges</h2>
          
          <div className="grid gap-8 md:grid-cols-3">
            <Card className="overflow-hidden bg-red-50">
              <CardContent className="p-6">
                <h3 className="mb-3 text-xl font-semibold">Data Fragmentation Across Borders</h3>
                <p>
                  Medical records are siloed in incompatible systems. Migrants, frequent flyers, 
                  and telehealth patients struggle to provide complete histories, leading to repeat tests, 
                  misdiagnoses, and higher costs.
                </p>
              </CardContent>
            </Card>
            
            <Card className="overflow-hidden bg-orange-50">
              <CardContent className="p-6">
                <h3 className="mb-3 text-xl font-semibold">Patient Disempowerment</h3>
                <p>
                  60% of U.S. adults have to request records via fax or portal exports; 
                  over 70% do not fully understand their lab results without explanation (HIMSS 2024).
                </p>
              </CardContent>
            </Card>
            
            <Card className="overflow-hidden bg-yellow-50">
              <CardContent className="p-6">
                <h3 className="mb-3 text-xl font-semibold">Equity & Continuity Gaps</h3>
                <p>
                  Low-income travelers and underserved communities face disproportionate risks 
                  when data is unavailable at the point of care.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Healthcare Impact Section */}
        <section className="mb-16 rounded-xl bg-blue-50 p-8">
          <h2 className="mb-6 text-center text-3xl font-bold">Impact on Healthcare</h2>
          
          <div className="grid gap-8 md:grid-cols-3 lg:grid-cols-5">
            <Card>
              <CardContent className="flex flex-col h-full items-center justify-center p-6 text-center">
                <h3 className="text-xl font-semibold mb-2">Global Access</h3>
                <p>Centralizing health data for anytime, anywhere access.</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="flex flex-col h-full items-center justify-center p-6 text-center">
                <h3 className="text-xl font-semibold mb-2">Lifetime Records</h3>
                <p>Decades of health data, securely stored and always available.</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="flex flex-col h-full items-center justify-center p-6 text-center">
                <h3 className="text-xl font-semibold mb-2">Patient Empowerment</h3>
                <p>Instant insights and actions from your phone.</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="flex flex-col h-full items-center justify-center p-6 text-center">
                <h3 className="text-xl font-semibold mb-2">Seamless Care</h3>
                <p>Portable records for consistent healthcare across providers.</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="flex flex-col h-full items-center justify-center p-6 text-center">
                <h3 className="text-xl font-semibold mb-2">Privacy First</h3>
                <p>Anonymized data with UUID security and patient-controlled access.</p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Key Features Section */}
        <section className="mb-16">
          <h2 className="mb-6 text-center text-3xl font-bold">Smart Features</h2>
          
          <div className="grid gap-8 md:grid-cols-2">
            <div className="flex gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M21 11.5C21 16.75 16.75 21 11.5 21C6.25 21 2 16.75 2 11.5C2 6.25 6.25 2 11.5 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M22 22L20 20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M15 8H8V15H15V8Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div>
                <h3 className="mb-2 text-lg font-semibold">Conversational Health Insights</h3>
                <p className="text-gray-600">
                  Users can ask "Is it normal that my CRP is 15 mg/L?" and receive a 
                  plain-language answer plus referenced sources.
                </p>
              </div>
            </div>
            
            <div className="flex gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-100 text-red-600">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 9V13L15 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M5.5 17H3C2.46957 17 1.96086 16.7893 1.58579 16.4142C1.21071 16.0391 1 15.5304 1 15V9C1 8.46957 1.21071 7.96086 1.58579 7.58579C1.96086 7.21071 2.46957 7 3 7H5.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M18.5 17H21C21.5304 17 22.0391 16.7893 22.4142 16.4142C22.7893 16.0391 23 15.5304 23 15V9C23 8.46957 22.7893 7.96086 22.4142 7.58579C22.0391 7.21071 21.5304 7 21 7H18.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div>
                <h3 className="mb-2 text-lg font-semibold">Smart Alerts</h3>
                <p className="text-gray-600">
                  Cross-checks new prescriptions against allergies and current meds; 
                  flags conflicts in real-time.
                </p>
              </div>
            </div>
            
            <div className="flex gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-100 text-green-600">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M14 2V8H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M16 13H8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M16 17H8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M10 9H8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div>
                <h3 className="mb-2 text-lg font-semibold">Travel-Ready Passport</h3>
                <p className="text-gray-600">
                  Offline QR code containing critical summaries for emergency teams 
                  when connectivity is limited.
                </p>
              </div>
            </div>
            
            <div className="flex gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-purple-100 text-purple-600">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M17 21V19C17 17.9391 16.5786 16.9217 15.8284 16.1716C15.0783 15.4214 14.0609 15 13 15H5C3.93913 15 2.92172 15.4214 2.17157 16.1716C1.42143 16.9217 1 17.9391 1 19V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M9 11C11.2091 11 13 9.20914 13 7C13 4.79086 11.2091 3 9 3C6.79086 3 5 4.79086 5 7C5 9.20914 6.79086 11 9 11Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M23 21V19C22.9993 18.1137 22.7044 17.2528 22.1614 16.5523C21.6184 15.8519 20.8581 15.3516 20 15.13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M16 3.13C16.8604 3.35031 17.623 3.85071 18.1676 4.55232C18.7122 5.25392 19.0078 6.11683 19.0078 7.005C19.0078 7.89318 18.7122 8.75608 18.1676 9.45769C17.623 10.1593 16.8604 10.6597 16 10.88" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div>
                <h3 className="mb-2 text-lg font-semibold">Family Mode</h3>
                <p className="text-gray-600">
                  Caregivers manage multiple profiles with granular consent controls.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Memorial Section */}
        <section className="mb-16 p-8 bg-gray-100 rounded-xl border border-gray-200 text-center">
          <div className="max-w-3xl mx-auto">
            <h3 className="text-2xl font-bold italic mb-6">
              "In loving memory of My Father whose heart was my home"
            </h3>
            <p className="text-lg text-gray-700">
              This app is dedicated to my father, whom I lost this year. 
              His passing was deeply impacted by the lack of access to comprehensive 
              healthcare data and the challenge of finding a treatment that his body could tolerate.
            </p>
          </div>
        </section>

        {/* Call to Action - Moved to bottom so it doesn't block UI elements */}
        <section className="rounded-xl bg-gradient-primary p-8 text-center text-white">
          <h2 className="mb-4 text-3xl font-bold">Transform Your Medical Data Experience</h2>
          <p className="mb-6 text-lg">
            Ready to get started with MediWallet? Book a demo today to see how it can work for you.
          </p>
          <Button 
            onClick={handleBookDemo} 
            size="lg" 
            variant="outline"
            className="bg-white text-primary hover:bg-gray-100"
          >
            Book a Demo <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </section>
      </main>
    </div>
  );
};

export default MediWallet;
