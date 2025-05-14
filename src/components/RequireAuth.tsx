
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Loader2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface RequireAuthProps {
  children: React.ReactNode;
  feature: string;
}

const RequireAuth = ({ children, feature }: RequireAuthProps) => {
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        setAuthenticated(!!session);
      } catch (error) {
        console.error("Authentication check error:", error);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
    
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setAuthenticated(!!session);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center p-8">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!authenticated) {
    return (
      <Card className="max-w-md mx-auto">
        <CardHeader>
          <CardTitle className="text-xl">Account Required</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-4">You need to sign in or create an account to access {feature}.</p>
          <div className="flex gap-4">
            <Button 
              onClick={() => navigate("/auth", { 
                state: { 
                  redirectTo: window.location.pathname,
                  message: `Please sign in or create an account to access ${feature}` 
                } 
              })}
              className="flex-1"
            >
              Sign In / Create Account
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return <>{children}</>;
};

export default RequireAuth;
