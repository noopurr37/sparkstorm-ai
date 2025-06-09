
import { Button } from "@/components/ui/button";
import { AdminHeader } from "./AdminHeader";
import { AdminStats } from "./AdminStats";
import { AdminTabs } from "./AdminTabs";
import { useAdminData } from "@/hooks/useAdminData";

const AdminDashboard = () => {
  const { isAdmin, loading, data, loadAllData } = useAdminData();

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  if (loading) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }

  if (!isAdmin) {
    return null;
  }

  return (
    <div className="container mx-auto p-6">
      <AdminHeader />
      <AdminStats data={data} />
      <AdminTabs data={data} formatDate={formatDate} />
      
      <div className="mt-6">
        <Button onClick={() => loadAllData()}>
          Refresh Data
        </Button>
      </div>
    </div>
  );
};

export default AdminDashboard;
