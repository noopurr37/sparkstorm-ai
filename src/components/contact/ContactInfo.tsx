
import { Mail, MapPin, Phone, Linkedin, Instagram } from "lucide-react";

const ContactInfo = () => {
  return (
    <div className="glass-card p-8 h-full">
      <h3 className="text-2xl font-bold mb-6">Contact Information</h3>
      
      <div className="space-y-6">
        <div className="flex items-start space-x-4">
          <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center flex-shrink-0">
            <Mail className="w-5 h-5 text-blue-600" />
          </div>
          <div>
            <h4 className="text-sm font-medium text-gray-500 mb-1">Email</h4>
            <p className="text-gray-800">ask@sparkstorm.ai</p>
          </div>
        </div>
        
        <div className="flex items-start space-x-4">
          <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center flex-shrink-0">
            <Phone className="w-5 h-5 text-blue-600" />
          </div>
          <div>
            <h4 className="text-sm font-medium text-gray-500 mb-1">Phone</h4>
            <p className="text-gray-800">+1 (512) 337-2056</p>
          </div>
        </div>
        
        <div className="flex items-start space-x-4">
          <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center flex-shrink-0">
            <MapPin className="w-5 h-5 text-blue-600" />
          </div>
          <div>
            <h4 className="text-sm font-medium text-gray-500 mb-1">Location</h4>
            <p className="text-gray-800">Austin, Texas</p>
            <p className="text-gray-800">United States</p>
          </div>
        </div>
      </div>
      
      <div className="mt-12">
        <h4 className="text-lg font-semibold mb-4">Follow Us</h4>
        <div className="flex space-x-4">
          <a
            href="https://www.linkedin.com/company/sparkstormai"
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-blue-50 hover:text-blue-600 transition-colors"
            aria-label="LinkedIn"
          >
            <Linkedin className="w-5 h-5" />
          </a>
          <a
            href="https://www.instagram.com/sparkstormai"
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-blue-50 hover:text-blue-600 transition-colors"
            aria-label="Instagram"
          >
            <Instagram className="w-5 h-5" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default ContactInfo;
