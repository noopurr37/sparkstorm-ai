
import React from 'react';
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

interface CalendlyEmbedProps {
  buttonText?: string;
  buttonClassName?: string;
  children?: React.ReactNode;
  onClick?: () => void;
}

const CalendlyEmbed: React.FC<CalendlyEmbedProps> = ({ 
  buttonText = "Book Demo", 
  buttonClassName = "",
  onClick,
  children
}) => {
  return (
    <>
      {children || (
        <Button 
          onClick={onClick} 
          className={`bg-white text-primary hover:bg-gray-100 inline-flex items-center gap-2 ${buttonClassName}`}
        >
          {buttonText} <ArrowRight className="h-4 w-4" />
        </Button>
      )}
    </>
  );
};

export default CalendlyEmbed;
