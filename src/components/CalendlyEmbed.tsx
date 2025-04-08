
import React, { useEffect } from 'react';
import { Dialog, DialogContent, DialogTrigger, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Calendar } from "lucide-react";

interface CalendlyEmbedProps {
  url: string;
  buttonText?: string;
  buttonClassName?: string;
  children?: React.ReactNode;
}

const CalendlyEmbed: React.FC<CalendlyEmbedProps> = ({ 
  url, 
  buttonText = "Book Demo", 
  buttonClassName = "",
  children
}) => {
  useEffect(() => {
    // Load Calendly CSS (for the inline widget)
    const calendlyCSS = document.createElement('link');
    calendlyCSS.href = 'https://assets.calendly.com/assets/external/widget.css';
    calendlyCSS.rel = 'stylesheet';
    document.head.appendChild(calendlyCSS);
    
    // Load Calendly script (for the inline widget)
    const script = document.createElement('script');
    script.src = 'https://assets.calendly.com/assets/external/widget.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      try {
        // Clean up - ensure elements exist before removing
        if (document.body.contains(script)) {
          document.body.removeChild(script);
        }
        if (document.head.contains(calendlyCSS)) {
          document.head.removeChild(calendlyCSS);
        }
      } catch (error) {
        console.error("Error during cleanup:", error);
      }
    };
  }, [url]);

  return (
    <Dialog>
      <DialogTrigger asChild>
        {children || (
          <Button className={`btn-primary inline-flex items-center gap-2 ${buttonClassName}`}>
            <Calendar size={16} /> {buttonText}
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] h-[650px] p-0">
        <DialogTitle className="sr-only">Schedule Meeting</DialogTitle>
        <div 
          className="calendly-inline-widget w-full h-full"
          data-url={`${url}?hide_gdpr_banner=1`}
        />
      </DialogContent>
    </Dialog>
  );
};

export default CalendlyEmbed;
