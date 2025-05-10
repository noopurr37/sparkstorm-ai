
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-white py-4 shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <nav className="flex items-center justify-between">
          {/* Logo and navigation container */}
          <div className="flex items-center gap-8">
            {/* Logo */}
            <a href="#home" className="flex items-center gap-3">
              <img
                src="/lovable-uploads/ce8dd0d2-b604-4195-bdf7-c3a2ba352eb4.png"
                alt="SparkStorm AI Logo"
                className="h-10 w-auto"
              />
              <span className="font-sans text-base font-medium text-gray-800 hover:text-primary transition-colors">
                Home
              </span>
            </a>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-8">
              <a href="#services" className="font-sans text-base font-medium text-gray-700 hover:text-primary transition-colors">
                Services
              </a>
              <a href="#team" className="font-sans text-base font-medium text-gray-700 hover:text-primary transition-colors">
                Team
              </a>
              <a href="#testimonials" className="font-sans text-base font-medium text-gray-700 hover:text-primary transition-colors">
                Testimonials
              </a>
              <a href="#contact" className="font-sans text-base font-medium text-gray-700 hover:text-primary transition-colors">
                Contact
              </a>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden">
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
                  href="#home" 
                  className="font-sans text-base font-medium text-gray-700 hover:text-primary transition-colors"
                  onClick={toggleMenu}
                >
                  Home
                </a>
                <a 
                  href="#services" 
                  className="font-sans text-base font-medium text-gray-700 hover:text-primary transition-colors"
                  onClick={toggleMenu}
                >
                  Services
                </a>
                <a 
                  href="#team" 
                  className="font-sans text-base font-medium text-gray-700 hover:text-primary transition-colors"
                  onClick={toggleMenu}
                >
                  Team
                </a>
                <a 
                  href="#testimonials" 
                  className="font-sans text-base font-medium text-gray-700 hover:text-primary transition-colors"
                  onClick={toggleMenu}
                >
                  Testimonials
                </a>
                <a 
                  href="#contact" 
                  className="font-sans text-base font-medium text-gray-700 hover:text-primary transition-colors"
                  onClick={toggleMenu}
                >
                  Contact
                </a>
              </nav>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
