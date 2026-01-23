import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

const HomeworkContext = createContext();

export const HomeworkProvider = ({ children }) => {
  const [homework, setHomework] = useState([]);
  const [homeworkByClass, setHomeworkByClass] = useState([]);
  const [studentHomeworkByClass, setStudentHomeworkByClass] = useState([]);
  const [homeworkById, setHomeworkById] = useState({});
  const [loading, setLoading] = useState(true);

  /* ===== Fetch all homeworks ===== */
  useEffect(() => {
    const fetchHomeworks = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_BASE_URL}/api/homework`,
        );
        if (!res.ok) throw new Error("Failed to fetch");
        const data = await res.json();
        setHomework(data);
      } catch (err) {
        setHomework([]);
        toast.error("Failed to load Homework");
      } finally {
        setLoading(false);
      }
    };

    fetchHomeworks();
  }, []);

  /* ===== Fetch  homeworks By Class For Teacher ===== */

  const fetchHomeworksByClass = async (className, teacher) => {
    try {
      const res = await fetch(
        `${
          import.meta.env.VITE_BASE_URL
        }/api/homework/${className}?teacher=${teacher}`,
      );
      if (!res.ok) throw new Error("Failed to fetch");
      const data = await res.json();
      setHomeworkByClass(data);
    } catch (err) {
      setHomeworkByClass([]);
      toast.error("Failed to load Homework");
    } finally {
      setLoading(false);
    }
  };
  // ======================Fetch Home Work By Class For Student==================
  /* ===== Fetch  homeworks By Class For Student ===== */

  const fetchHomeworksByClassForStudent = async (className, school) => {
    try {
      const res = await fetch(
        `${
          import.meta.env.VITE_BASE_URL
        }/api/homework/classes/${className}?school=${encodeURIComponent(
          school,
        )}`,
      );
      if (!res.ok) throw new Error("Failed to fetch");
      const data = await res.json();

      setStudentHomeworkByClass(data);
      return data;
    } catch (err) {
      setStudentHomeworkByClass([]);
      toast.error("Failed to load Homework");
    } finally {
      setLoading(false);
    }
  };

  /* ===== Add Homework ===== */
  const AddHomeWork = async (formData) => {
    try {
      const res = await fetch(`${import.meta.env.VITE_BASE_URL}/api/homework`, {
        method: "POST",
        body: formData, // FormData, so no 'Content-Type' header
      });

      const data = await res.json();
      if (!res.ok) {
        toast.error(data.message || "Failed to create homework");
        return null;
      }

      setHomework((prev) => [...prev, data]);
      return data;
    } catch (err) {
      toast.error("Server error. Try again later");
      return null;
    }
  };

  // ==============fetch by Id=========================

  const fetchHomeworksById = async (id) => {
    try {
      console.log(id, "context");
      const res = await fetch(
        `${import.meta.env.VITE_BASE_URL}/api/homework/single/${id}`,
      );
      if (!res.ok) throw new Error("Failed to fetch");
      const data = await res.json();
      setHomeworkById(data);
    } catch (err) {
      setHomeworkById([]);
      toast.error("Failed to load Homework");
    } finally {
      setLoading(false);
    }
  };

  return (
    <HomeworkContext.Provider
      value={{
        homework,
        loading,
        AddHomeWork,
        homeworkByClass,
        fetchHomeworksByClass,
        fetchHomeworksById,
        homeworkById,
        fetchHomeworksByClassForStudent,
        studentHomeworkByClass,
      }}
    >
      {children}
    </HomeworkContext.Provider>
  );
};

export const useHomework = () => useContext(HomeworkContext);
