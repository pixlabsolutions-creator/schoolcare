import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

const NewsContext = createContext();
const baseUrl = import.meta.env.VITE_BASE_URL;

export const NewsProvider = ({ children }) => {
  const [allNews, setAllNews] = useState([]);
  const [newsBySchool, setNewsBySchool] = useState([]);
  const [newsById, setNewsById] = useState({});
  const [openModal, setOpenModal] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAllNews = async () => {
      try {
        const res = await fetch(`${baseUrl}/api/news`);
        if (!res.ok) throw new Error("Failed to fetch");
        const data = await res.json();
        setAllNews(data);
      } catch (err) {
        setAllNews([]);
        toast.error("Failed to load News");
      } finally {
        setLoading(false);
      }
    };

    fetchAllNews();
  }, []);

  const fetchNewsBySchool = async (school) => {
    try {
      const res = await fetch(
        `${baseUrl}/api/news/${encodeURIComponent(school)}`,
      );
      if (!res.ok) throw new Error("Failed to fetch");
      const data = await res.json();
      setNewsBySchool(data);
    } catch (err) {
      setNewsBySchool([]);
      toast.error("Failed to load News");
    } finally {
      setLoading(false);
    }
  };

  const fetchNewsById = async (id) => {
    try {
      const res = await fetch(
        `${baseUrl}/api/news/single/${encodeURIComponent(id)}`,
      );
      if (!res.ok) throw new Error("Failed to fetch");
      const data = await res.json();
      setNewsById(data);
    } catch (err) {
      setNewsById([]);
      toast.error("Failed to load News");
    } finally {
      setLoading(false);
    }
  };

  const deleteNews = async (id) => {
    try {
      const res = await axios.delete(`${baseUrl}/api/news/${id}`);

      if (res.data.success) {
        toast.success("News deleted successfully");

        setAllNews((prev) => prev.filter((news) => news._id !== id));
        setOpenModal(false);
      } else {
        toast.error(res.data.message || "Delete failed");
      }
    } catch (error) {
      toast.error("Something went wrong");
      console.error(error);
    }
  };

  return (
    <NewsContext.Provider
      value={{
        fetchNewsBySchool,
        newsBySchool,
        fetchNewsById,
        newsById,
        allNews,
        setAllNews,
        deleteNews,
        openModal,
        setOpenModal,
      }}
    >
      {children}
    </NewsContext.Provider>
  );
};

export const useNews = () => useContext(NewsContext);
