
import React, { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { supabase } from "@/integrations/supabase/client";
import Header from "@/components/Header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Label } from "@/components/ui/label";
import { Loader2, User, Lock, LogOut, Camera, Shield, Settings, Image } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploadingAvatar, setUploadingAvatar] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    dateOfBirth: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
    bio: "",
    emergencyContact: "",
    emergencyPhone: "",
  });
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [preferenceData, setPreferenceData] = useState({
    emailNotifications: true,
    smsNotifications: false,
    darkMode: false,
    twoFactorAuth: false,
    language: "english",
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
          phoneNumber: user.user_metadata?.phone_number || "",
          dateOfBirth: user.user_metadata?.date_of_birth || "",
          address: user.user_metadata?.address || "",
          city: user.user_metadata?.city || "",
          state: user.user_metadata?.state || "",
          zipCode: user.user_metadata?.zip_code || "",
          country: user.user_metadata?.country || "",
          bio: user.user_metadata?.bio || "",
          emergencyContact: user.user_metadata?.emergency_contact || "",
          emergencyPhone: user.user_metadata?.emergency_phone || "",
        });

        // Try to get avatar URL from metadata
        if (user.user_metadata?.avatar_url) {
          setAvatarUrl(user.user_metadata.avatar_url);
        }
        
        // Set preferences (in a real app, these would also come from the database)
        setPreferenceData({
          emailNotifications: user.user_metadata?.email_notifications !== false,
          smsNotifications: user.user_metadata?.sms_notifications || false,
          darkMode: user.user_metadata?.dark_mode || false,
          twoFactorAuth: user.user_metadata?.two_factor_auth || false,
          language: user.user_metadata?.language || "english",
        });
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

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswordData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePreferenceChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    setPreferenceData(prev => ({
      ...prev,
      [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value
    }));
  };

  const updateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    
    try {
      const { error } = await supabase.auth.updateUser({
        data: { 
          full_name: formData.fullName,
          phone_number: formData.phoneNumber,
          date_of_birth: formData.dateOfBirth,
          address: formData.address,
          city: formData.city,
          state: formData.state,
          zip_code: formData.zipCode,
          country: formData.country,
          bio: formData.bio,
          emergency_contact: formData.emergencyContact,
          emergency_phone: formData.emergencyPhone
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

  const updatePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast({
        title: "Passwords don't match",
        description: "New password and confirmation must match",
        variant: "destructive",
      });
      return;
    }
    
    setSaving(true);
    
    try {
      const { error } = await supabase.auth.updateUser({ 
        password: passwordData.newPassword 
      });
      
      if (error) throw error;
      
      toast({
        title: "Password updated",
        description: "Your password has been changed successfully.",
      });
      
      // Reset form
      setPasswordData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch (error) {
      toast({
        title: "Update failed",
        description: error.message || "There was a problem updating your password",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  const updatePreferences = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    
    try {
      const { error } = await supabase.auth.updateUser({
        data: { 
          email_notifications: preferenceData.emailNotifications,
          sms_notifications: preferenceData.smsNotifications,
          dark_mode: preferenceData.darkMode,
          two_factor_auth: preferenceData.twoFactorAuth,
          language: preferenceData.language
        }
      });
      
      if (error) throw error;
      
      toast({
        title: "Preferences updated",
        description: "Your preferences have been updated successfully.",
      });
    } catch (error) {
      toast({
        title: "Update failed",
        description: error.message || "There was a problem updating your preferences",
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
        // In a real app with Supabase Storage, you would store the storage URL
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
        <title>Your Profile | MediWallet</title>
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
            <TabsList className="mb-6 grid w-full grid-cols-4">
              <TabsTrigger value="profile">
                <User className="mr-2 h-4 w-4" />
                Personal Info
              </TabsTrigger>
              <TabsTrigger value="security">
                <Lock className="mr-2 h-4 w-4" />
                Security
              </TabsTrigger>
              <TabsTrigger value="preferences">
                <Settings className="mr-2 h-4 w-4" />
                Preferences
              </TabsTrigger>
              <TabsTrigger value="privacy">
                <Shield className="mr-2 h-4 w-4" />
                Privacy
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="profile">
              <Card>
                <CardHeader>
                  <CardTitle>Personal Information</CardTitle>
                  <CardDescription>
                    Update your personal information
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
                        <Label htmlFor="phoneNumber">Phone Number</Label>
                        <Input
                          id="phoneNumber"
                          name="phoneNumber"
                          value={formData.phoneNumber}
                          onChange={handleProfileChange}
                          placeholder="Your phone number"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="dateOfBirth">Date of Birth</Label>
                        <Input
                          id="dateOfBirth"
                          name="dateOfBirth"
                          type="date"
                          value={formData.dateOfBirth}
                          onChange={handleProfileChange}
                        />
                      </div>

                      <div className="space-y-2 md:col-span-2">
                        <Label htmlFor="address">Address</Label>
                        <Input
                          id="address"
                          name="address"
                          value={formData.address}
                          onChange={handleProfileChange}
                          placeholder="Street address"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="city">City</Label>
                        <Input
                          id="city"
                          name="city"
                          value={formData.city}
                          onChange={handleProfileChange}
                          placeholder="City"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="state">State/Province</Label>
                        <Input
                          id="state"
                          name="state"
                          value={formData.state}
                          onChange={handleProfileChange}
                          placeholder="State or province"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="zipCode">ZIP/Postal Code</Label>
                        <Input
                          id="zipCode"
                          name="zipCode"
                          value={formData.zipCode}
                          onChange={handleProfileChange}
                          placeholder="ZIP or postal code"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="country">Country</Label>
                        <Input
                          id="country"
                          name="country"
                          value={formData.country}
                          onChange={handleProfileChange}
                          placeholder="Country"
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

                      <div className="space-y-2">
                        <Label htmlFor="emergencyContact">Emergency Contact</Label>
                        <Input
                          id="emergencyContact"
                          name="emergencyContact"
                          value={formData.emergencyContact}
                          onChange={handleProfileChange}
                          placeholder="Emergency contact name"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="emergencyPhone">Emergency Contact Phone</Label>
                        <Input
                          id="emergencyPhone"
                          name="emergencyPhone"
                          value={formData.emergencyPhone}
                          onChange={handleProfileChange}
                          placeholder="Emergency contact phone"
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
                    Update your password and security preferences
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={updatePassword} className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="currentPassword">Current Password</Label>
                      <Input
                        id="currentPassword"
                        name="currentPassword"
                        type="password"
                        value={passwordData.currentPassword}
                        onChange={handlePasswordChange}
                        placeholder="Your current password"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="newPassword">New Password</Label>
                      <Input
                        id="newPassword"
                        name="newPassword"
                        type="password"
                        value={passwordData.newPassword}
                        onChange={handlePasswordChange}
                        placeholder="Your new password"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword">Confirm New Password</Label>
                      <Input
                        id="confirmPassword"
                        name="confirmPassword"
                        type="password"
                        value={passwordData.confirmPassword}
                        onChange={handlePasswordChange}
                        placeholder="Confirm your new password"
                        required
                      />
                    </div>

                    <Button type="submit" disabled={saving}>
                      {saving ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Updating...
                        </>
                      ) : (
                        "Update Password"
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>

              <Card className="mt-6 border-red-200">
                <CardHeader>
                  <CardTitle className="text-red-500">Account Management</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="mb-4">
                    Sign out from your account or manage your account settings.
                  </p>
                  <Button 
                    variant="destructive" 
                    onClick={handleSignOut}
                    className="flex items-center gap-2"
                  >
                    <LogOut className="h-4 w-4" />
                    Sign Out
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="preferences">
              <Card>
                <CardHeader>
                  <CardTitle>User Preferences</CardTitle>
                  <CardDescription>
                    Customize your application experience
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={updatePreferences} className="space-y-6">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <Label className="text-base">Email Notifications</Label>
                          <p className="text-sm text-gray-500">Receive updates and alerts via email</p>
                        </div>
                        <input
                          type="checkbox"
                          name="emailNotifications"
                          checked={preferenceData.emailNotifications}
                          onChange={handlePreferenceChange}
                          className="h-6 w-6 rounded border-gray-300 text-primary focus:ring-primary"
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <Label className="text-base">SMS Notifications</Label>
                          <p className="text-sm text-gray-500">Receive updates and alerts via SMS</p>
                        </div>
                        <input
                          type="checkbox"
                          name="smsNotifications"
                          checked={preferenceData.smsNotifications}
                          onChange={handlePreferenceChange}
                          className="h-6 w-6 rounded border-gray-300 text-primary focus:ring-primary"
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <Label className="text-base">Dark Mode</Label>
                          <p className="text-sm text-gray-500">Use dark theme for the application</p>
                        </div>
                        <input
                          type="checkbox"
                          name="darkMode"
                          checked={preferenceData.darkMode}
                          onChange={handlePreferenceChange}
                          className="h-6 w-6 rounded border-gray-300 text-primary focus:ring-primary"
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <Label className="text-base">Two-Factor Authentication</Label>
                          <p className="text-sm text-gray-500">Add an extra layer of security to your account</p>
                        </div>
                        <input
                          type="checkbox"
                          name="twoFactorAuth"
                          checked={preferenceData.twoFactorAuth}
                          onChange={handlePreferenceChange}
                          className="h-6 w-6 rounded border-gray-300 text-primary focus:ring-primary"
                        />
                      </div>

                      <div>
                        <Label htmlFor="language">Language</Label>
                        <select
                          id="language"
                          name="language"
                          value={preferenceData.language}
                          onChange={handlePreferenceChange}
                          className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 shadow-sm focus:border-primary focus:outline-none focus:ring-primary sm:text-sm"
                        >
                          <option value="english">English</option>
                          <option value="spanish">Spanish</option>
                          <option value="french">French</option>
                          <option value="german">German</option>
                          <option value="chinese">Chinese</option>
                          <option value="japanese">Japanese</option>
                        </select>
                      </div>
                    </div>

                    <Button type="submit" disabled={saving}>
                      {saving ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Saving...
                        </>
                      ) : (
                        "Save Preferences"
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="privacy">
              <Card>
                <CardHeader>
                  <CardTitle>Privacy Settings</CardTitle>
                  <CardDescription>
                    Manage your privacy and data settings
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Data Sharing</h3>
                      <p className="text-gray-500">
                        Control how your data is shared and used within the application
                      </p>
                      
                      <div className="rounded-lg border p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">Share usage data to improve services</p>
                            <p className="text-sm text-gray-500">
                              Help us improve by allowing anonymous usage statistics
                            </p>
                          </div>
                          <input
                            type="checkbox"
                            defaultChecked={true}
                            className="h-6 w-6 rounded border-gray-300 text-primary focus:ring-primary"
                          />
                        </div>
                      </div>
                      
                      <div className="rounded-lg border p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">Allow profile discovery</p>
                            <p className="text-sm text-gray-500">
                              Let other users find your profile
                            </p>
                          </div>
                          <input
                            type="checkbox"
                            defaultChecked={false}
                            className="h-6 w-6 rounded border-gray-300 text-primary focus:ring-primary"
                          />
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Data Management</h3>
                      <p className="text-gray-500">
                        Manage your personal data stored in our systems
                      </p>
                      
                      <div className="flex flex-col space-y-4">
                        <Button variant="outline">
                          <Image className="mr-2 h-4 w-4" />
                          Download Your Data
                        </Button>
                        
                        <Button variant="outline" className="text-red-500 hover:bg-red-50 hover:text-red-600">
                          Delete All Data
                        </Button>
                      </div>
                    </div>
                  </div>
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
