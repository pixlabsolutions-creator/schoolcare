import {
  UserCog,
  Bell,
  BarChart3,
  School,
  Users,
  BookOpenCheck,
  BellRing,
  ThumbsUp,
  Handshake,
} from "lucide-react";
import SectionHeader from "../../components/common/SectionHeader";
import StatCard from "../../components/common/StatCard";

const AdminDashboard = () => {
  return (
    <div className="p-4 sm:p-6 space-y-6">
      <SectionHeader title="Admin Dashboard" />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Total School" value="231" icon={School} />
        <StatCard title="Total Students" value="18" icon={Users} />
        <StatCard title="Total Teachers" value="18" icon={UserCog} />
        <StatCard
          title="Total Uploded Homework"
          value="18"
          icon={BookOpenCheck}
        />
        <StatCard
          title="Total Created Announcement"
          value="18"
          icon={BellRing}
        />
        <StatCard title="Total Like Form News" value="89%" icon={ThumbsUp} />
        <StatCard
          title="Checked Terms & Conditions Page"
          value="12"
          icon={Handshake}
        />
      </div>
    </div>
  );
};

export default AdminDashboard;
