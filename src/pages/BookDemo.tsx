
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { supabase } from "@/integrations/supabase/client";
import Header from "@/components/Header";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Loader2, ArrowLeft } from "lucide-react";
import { Label } from "@/components/ui/label";

const BookDemo = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [formLoading, setFormLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    phone: "",
    message: "",
    preferredDate: "",
  });
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is logged in, but don't require authentication
    const checkSession = async () => {
      setLoading(true);
      const { data: { session } } = await supabase.auth.getSession();
      const user = session?.user || null;
      setUser(user);
      
      if (user) {
        setFormData(prev => ({
          ...prev,
          name: user.user_metadata?.full_name || "",
          email: user.email || ""
        }));
      }
      
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormLoading(true);
    
    try {
      // In a real app, you'd send this data to your backend
      // For demo purposes, we'll just show a success message
      
      // Wait for 1.5 seconds to simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast({
        title: "Demo request submitted!",
        description: "Our team will contact you shortly to schedule your demo.",
      });
      
      // Redirect to MediWallet page
      navigate("/mediwallet");
    } catch (error) {
      toast({
        title: "Submission failed",
        description: "There was a problem submitting your demo request. Please try again.",
        variant: "destructive",
      });
    } finally {
      setFormLoading(false);
    }
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

        <div className="mx-auto max-w-4xl">
          <Card>
            <CardHeader>
              <CardTitle>Schedule Your Demo</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid gap-6 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Your full name"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Your email address"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="company">Company/Organization</Label>
                    <Input
                      id="company"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      placeholder="Your company or organization"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="Your phone number"
                    />
                  </div>

                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="preferredDate">Preferred Date & Time</Label>
                    <Input
                      id="preferredDate"
                      name="preferredDate"
                      type="datetime-local"
                      value={formData.preferredDate}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="message">Additional Information</Label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Tell us about your specific needs or questions"
                      rows={4}
                    />
                  </div>
                </div>

                <CardFooter className="flex justify-end px-0">
                  <Button type="submit" size="lg" disabled={formLoading}>
                    {formLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      "Schedule Demo"
                    )}
                  </Button>
                </CardFooter>
              </form>
            </CardContent>
          </Card>

          <div className="mt-8 text-center text-sm text-gray-500">
            <p>
              By scheduling a demo, you agree to our Terms of Service and Privacy Policy.
              Our team will contact you within 24 hours to confirm your appointment.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default BookDemo;
