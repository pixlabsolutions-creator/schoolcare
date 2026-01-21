import { useState, useRef, useEffect } from "react";
import { Bell } from "lucide-react";
import { useNotification } from "../contexts/NotificationContext";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const NotificationBell = () => {
  const { user } = useAuth();

  const { notifications, unreadCount, markAllRead, markAsRead } =
    useNotification();
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef();
  // Click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => {
          setOpen(!open);
          markAllRead();
        }}
        className="relative p-2 rounded-full hover:bg-gray-100 transition"
      >
        <Bell size={24} />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center animate-pulse">
            {unreadCount}
          </span>
        )}
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-80 lg:w-96 max-h-96 bg-white shadow-lg rounded-lg overflow-hidden z-50">
          <div className="p-4 border-b flex justify-between items-center">
            <span className="font-semibold">Notifications</span>
            {notifications.length > 0 && (
              <button
                onClick={markAllRead}
                className="text-sm text-gray-500 hover:underline"
              >
                Mark all read
              </button>
            )}
          </div>

          <div className="max-h-80 overflow-y-auto">
            {notifications.length === 0 && (
              <div className="p-4 text-gray-500 text-sm">No notifications</div>
            )}
            {notifications.map((n) => (
              <Link
                to={
                  user.userRole === "teacher"
                    ? "/teacher/notice"
                    : "/student/notice"
                }
                key={n._id}
                onClick={() => markAsRead(n._id)}
                className={`p-3 border-b hover:bg-gray-100 cursor-pointer flex justify-between items-start ${
                  n.isRead ? "bg-gray-50" : "bg-white"
                }`}
              >
                <div>
                  <p
                    className={`text-sm ${
                      n.isRead ? "text-gray-500" : "text-gray-900"
                    }`}
                  >
                    {n.message}
                  </p>
                  <span className="text-xs text-gray-400">
                    {new Date(n.createdAt).toLocaleDateString()}
                  </span>
                </div>
                {!n.read && (
                  <span className="w-2 h-2 bg-primary-700 rounded-full mt-1" />
                )}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationBell;
