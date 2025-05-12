
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
  // This component now simply renders its children or a button
  // No more calendly functionality
  return (
    <>
      {children}
    </>
  );
};

export default CalendlyEmbed;
