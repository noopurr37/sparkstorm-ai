
import React from "react";

interface MediFeatureProps {
  title: string;
  description: string;
  icon: string;
  iconBg: string;
}

const MediFeature: React.FC<MediFeatureProps> = ({ title, description, icon, iconBg }) => {
  return (
    <div className="flex flex-col items-center rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md">
      <div className={`mb-4 flex h-16 w-16 items-center justify-center rounded-full ${iconBg}`}>
        <span className="text-3xl">{icon}</span>
      </div>
      <h3 className="mb-3 text-xl font-semibold">{title}</h3>
      <p className="text-center text-gray-600">{description}</p>
    </div>
  );
};

export default MediFeature;
