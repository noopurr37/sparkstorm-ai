
import React, { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { supabase } from "@/integrations/supabase/client";
import Header from "@/components/Header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Label } from "@/components/ui/label";
import { Loader2, User, Lock, LogOut, Camera, Shield } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import MediWalletSignup from "@/components/MediWalletSignup";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploadingAvatar, setUploadingAvatar] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    company: "",
    bio: "",
  });
  const [avatarUrl, setAvatarUrl] = useState("");
  const fileInputRef = useRef(null);
  
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
          description: "Please sign in to view your profile",
          variant: "destructive",
        });
        navigate("/auth");
        return;
      }
      
      const user = session?.user || null;
      setUser(user);
      
      if (user) {
        setFormData({
          fullName: user.user_metadata?.full_name || "",
          email: user.email || "",
          company: user.user_metadata?.company || "",
          bio: user.user_metadata?.bio || "",
        });

        // Try to get avatar URL from metadata
        if (user.user_metadata?.avatar_url) {
          setAvatarUrl(user.user_metadata.avatar_url);
        }
      }
      
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

  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const updateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    
    try {
      const { error } = await supabase.auth.updateUser({
        data: { 
          full_name: formData.fullName,
          company: formData.company,
          bio: formData.bio
        }
      });
      
      if (error) throw error;
      
      toast({
        title: "Profile updated",
        description: "Your profile information has been updated successfully.",
      });
    } catch (error) {
      toast({
        title: "Update failed",
        description: error.message || "There was a problem updating your profile",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  const handleAvatarClick = () => {
    // Trigger file input click
    fileInputRef.current.click();
  };

  const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) {
      return;
    }

    const file = e.target.files[0];
    const fileSize = file.size / 1024 / 1024; // Convert to MB
    
    if (fileSize > 5) {
      toast({
        title: "File too large",
        description: "Please select an image under 5MB",
        variant: "destructive",
      });
      return;
    }

    try {
      setUploadingAvatar(true);
      
      // In a real app, you would upload to storage (e.g., Supabase Storage)
      // For now, we'll use a data URL as a placeholder
      const reader = new FileReader();
      reader.onload = async (event) => {
        const dataUrl = event.target.result as string;
        setAvatarUrl(dataUrl);
        
        // Update user metadata with avatar URL
        const { error } = await supabase.auth.updateUser({
          data: { avatar_url: dataUrl }
        });
        
        if (error) throw error;
        
        toast({
          title: "Profile picture updated",
          description: "Your profile picture has been updated successfully.",
        });
        
        setUploadingAvatar(false);
      };
      reader.readAsDataURL(file);
    } catch (error) {
      toast({
        title: "Upload failed",
        description: error.message || "There was a problem uploading your profile picture",
        variant: "destructive",
      });
      setUploadingAvatar(false);
    }
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate("/");
    toast({
      title: "Signed out",
      description: "You have been signed out successfully.",
    });
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  const userInitials = formData.fullName
    ? formData.fullName
        .split(' ')
        .map(name => name[0])
        .join('')
        .toUpperCase()
    : '?';

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <Helmet>
        <title>Your Profile | SparkStorm AI</title>
      </Helmet>

      <Header />

      <main className="container mx-auto px-4 py-12">
        <div className="mb-8 flex flex-col items-center text-center">
          <div className="relative mb-4">
            <Avatar className="h-24 w-24 cursor-pointer hover:opacity-90 transition-opacity" onClick={handleAvatarClick}>
              <AvatarImage src={avatarUrl} alt={formData.fullName} />
              <AvatarFallback className="text-2xl">{userInitials}</AvatarFallback>
            </Avatar>
            <div 
              className="absolute bottom-0 right-0 bg-primary rounded-full p-1.5 cursor-pointer hover:bg-primary/90 transition-colors"
              onClick={handleAvatarClick}
            >
              <Camera className="h-4 w-4 text-white" />
            </div>
            <input 
              type="file"
              ref={fileInputRef}
              className="hidden"
              accept="image/*"
              onChange={handleAvatarChange}
            />
          </div>
          <h1 className="mb-2 text-3xl font-bold">{formData.fullName}</h1>
          <p className="text-gray-500">{formData.email}</p>
          {uploadingAvatar && (
            <div className="mt-2 flex items-center">
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              <span className="text-sm">Uploading image...</span>
            </div>
          )}
        </div>

        <div className="mx-auto max-w-4xl">
          <Tabs defaultValue="profile" className="w-full">
            <TabsList className="mb-6 grid w-full grid-cols-3">
              <TabsTrigger value="profile">
                <User className="mr-2 h-4 w-4" />
                Profile
              </TabsTrigger>
              <TabsTrigger value="security">
                <Lock className="mr-2 h-4 w-4" />
                Security
              </TabsTrigger>
              <TabsTrigger value="notifications">
                <Shield className="mr-2 h-4 w-4" />
                MediWallet Updates
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="profile">
              <Card>
                <CardHeader>
                  <CardTitle>Profile Information</CardTitle>
                  <CardDescription>
                    Update your SparkStorm AI website profile
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={updateProfile} className="space-y-6">
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="fullName">Full Name</Label>
                        <Input
                          id="fullName"
                          name="fullName"
                          value={formData.fullName}
                          onChange={handleProfileChange}
                          placeholder="Your full name"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          disabled
                          className="bg-gray-100"
                        />
                        <p className="text-sm text-gray-500">
                          Email address cannot be changed
                        </p>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="company">Company</Label>
                        <Input
                          id="company"
                          name="company"
                          value={formData.company}
                          onChange={handleProfileChange}
                          placeholder="Your company name"
                        />
                      </div>

                      <div className="space-y-2 md:col-span-2">
                        <Label htmlFor="bio">About Me</Label>
                        <Textarea
                          id="bio"
                          name="bio"
                          value={formData.bio}
                          onChange={handleProfileChange}
                          placeholder="Tell us a bit about yourself"
                          rows={4}
                        />
                      </div>
                    </div>

                    <Button type="submit" disabled={saving}>
                      {saving ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Saving...
                        </>
                      ) : (
                        "Save Changes"
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="security">
              <Card>
                <CardHeader>
                  <CardTitle>Security Settings</CardTitle>
                  <CardDescription>
                    Manage your account security
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <p>
                      Your account is secured with email and password authentication. For security reasons, you cannot change your password directly from this interface.
                    </p>
                    <p>
                      If you need to reset your password, please use the "Forgot Password" option on the login page.
                    </p>
                  </div>

                  <div className="mt-6">
                    <Button 
                      variant="destructive" 
                      onClick={handleSignOut}
                      className="flex items-center gap-2"
                    >
                      <LogOut className="h-4 w-4" />
                      Sign Out
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="notifications">
              <Card>
                <CardHeader>
                  <CardTitle>MediWallet Updates</CardTitle>
                  <CardDescription>
                    Get notified when the MediWallet mobile app launches
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <MediWalletSignup />
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
};

export default Profile;
