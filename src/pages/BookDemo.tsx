
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { supabase } from "@/integrations/supabase/client";
import Header from "@/components/Header";
import { Loader2, ArrowLeft } from "lucide-react";
import CalendlyEmbed from "@/components/CalendlyEmbed";

const BookDemo = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is logged in, but don't require authentication
    const checkSession = async () => {
      setLoading(true);
      const { data: { session } } = await supabase.auth.getSession();
      const user = session?.user || null;
      setUser(user);
      setLoading(false);
    };

    checkSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
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
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <Helmet>
        <title>Book a Demo | MediWallet</title>
      </Helmet>

      <Header />

      <main className="container mx-auto px-4 py-12">
        <div className="flex items-center mb-4">
          <Button 
            variant="ghost" 
            onClick={() => navigate("/mediwallet")}
            className="flex items-center"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to MediWallet
          </Button>
        </div>

        <div className="mb-8 text-center">
          <h1 className="mb-2 text-3xl font-bold md:text-4xl">Book a Demo</h1>
          <p className="text-lg text-gray-600">
            See MediWallet in action with a personalized demo tailored to your needs
          </p>
        </div>

        <div className="mx-auto max-w-xl bg-white p-8 rounded-xl shadow-sm">
          <CalendlyEmbed />
        </div>
      </main>
    </div>
  );
};

export default BookDemo;
