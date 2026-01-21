import { NavLink } from "react-router-dom";
import { BarChart3, Pencil, User, House } from "lucide-react";

const nav = [
  { path: "/student", label: "Home", icon: House },
  { path: "/student/performance", label: "Performance", icon: BarChart3 },
  { path: "/student/homework", label: "Home work", icon: Pencil },
  { path: "/student/profile", label: "Profile", icon: User },
];

const StudentMobileBottomNav = () => {
  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t z-50">
      <div className="flex justify-around py-2 items-center">
        {nav.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.path === "/student"}
            className={({ isActive }) =>
              `flex flex-col items-center text-xs ${
                isActive ? "text-[#6C5DD3]" : "text-gray-400"
              }`
            }
          >
            <item.icon size={22} />
            {item.label}
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default StudentMobileBottomNav;
