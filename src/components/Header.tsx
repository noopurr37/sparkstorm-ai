
import { useState, useEffect } from "react";
import { Menu, X, User, LogOut, Wallet, CalendarDays, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate, useLocation } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();

  useEffect(() => {
    // Get user on mount
    const getUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user || null);
    };

    getUser();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user || null);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const handleMediWalletClick = (e) => {
    e.preventDefault();
    navigate("/mediwallet");
  };

  // Updated sign out function to handle offline cases properly
  const signOut = async () => {
    try {
      // First update the UI state to give immediate feedback
      setUser(null);
      
      try {
        // Attempt to sign out from Supabase
        const { error } = await supabase.auth.signOut();
        if (error) throw error;
      } catch (error) {
        console.error("Supabase sign out failed:", error);
        // Even if the API request fails, we still want to sign out locally
      }
      
      toast({
        title: "Signed out",
        description: "You have been signed out successfully.",
      });
      navigate("/");
    } catch (error) {
      toast({
        title: "Sign out action completed",
        description: "Your session has been cleared.",
      });
    }
  };

  const userInitials = user?.user_metadata?.full_name
    ? user.user_metadata.full_name
        .split(' ')
        .map(name => name[0])
        .join('')
        .toUpperCase()
    : 'U';

  const renderAuthButtons = () => {
    if (user) {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="rounded-full bg-primary/10">
              <span className="font-medium text-sm text-primary">{userInitials}</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => navigate("/mediwallet")}>
              <Wallet className="mr-2 h-4 w-4" />
              MediWallet Dashboard
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => navigate("/profile")}>
              <User className="mr-2 h-4 w-4" />
              Profile Settings
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => navigate("/user-preferences")}>
              <Settings className="mr-2 h-4 w-4" />
              Website Preferences
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={signOut}>
              <LogOut className="mr-2 h-4 w-4" />
              Sign Out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    }
    
    return (
      <Button 
        onClick={() => navigate("/auth")} 
        variant="default" 
      >
        Sign In
      </Button>
    );
  };

  return (
    <header className="bg-white py-4 shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <nav className="flex items-center justify-between">
          {/* Logo and navigation container */}
          <div className="flex items-center gap-8">
            {/* Logo */}
            <a href="/" className="flex items-center gap-3">
              <img
                src="/lovable-uploads/7879e10d-f875-48a1-a7a4-43be226d30a0.png"
                alt="SparkStorm AI Logo"
                className="h-10 w-auto"
              />
              <span className="font-sans text-base font-medium text-gray-800 hover:text-primary transition-colors">
                Home
              </span>
            </a>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-8">
              <a href="/#services" className="font-sans text-base font-medium text-gray-700 hover:text-primary transition-colors">
                Services
              </a>
              <a href="/#team" className="font-sans text-base font-medium text-gray-700 hover:text-primary transition-colors">
                Team
              </a>
              <a href="/#contact" className="font-sans text-base font-medium text-gray-700 hover:text-primary transition-colors">
                Contact
              </a>
              <a 
                href="/mediwallet" 
                className={`font-sans text-base font-medium transition-colors ${
                  location.pathname === '/mediwallet' 
                    ? 'text-primary' 
                    : 'text-gray-700 hover:text-primary'
                }`}
                onClick={handleMediWalletClick}
              >
                MediWallet
              </a>
              <a 
                href="/ai-events" 
                className={`font-sans text-base font-medium transition-colors ${
                  location.pathname === '/ai-events' || location.pathname === '/ai-talk'
                    ? 'text-primary' 
                    : 'text-gray-700 hover:text-primary'
                }`}
                onClick={(e) => {
                  e.preventDefault();
                  navigate("/ai-events");
                }}
              >
                AI Talk with Noopurr
              </a>
              
              {/* Sign In Button moved into the navigation for desktop */}
              <div className="lg:block ml-4">
                {renderAuthButtons()}
              </div>
            </div>
          </div>

          {/* Auth button (desktop) - hidden from here as it's now inside the navigation */}
          <div className="hidden">
            {renderAuthButtons()}
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden flex items-center gap-4">
            {/* Auth button (mobile) */}
            <div className="block lg:hidden">
              {renderAuthButtons()}
            </div>

            <Button
              variant="ghost"
              size="icon"
              onClick={toggleMenu}
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </Button>
          </div>

          {/* Mobile menu */}
          {isMenuOpen && (
            <div className="lg:hidden absolute top-16 left-0 right-0 bg-white shadow-md py-4 px-4 z-50">
              <nav className="flex flex-col space-y-4">
                <a 
                  href="/" 
                  className="font-sans text-base font-medium text-gray-700 hover:text-primary transition-colors"
                  onClick={closeMenu}
                >
                  Home
                </a>
                <a 
                  href="/#services" 
                  className="font-sans text-base font-medium text-gray-700 hover:text-primary transition-colors"
                  onClick={closeMenu}
                >
                  Services
                </a>
                <a 
                  href="/#team" 
                  className="font-sans text-base font-medium text-gray-700 hover:text-primary transition-colors"
                  onClick={closeMenu}
                >
                  Team
                </a>
                <a 
                  href="/#contact" 
                  className="font-sans text-base font-medium text-gray-700 hover:text-primary transition-colors"
                  onClick={closeMenu}
                >
                  Contact
                </a>
                <a 
                  href="/mediwallet" 
                  className="font-sans text-base font-medium text-gray-700 hover:text-primary transition-colors"
                  onClick={(e) => {
                    closeMenu();
                    navigate("/mediwallet");
                  }}
                >
                  MediWallet
                </a>
                <a 
                  href="/ai-events" 
                  className="font-sans text-base font-medium text-gray-700 hover:text-primary transition-colors"
                  onClick={(e) => {
                    closeMenu();
                    navigate("/ai-events");
                  }}
                >
                  AI Talk with Noopurr
                </a>
                {user && (
                  <>
                  <a 
                    href="/profile" 
                    className="font-sans text-base font-medium text-gray-700 hover:text-primary transition-colors"
                    onClick={() => {
                      closeMenu();
                      navigate("/profile");
                    }}
                  >
                    Profile Settings
                  </a>
                  <a 
                    href="/user-preferences" 
                    className="font-sans text-base font-medium text-gray-700 hover:text-primary transition-colors"
                    onClick={() => {
                      closeMenu();
                      navigate("/user-preferences");
                    }}
                  >
                    Website Preferences
                  </a>
                  <Button 
                    variant="ghost" 
                    className="justify-start p-0 h-auto font-sans text-base font-medium text-red-500 hover:text-red-700 transition-colors"
                    onClick={() => {
                      signOut();
                      closeMenu();
                    }}
                  >
                    Sign Out
                  </Button>
                  </>
                )}
              </nav>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
