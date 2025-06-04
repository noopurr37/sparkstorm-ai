import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { supabase } from "@/integrations/supabase/client";
import Header from "@/components/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Loader2, Moon, Bell, Shield, Globe } from "lucide-react";

import { useTheme } from "@/contexts/ThemeContext";

const UserPreferences = () => {
  const [loading, setLoading] = useState(true);
  const [preferences, setPreferences] = useState({
    emailNotifications: true,
    language: "English",
    twoFactorAuth: false,
  });
  const { toast } = useToast();
  const navigate = useNavigate();
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    // Check if user is logged in
    const checkSession = async () => {
      setLoading(true);
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        toast({
          title: "Authentication required",
          description: "Please sign in to view your preferences",
          variant: "destructive",
        });
        navigate("/auth");
        return;
      }
      
      // Try to fetch user preferences (in a real app, this would come from the database)
      // For now, we just use the default state
      
      setLoading(false);
    };

    checkSession();
  }, [navigate, toast]);

  const handleToggleChange = (prefName) => {
    setPreferences(prev => ({
      ...prev,
      [prefName]: !prev[prefName]
    }));
    
    // In a real implementation, this would save to the database
    toast({
      title: "Preference updated",
      description: `Your ${prefName} setting has been updated.`,
    });
  };

  const handleSavePreferences = () => {
    // In a real implementation, this would save all preferences to the database
    toast({
      title: "Preferences saved",
      description: "Your preferences have been updated successfully.",
    });
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
      <Helmet>
        <title>User Preferences | SparkStorm AI</title>
      </Helmet>

      <Header />

      <main className="container mx-auto px-4 py-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold dark:text-white">Customize Your Experience</h1>
          <p className="text-gray-500 dark:text-gray-400">Manage your website preferences and settings</p>
        </div>

        <div className="mx-auto max-w-4xl">
          <Tabs defaultValue="notifications" className="w-full">
            <TabsList className="mb-6 grid w-full grid-cols-3">
              <TabsTrigger value="notifications">
                <Bell className="mr-2 h-4 w-4" />
                Notifications
              </TabsTrigger>
              <TabsTrigger value="appearance">
                <Moon className="mr-2 h-4 w-4" />
                Appearance
              </TabsTrigger>
              <TabsTrigger value="privacy">
                <Shield className="mr-2 h-4 w-4" />
                Privacy
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="notifications">
              <Card>
                <CardHeader>
                  <CardTitle>Notification Preferences</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <Label htmlFor="email-notifications">Email Notifications</Label>
                      <p className="text-sm text-gray-500">Receive updates and alerts via email</p>
                    </div>
                    <Switch 
                      id="email-notifications" 
                      checked={preferences.emailNotifications} 
                      onCheckedChange={() => handleToggleChange('emailNotifications')} 
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <Label htmlFor="mediWallet-updates">MediWallet Updates</Label>
                      <p className="text-sm text-gray-500">Receive notifications about MediWallet launches and features</p>
                    </div>
                    <Switch 
                      id="mediWallet-updates" 
                      checked={true}
                      onCheckedChange={() => toast({
                        title: "MediWallet Updates",
                        description: "To manage MediWallet updates, please visit the MediWallet tab in your profile.",
                      })}
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="appearance">
              <Card>
                <CardHeader>
                  <CardTitle>Appearance Settings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <Label htmlFor="theme-mode">Theme</Label>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Choose your preferred theme</p>
                    </div>
                    <div className="w-32">
                      <select 
                        id="theme-mode"
                        className="w-full rounded border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white p-2"
                        value={theme}
                        onChange={(e) => setTheme(e.target.value as any)}
                      >
                        <option value="light">Light</option>
                        <option value="dark">Dark</option>
                        <option value="system">System</option>
                      </select>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <Label htmlFor="language">Language</Label>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Select your preferred language</p>
                    </div>
                    <div className="w-32">
                      <select 
                        id="language"
                        className="w-full rounded border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white p-2"
                        value={preferences.language}
                        onChange={(e) => setPreferences(prev => ({...prev, language: e.target.value}))}
                      >
                        <option value="English">English</option>
                        <option value="Spanish">Spanish</option>
                        <option value="French">French</option>
                      </select>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="privacy">
              <Card>
                <CardHeader>
                  <CardTitle>Privacy Settings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <Label htmlFor="two-factor">Two-Factor Authentication</Label>
                      <p className="text-sm text-gray-500">Add an extra layer of security to your account</p>
                    </div>
                    <Switch 
                      id="two-factor" 
                      checked={preferences.twoFactorAuth} 
                      onCheckedChange={() => handleToggleChange('twoFactorAuth')} 
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <Label htmlFor="data-sharing">Share Usage Data</Label>
                      <p className="text-sm text-gray-500">Help us improve by allowing anonymous usage statistics</p>
                    </div>
                    <Switch 
                      id="data-sharing" 
                      checked={true} 
                      onCheckedChange={() => toast({
                        title: "Data Sharing Updated",
                        description: "Your data sharing preferences have been updated.",
                      })} 
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
          
          <div className="mt-8 flex justify-end">
            <Button onClick={handleSavePreferences}>
              Save All Preferences
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default UserPreferences;
