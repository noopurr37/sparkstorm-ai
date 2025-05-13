
import React from 'react';
import { Button } from "@/components/ui/button";
import { CalendarDays } from "lucide-react";

interface CalendlyEmbedProps {
  children?: React.ReactNode;
}

const CalendlyEmbed: React.FC<CalendlyEmbedProps> = () => {
  return (
    <div className="w-full flex flex-col items-center justify-center py-8">
      <h3 className="text-xl font-medium mb-6 text-center">
        Schedule a personalized demo with our team
      </h3>
      <Button 
        size="lg" 
        className="bg-primary hover:bg-primary/90 text-white flex items-center gap-2"
        onClick={() => window.open("https://cal.com/noopurr/sparkstormai", "_blank")}
      >
        <CalendarDays className="h-5 w-5" />
        Book Your Demo
      </Button>
      <p className="mt-6 text-sm text-center text-gray-500">
        Our team will walk you through MediWallet's features and answer any questions you have
      </p>
    </div>
  );
};

export default CalendlyEmbed;
