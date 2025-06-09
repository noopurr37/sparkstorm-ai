
import { Shield } from "lucide-react";

export const AdminHeader = () => {
  return (
    <div className="flex items-center gap-2 mb-6">
      <Shield className="h-6 w-6 text-primary" />
      <h1 className="text-3xl font-bold">Admin Dashboard</h1>
    </div>
  );
};
