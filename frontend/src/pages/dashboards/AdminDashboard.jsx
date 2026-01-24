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
import { useSchool } from "../../contexts/SchoolContext";
import { useStudent } from "../../contexts/studentContext";
import { useAuth } from "../../contexts/AuthContext";
import { useHomework } from "../../contexts/HomeworkContext";
import { useAnouncement } from "../../contexts/AnoucementContext";

const AdminDashboard = () => {
  const { schools } = useSchool();
  const { studentsAdmin } = useStudent();
  const { allTeachers } = useAuth();
  const { homework } = useHomework();
  const { allAnouncements } = useAnouncement();

  return (
    <div className="p-4 sm:p-6 space-y-6">
      <SectionHeader title="Admin Dashboard" />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Total School" value={schools?.length} icon={School} />
        <StatCard
          title="Total Students"
          value={studentsAdmin?.length}
          icon={Users}
        />
        <StatCard
          title="Total Teachers"
          value={allTeachers?.length}
          icon={UserCog}
        />
        <StatCard
          title="Total Uploded Homework"
          value={homework?.length}
          icon={BookOpenCheck}
        />
        <StatCard
          title="Total Created Announcement"
          value={allAnouncements?.length}
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
