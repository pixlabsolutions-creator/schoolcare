import { NavLink } from "react-router-dom";
import {
  Home,
  BarChart3,
  BookOpen,
  Award,
  DollarSign,
  User,
  MessageCircleMore,
  BadgeQuestionMark,
  CircleAlert,
  LogOut,
} from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";

const menu = [
  { path: "/student", label: "Home", icon: Home },
  { path: "/student/performance", label: "Performance", icon: BarChart3 },
  { path: "/student/homework", label: "Home work", icon: BookOpen },
  { path: "/student/results", label: "Results", icon: Award },
  { path: "/student/finance", label: "Finance", icon: DollarSign },
  {
    path: "/student/chat",
    label: "Chat With Teacher",
    icon: MessageCircleMore,
  },
  { path: "/student/profile", label: "Profile", icon: User },
  { path: "/student/about-us", label: "About Us", icon: BadgeQuestionMark },
  {
    path: "/student/terms-conditions",
    label: "Terms & Condition",
    icon: CircleAlert,
  },
];

const StudentSidebar = () => {
  const { logout } = useAuth();
  return (
    <div className="hidden lg:flex w-64 bg-[#FBFBFD] border-r border-gray-100 flex-col py-6 justify-between min-h-screen">
      <nav className="flex-1 px-4 space-y-2 ">
        {menu.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.path === "/student"}
            className={({ isActive }) =>
              `relative flex items-center gap-3 px-4 border-l-[3px] border-white py-3  ${
                isActive
                  ? "bg-gradient-to-r from-violet-200 to-white rounded-none text-[#6C5DD3] border-l-[3px] border-[#6C5DD3]"
                  : "text-gray-500 hover:bg-gray-100"
              }`
            }
          >
            {item.icon && <item.icon size={18} />}

            <span className="text-sm font-medium">{item.label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="p-4">
        <div className="hidden lg:flex flex-row space-x-2 p-4 rounded-xl">
          <button
            className="flex text-primary-700 flex-row items-center justify-between gap-2"
            onClick={() => logout()}
          >
            <LogOut size={18} /> Log Out
          </button>
        </div>
      </div>
    </div>
  );
};

export default StudentSidebar;
