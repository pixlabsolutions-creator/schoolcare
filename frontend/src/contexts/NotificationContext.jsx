// src/contexts/NotificationContext.jsx
import { createContext, useContext, useState, useEffect } from "react";
import { socket } from "../socket";
import { useAuth } from "./AuthContext";

const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [token, setToken] = useState(localStorage.getItem("token"));

  const { user } = useAuth();

  useEffect(() => {
    if (!token) return;
    const fetchNotifications = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_BASE_URL}/api/notification`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        if (!res.ok) throw new Error("Unauthorized");

        const data = await res.json();
        setNotifications(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchNotifications();
  }, [token]);

  useEffect(() => {
    if (!token) return;

    const fetchNotificationsRead = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_BASE_URL}/api/notifyread`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        if (!res.ok) throw new Error("Unauthorized");

        const data = await res.json();
        const unread = data.filter((n) => !n.isRead).length;
        setUnreadCount(unread);
      } catch (err) {
        console.error(err);
      }
    };
    fetchNotificationsRead();
  }, [token]);

  useEffect(() => {
    if (!user?.school) return;

    if (!socket.connected) socket.connect();

    socket.emit("join-school", { school: user.school });

    socket.on("new-notification", (data) => {
      const newNotification = {
        id: data._id,
        message: data.message,
        read: false,
        createdAt: data.createdAt,
        type: data.type,
      };
      setNotifications((prev) => [newNotification, ...prev]);
      setUnreadCount((prev) => prev + 1);
    });

    return () => {
      socket.off("new-notification");
    };
  }, [user?.school]);

  const markAllRead = () => {
    setUnreadCount(0);
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const markAsRead = async (id) => {
    await fetch(`${import.meta.env.VITE_BASE_URL}/api/notifyread/${id}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
    setUnreadCount((prev) => (prev > 0 ? prev - 1 : 0));
  };

  return (
    <NotificationContext.Provider
      value={{ notifications, unreadCount, markAllRead, markAsRead }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotification = () => useContext(NotificationContext);
