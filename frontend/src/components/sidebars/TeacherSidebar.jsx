import { NavLink } from "react-router-dom";
import {
  Home,
  BookOpen,
  ClipboardCheck,
  Megaphone,
  UserPlus,
  FileText,
  DollarSign,
  MessageCircle,
  User,
  LogOut,
  BadgeQuestionMark,
  MessageCircleMore,
  Info,
} from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";

const navItems = [
  { to: "/teacher", label: "Home", icon: Home },
  { to: "/teacher/homework", label: "Home work", icon: BookOpen },
  { to: "/teacher/attendance", label: "Attendance", icon: ClipboardCheck },
  { to: "/teacher/announcement", label: "Announcement", icon: Megaphone },
  { to: "/teacher/admission", label: "Admission", icon: UserPlus },
  { to: "/teacher/results", label: "Results", icon: FileText },
  { to: "/teacher/finance", label: "Finance", icon: DollarSign },
  { to: "/teacher/chat", label: "Chat", icon: MessageCircle },
  { to: "/teacher/profile", label: "Profile", icon: User },
  { to: "/teacher/about", label: "About Us", icon: BadgeQuestionMark },
  { to: "/teacher/terms", label: "Terms & Conditions", icon: Info },
  { to: "/teacher/support", label: "Support Team", icon: MessageCircleMore },
];

const TeacherSidebar = () => {
  const { logout } = useAuth();
  return (
    <aside className="hidden lg:block w-64 bg-white border-r min-h-screen px-4 py-6">
      {/* Nav */}
      <nav className="space-y-1">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.to === "/teacher"}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm transition
              ${
                isActive
                  ? "bg-purple-100 text-purple-600 font-medium"
                  : "text-gray-500 hover:bg-gray-100"
              }`
            }
          >
            <item.icon size={18} />
            {item.label}
          </NavLink>
        ))}
      </nav>

      <div className="p-4">
        <div className="flex flex-row space-x-2 p-4 rounded-xl">
          <button
            className="flex text-primary-700 flex-row items-center justify-between gap-2"
            onClick={() => logout()}
          >
            <LogOut size={18} /> Log Out
          </button>
        </div>
      </div>
    </aside>
  );
};

export default TeacherSidebar;
