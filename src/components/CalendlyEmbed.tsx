
import React from 'react';

interface CalendlyEmbedProps {
  children?: React.ReactNode;
}

const CalendlyEmbed: React.FC<CalendlyEmbedProps> = ({ 
  children 
}) => {
  // This component now simply renders its children
  // No more calendly functionality, no default button
  return (
    <>
      {children}
    </>
  );
};

export default CalendlyEmbed;
