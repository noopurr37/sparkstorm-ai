
import { useState, useEffect } from "react";
import { Menu, X, User, LogOut, Wallet } from "lucide-react";
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
    if (!user) {
      navigate("/auth", { 
        state: { 
          redirectTo: "/mediwallet",
          message: "Please sign in or create an account to access MediWallet" 
        }
      });
    } else {
      navigate("/mediwallet");
    }
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    toast({
      title: "Signed out",
      description: "You have been signed out successfully.",
    });
    navigate("/");
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
              <a href="/#testimonials" className="font-sans text-base font-medium text-gray-700 hover:text-primary transition-colors">
                Testimonials
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
            </div>
          </div>

          {/* Auth button (desktop) */}
          <div className="hidden lg:block">
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
                  href="/#testimonials" 
                  className="font-sans text-base font-medium text-gray-700 hover:text-primary transition-colors"
                  onClick={closeMenu}
                >
                  Testimonials
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
                    if (!user) {
                      e.preventDefault();
                      navigate("/auth", { 
                        state: { 
                          redirectTo: "/mediwallet",
                          message: "Please sign in or create an account to access MediWallet" 
                        } 
                      });
                    } else {
                      navigate("/mediwallet");
                    }
                  }}
                >
                  MediWallet
                </a>
                {user && (
                  <a 
                    href="/profile" 
                    className="font-sans text-base font-medium text-gray-700 hover:text-primary transition-colors"
                    onClick={closeMenu}
                  >
                    Profile Settings
                  </a>
                )}
                {user && (
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
