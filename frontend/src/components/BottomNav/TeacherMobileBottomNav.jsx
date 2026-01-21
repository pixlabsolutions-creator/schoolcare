import { NavLink } from "react-router-dom";
import { Home, User, CalendarDays, Pencil } from "lucide-react";

const nav = [
  { path: "/teacher", label: "Home", icon: Home },
  { path: "/teacher/attendance", label: "Attendance", icon: CalendarDays },
  { path: "/teacher/homework", label: "Home work", icon: Pencil },
  { path: "/teacher/profile", label: "Profile", icon: User },
];

const TeacherMobileBottomNav = () => {
  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t z-50">
      <div className="flex justify-around py-2 items-center">
        {nav.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.path === "/teacher"}
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

export default TeacherMobileBottomNav;
