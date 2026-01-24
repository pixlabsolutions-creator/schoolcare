import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useAuth } from "./AuthContext";
import axios from "axios";

const AnouncementContext = createContext();

export const AnouncementProvider = ({ children }) => {
  const [anouncements, setAnouncements] = useState([]);
  const [allAnouncements, setAllAnouncements] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [anouncementsById, setAnouncementsById] = useState({});
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  //  fetch Anouncement
  useEffect(() => {
    const fetchAllAnouncement = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_BASE_URL}/api/announcemant/admin`,
        );

        if (!res.ok) throw new Error("Failed to fetch");

        const data = await res.json();
        setAllAnouncements(data);
      } catch (err) {
        setAllAnouncements([]);
        toast.error("Failed to load classes");
      } finally {
        setLoading(false);
      }
    };

    fetchAllAnouncement();
  }, []);

  //  fetch Anouncement
  useEffect(() => {
    if (!user?.school) {
      return;
    }
    // =================School Wise Find Anousment=====================
    const fetchAnouncement = async () => {
      try {
        const res = await fetch(
          `${
            import.meta.env.VITE_BASE_URL
          }/api/announcemant?school=${encodeURIComponent(user?.school)}`,
        );

        if (!res.ok) throw new Error("Failed to fetch");

        const data = await res.json();
        setAnouncements(data);
      } catch (err) {
        setAnouncements([]);
        toast.error("Failed to load classes");
      } finally {
        setLoading(false);
      }
    };

    fetchAnouncement();
  }, [user?.school]);

  // ===============Find Anouncement by Id=================

  const fetchAnouncementById = async (id) => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_BASE_URL}/api/announcemant/${id}`,
      );

      if (!res.ok) throw new Error("Failed to fetch");

      const data = await res.json();
      setAnouncementsById(data);
    } catch (err) {
      setAnouncementsById([]);
      toast.error("Failed to load classes");
    } finally {
      setLoading(false);
    }
  };

  //  add new class
  const addAnouncement = async (formData) => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_BASE_URL}/api/announcemant`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        },
      );

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message || "Failed to create announcemant");
        return null;
      }

      setAnouncements((prev) => [...prev, data]);

      toast.success("Anouncements added successfully 🎉");
      return data;
    } catch (error) {
      toast.error("Server error. Try again later");
      return null;
    }
  };

  // ===============Delete Announcements=====================

  const deleteAnouncement = async (id) => {
    try {
      const res = await axios.delete(
        `${import.meta.env.VITE_BASE_URL}/api/announcemant/${id}`,
      );

      setAnouncements((prev) => prev.filter((a) => a._id !== id));

      toast.success("Anouncements deleted successfully 🎉");
      setOpenModal(false);
      return data;
    } catch (error) {
      return null;
    }
  };

  // ===============Like Announcements=====================

  const updateLike = async (id, userId) => {
    try {
      setAnouncementsById((prev) => {
        if (!prev) return prev;

        const liked = prev.like.likerId.includes(userId);

        return {
          ...prev,
          like: {
            ...prev.like,
            likerId: liked
              ? prev.like.likerId.filter((u) => u !== userId)
              : [...prev.like.likerId, userId],
          },
        };
      });

      // Backend update
      await axios.put(
        `${import.meta.env.VITE_BASE_URL}/api/announcemant/like/${id}?userId=${userId}`,
      );

      toast.success("Updated");
    } catch (error) {
      console.error("Failed to Like Announcement", error);
    }
  };

  return (
    <AnouncementContext.Provider
      value={{
        anouncements,
        loading,
        addAnouncement,
        fetchAnouncementById,
        setAnouncementsById,
        anouncementsById,
        deleteAnouncement,
        openModal,
        setOpenModal,
        updateLike,
        allAnouncements,
      }}
    >
      {children}
    </AnouncementContext.Provider>
  );
};

export const useAnouncement = () => useContext(AnouncementContext);
