
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import type { AdminData } from "@/types/admin";

export const useAdminData = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<AdminData>({
    contactSubmissions: [],
    aiTalkRequests: [],
    consultationRequests: [],
    waitlistEntries: [],
    newsletterSubscriptions: [],
  });
  const { toast } = useToast();
  const navigate = useNavigate();

  const checkAdminAccess = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        toast({
          title: "Access Denied",
          description: "Please log in to access the admin dashboard.",
          variant: "destructive",
        });
        navigate("/auth");
        return;
      }

      // Check if user is admin by testing if they can read contact submissions
      const { data, error } = await supabase
        .from('contact_submissions')
        .select('count(*)')
        .limit(1);

      if (error) {
        console.error("Admin access check failed:", error);
        toast({
          title: "Access Denied",
          description: "You don't have admin privileges to view this page.",
          variant: "destructive",
        });
        navigate("/");
        return;
      }

      setIsAdmin(true);
      await loadAllData();
    } catch (error) {
      console.error("Error checking admin access:", error);
      toast({
        title: "Error",
        description: "Failed to verify admin access.",
        variant: "destructive",
      });
      navigate("/");
    } finally {
      setLoading(false);
    }
  };

  const loadAllData = async () => {
    try {
      // Load contact submissions
      const { data: contacts, error: contactsError } = await supabase
        .from('contact_submissions')
        .select('*')
        .order('created_at', { ascending: false });

      if (contactsError) throw contactsError;

      // Load AI talk requests
      const { data: aiTalks, error: aiTalksError } = await supabase
        .from('ai_talk_requests')
        .select('*')
        .order('created_at', { ascending: false });

      if (aiTalksError) throw aiTalksError;

      // Load consultation requests
      const { data: consultations, error: consultationsError } = await supabase
        .from('consultation_requests')
        .select('*')
        .order('created_at', { ascending: false });

      if (consultationsError) throw consultationsError;

      // Load waitlist entries
      const { data: waitlist, error: waitlistError } = await supabase
        .from('mediwallet_waitlist')
        .select('*')
        .order('created_at', { ascending: false });

      if (waitlistError) throw waitlistError;

      // Load newsletter subscriptions
      const { data: newsletter, error: newsletterError } = await supabase
        .from('newsletter_subscriptions')
        .select('*')
        .order('created_at', { ascending: false });

      if (newsletterError) throw newsletterError;

      setData({
        contactSubmissions: contacts || [],
        aiTalkRequests: aiTalks || [],
        consultationRequests: consultations || [],
        waitlistEntries: waitlist || [],
        newsletterSubscriptions: newsletter || [],
      });

    } catch (error) {
      console.error("Error loading data:", error);
      toast({
        title: "Error",
        description: "Failed to load admin data.",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    checkAdminAccess();
  }, []);

  return {
    isAdmin,
    loading,
    data,
    loadAllData,
  };
};
