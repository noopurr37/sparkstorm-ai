import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { ThemeToggle } from "./ThemeToggle";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      toast({
        title: "Error",
        description: "Failed to sign out",
        variant: "destructive",
      });
    } else {
      toast({
        title: "Success",
        description: "Signed out successfully",
      });
      navigate("/");
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="h-8 w-8 bg-gradient-primary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">S</span>
            </div>
            <span className="font-bold text-xl text-navy-blue dark:text-white">SparkStorm AI</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-700 dark:text-gray-300 hover:text-primary transition-colors">
              Home
            </Link>
            <Link to="/mediwallet" className="text-gray-700 dark:text-gray-300 hover:text-primary transition-colors">
              MediWallet
            </Link>
            <Link to="/ai-events" className="text-gray-700 dark:text-gray-300 hover:text-primary transition-colors">
              AI Events
            </Link>
            <Link to="/book-demo" className="text-gray-700 dark:text-gray-300 hover:text-primary transition-colors">
              Book Demo
            </Link>
            <div className="flex items-center space-x-4">
              <ThemeToggle />
              <Link to="/auth">
                <Button variant="outline" size="sm">Sign In</Button>
              </Link>
              <Link to="/book-demo">
                <Button size="sm">Get Started</Button>
              </Link>
            </div>
          </nav>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-2">
            <ThemeToggle />
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 dark:text-gray-300"
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <Link 
                to="/" 
                className="block px-3 py-2 text-gray-700 dark:text-gray-300 hover:text-primary transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link 
                to="/mediwallet" 
                className="block px-3 py-2 text-gray-700 dark:text-gray-300 hover:text-primary transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                MediWallet
              </Link>
              <Link 
                to="/ai-events" 
                className="block px-3 py-2 text-gray-700 dark:text-gray-300 hover:text-primary transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                AI Events
              </Link>
              <Link 
                to="/book-demo" 
                className="block px-3 py-2 text-gray-700 dark:text-gray-300 hover:text-primary transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Book Demo
              </Link>
              <div className="flex flex-col space-y-2 px-3 pt-2">
                <Link to="/auth" onClick={() => setIsMenuOpen(false)}>
                  <Button variant="outline" size="sm" className="w-full">Sign In</Button>
                </Link>
                <Link to="/book-demo" onClick={() => setIsMenuOpen(false)}>
                  <Button size="sm" className="w-full">Get Started</Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
