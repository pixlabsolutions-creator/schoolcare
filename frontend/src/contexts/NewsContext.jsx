import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

const NewsContext = createContext();
const baseUrl = import.meta.env.VITE_BASE_URL;

export const NewsProvider = ({ children }) => {
  const [newsBySchool, setNewsBySchool] = useState([]);
  const [newsById, setNewsById] = useState({});
  const [loading, setLoading] = useState(true);

  /* ===== Add Homework ===== */
  //   const addSchool = async (formData, image) => {
  //     try {
  //       const data = new FormData();
  //       Object.keys(formData).forEach((key) => {
  //         data.append(key, formData[key]);
  //       });
  //       if (image) data.append("image", image);

  //       const res = await axios.post(`${baseUrl}/api/schools`, data);

  //       setSchools((prev) => [...prev, res.data.data]);
  //       toast.success("School added successfully");
  //       return true;
  //     } catch (err) {
  //       toast.error(err.response?.data?.message || "Failed to add school");
  //       return false;
  //     }
  //   };
  //   // ==============fetch by Id=========================

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
  // ============================Delete School========================

  //   const deleteSchool = async (id) => {
  //     try {
  //       console.log(id);
  //       const res = await axios.delete(`${baseUrl}/api/schools/${id}`);

  //       setSchools((prev) => prev.filter((school) => school._id !== id));
  //       setOpenModal(false);
  //       toast.success("School deleted successfully");
  //       return true;
  //     } catch (error) {
  //       console.error(error);
  //       toast.error(error.response?.data?.message || "Failed to delete school");
  //       return false;
  //     }
  //   };

  return (
    <NewsContext.Provider
      value={{
        fetchNewsBySchool,
        newsBySchool,
        fetchNewsById,
        newsById,
      }}
    >
      {children}
    </NewsContext.Provider>
  );
};

export const useNews = () => useContext(NewsContext);
