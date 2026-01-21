import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

const SchoolContext = createContext();
const baseUrl = import.meta.env.VITE_BASE_URL;

export const SchoolProvider = ({ children }) => {
  const [schools, setSchools] = useState([]);
  const [schoolById, setSchoolById] = useState({});
  const [openModal, setOpenModal] = useState(false);
  const [loading, setLoading] = useState(true);

  /* ===== Fetch all homeworks ===== */
  useEffect(() => {
    const fetchSchools = async () => {
      try {
        const res = await fetch(`${baseUrl}/api/schools`);
        if (!res.ok) throw new Error("Failed to fetch");
        const data = await res.json();
        setSchools(data.data);
      } catch (err) {
        setSchools([]);
        toast.error("Failed to load Schools");
      } finally {
        setLoading(false);
      }
    };

    fetchSchools();
  }, []);

  /* ===== Add Homework ===== */
  const addSchool = async (formData, image) => {
    try {
      const data = new FormData();
      Object.keys(formData).forEach((key) => {
        data.append(key, formData[key]);
      });
      if (image) data.append("image", image);

      const res = await axios.post(`${baseUrl}/api/schools`, data);

      setSchools((prev) => [...prev, res.data.data]);
      toast.success("School added successfully");
      return true;
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to add school");
      return false;
    }
  };
  // ==============fetch by Id=========================

  const fetchSchoolById = async (id) => {
    try {
      const res = await fetch(`${baseUrl}/api/schools/${id}`);
      if (!res.ok) throw new Error("Failed to fetch");
      const data = await res.json();
      setSchoolById(data);
    } catch (err) {
      setSchoolById([]);
      toast.error("Failed to load School");
    } finally {
      setLoading(false);
    }
  };
  // ============================Delete School========================

  const deleteSchool = async (id) => {
    try {
      console.log(id);
      const res = await axios.delete(`${baseUrl}/api/schools/${id}`);

      setSchools((prev) => prev.filter((school) => school._id !== id));
      setOpenModal(false);
      toast.success("School deleted successfully");
      return true;
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Failed to delete school");
      return false;
    }
  };

  return (
    <SchoolContext.Provider
      value={{
        schools,
        schoolById,
        fetchSchoolById,
        addSchool,
        loading,
        deleteSchool,
        openModal,
        setOpenModal,
      }}
    >
      {children}
    </SchoolContext.Provider>
  );
};

export const useSchool = () => useContext(SchoolContext);
