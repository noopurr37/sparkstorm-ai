
import React, { useEffect } from 'react';

interface CalendlyEmbedProps {
  children?: React.ReactNode;
}

const CalendlyEmbed: React.FC<CalendlyEmbedProps> = () => {
  useEffect(() => {
    // Create and append Cal.com script
    const script = document.createElement('script');
    script.src = "https://cal.com/embed.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      // Cleanup script when component unmounts
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div className="w-full">
      <cal-inline-widget 
        data-cal-link="noopurr/sparkstormai" 
        style={{ width: '100%', height: '700px', overflow: 'hidden' }}
      />
    </div>
  );
};

export default CalendlyEmbed;
