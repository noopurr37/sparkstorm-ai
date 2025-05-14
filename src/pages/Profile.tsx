import React, { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { useNavigate, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { supabase } from "@/integrations/supabase/client";
import Header from "@/components/Header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
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
      try {
        setLoading(true);
        const { data: { session } } = await supabase.auth.getSession();
        
        if (!session) {
          toast({
            title: "Authentication required",
            description: "Please sign in to view your profile",
            variant: "destructive",
          });
          navigate("/auth", { 
            state: { 
              redirectTo: "/profile",
              message: "Please sign in to access your profile settings"
            }
          });
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
      } catch (error) {
        console.error("Error checking session:", error);
        toast({
          title: "Error",
          description: "Failed to load your profile information",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    checkSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (event === 'SIGNED_OUT') {
          navigate("/auth");
        } else if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') {
          setUser(session?.user || null);
          
          if (session?.user) {
            setFormData({
              fullName: session.user.user_metadata?.full_name || "",
              email: session.user.email || "",
              company: session.user.user_metadata?.company || "",
              bio: session.user.user_metadata?.bio || "",
            });
            
            if (session.user.user_metadata?.avatar_url) {
              setAvatarUrl(session.user.user_metadata.avatar_url);
            }
          }
        }
      }
    );

    return () => subscription.unsubscribe();
  }, [navigate, toast]);

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const updateProfile = async (e) => {
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
      console.error("Update failed:", error);
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

  const handleAvatarChange = async (e) => {
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
      
      // Convert the file to a data URL
      const reader = new FileReader();
      
      reader.onload = async (event) => {
        try {
          // Get the data URL
          const dataUrl = event.target.result as string;
          
          // Update user metadata with avatar URL
          const { error } = await supabase.auth.updateUser({
            data: { avatar_url: dataUrl }
          });
          
          if (error) throw error;
          
          // Update the local state with the new avatar URL
          setAvatarUrl(dataUrl);
          
          toast({
            title: "Profile picture updated",
            description: "Your profile picture has been updated successfully.",
          });
        } catch (error) {
          console.error("Error updating avatar:", error);
          toast({
            title: "Update failed",
            description: "Failed to update your profile picture. Please try again.",
            variant: "destructive",
          });
        } finally {
          setUploadingAvatar(false);
        }
      };
      
      reader.onerror = () => {
        setUploadingAvatar(false);
        toast({
          title: "Upload failed",
          description: "Failed to read the image file. Please try another image.",
          variant: "destructive",
        });
      };
      
      reader.readAsDataURL(file);
      
    } catch (error) {
      console.error("Avatar upload error:", error);
      toast({
        title: "Upload failed",
        description: "There was a problem uploading your profile picture",
        variant: "destructive",
      });
      setUploadingAvatar(false);
    }
  };

  const handleSignOut = async () => {
    try {
      setSaving(true);
      const { error } = await supabase.auth.signOut();
      
      if (error) throw error;
      
      navigate("/");
      toast({
        title: "Signed out",
        description: "You have been signed out successfully.",
      });
    } catch (error) {
      console.error("Sign out error:", error);
      toast({
        title: "Sign out failed",
        description: "There was a problem signing out. Please try again.",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
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
            <TabsList className="mb-6 grid w-full grid-cols-2">
              <TabsTrigger value="profile">
                <User className="mr-2 h-4 w-4" />
                Profile
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
                <CardFooter>
                  <div className="w-full">
                    <Button 
                      variant="destructive" 
                      onClick={handleSignOut}
                      className="flex items-center gap-2"
                      disabled={saving}
                    >
                      <LogOut className="h-4 w-4" />
                      {saving ? "Signing out..." : "Sign Out"}
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="notifications">
              <Card>
                <CardHeader>
                  <CardTitle>MediWallet Updates</CardTitle>
                  <CardDescription>
                    Get notified when the MediWallet app launches
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
