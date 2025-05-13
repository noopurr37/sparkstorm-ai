
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate, useLocation } from "react-router-dom";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

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
                    navigate("/mediwallet");
                  }}
                >
                  MediWallet
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
