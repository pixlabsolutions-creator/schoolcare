import { NavLink } from "react-router-dom";
import {
  Home,
  LogOut,
  BadgeQuestionMark,
  Info,
  Bell,
  FilePlusCorner,
  LayoutGrid,
  MessageCircleMore,
} from "lucide-react";

const navItems = [
  { to: "/admin", label: "Home", icon: Home },
  { to: "/admin/notification", label: "Notification", icon: Bell },
  { to: "/admin/news", label: "News", icon: FilePlusCorner },
  { to: "/admin/school", label: "School", icon: LayoutGrid },
  { to: "/admin/chat", label: "Chat", icon: MessageCircleMore },
  { to: "/admin/about-us", label: "About Us", icon: BadgeQuestionMark },
  { to: "/admin/terms-condition", label: "Terms & Conditions", icon: Info },
];
const AdminSidebar = () => {
  return (
    <aside className="hidden lg:block w-64 bg-white border-r min-h-screen px-4 py-6">
      {/* Nav */}
      <nav className="space-y-1">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.to === "/admin"}
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

export default AdminSidebar;
