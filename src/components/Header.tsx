
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-white py-4 shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 flex justify-between items-center">
        {/* Logo - brought back */}
        <div className="flex items-center">
          <Link to="/" className="flex items-center space-x-2 mr-8">
            <img
              src="/lovable-uploads/29312d6b-5f6a-4a11-b1cc-4ab04284a888.png"
              alt="SparkStorm AI Logo"
              className="h-10"
            />
            <span className="text-xl font-bold text-gray-900">SparkStorm AI</span>
          </Link>
          
          {/* Desktop navigation - still on the left */}
          <nav className="hidden lg:flex items-center space-x-8">
            <a href="#services" className="text-gray-700 hover:text-primary transition">
              Services
            </a>
            <a href="#team" className="text-gray-700 hover:text-primary transition">
              Team
            </a>
            <a href="#testimonials" className="text-gray-700 hover:text-primary transition">
              Testimonials
            </a>
            <a href="#contact" className="text-gray-700 hover:text-primary transition">
              Contact
            </a>
          </nav>
        </div>

        {/* Mobile menu button - still on the right */}
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
                href="#services" 
                className="text-gray-700 hover:text-primary transition"
                onClick={toggleMenu}
              >
                Services
              </a>
              <a 
                href="#team" 
                className="text-gray-700 hover:text-primary transition"
                onClick={toggleMenu}
              >
                Team
              </a>
              <a 
                href="#testimonials" 
                className="text-gray-700 hover:text-primary transition"
                onClick={toggleMenu}
              >
                Testimonials
              </a>
              <a 
                href="#contact" 
                className="text-gray-700 hover:text-primary transition"
                onClick={toggleMenu}
              >
                Contact
              </a>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
