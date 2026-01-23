import axios from "axios";
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

  // ==================Like & View =============================

  // const updateLike = async (id, userId) => {
  //   try {
  //     const { data } = await axios.put(
  //       `${import.meta.env.VITE_BASE_URL}/api/homework/like/${id}?userId=${userId}`,
  //     );
  //     toast.success(data.message);
  //   } catch (error) {
  //     toast.error("Failed to Like Homework");
  //   }
  // };

  const updateLike = async (id, userId) => {
    try {
      setHomeworkById((prev) =>
        prev.map((hw) => {
          if (hw._id === id) {
            const liked = hw.like.likerId.includes(userId);
            return {
              ...hw,
              like: {
                ...hw.like,
                likerId: liked
                  ? hw.like.likerId.filter((u) => u !== userId)
                  : [...hw.like.likerId, userId],
              },
            };
          }
          return hw;
        }),
      );

      // Backend update
      const { data } = await axios.put(
        `${import.meta.env.VITE_BASE_URL}/api/homework/like/${id}?userId=${userId}`,
      );
    } catch (error) {
      console.error("Failed to Like Homework");
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
        updateLike,
      }}
    >
      {children}
    </HomeworkContext.Provider>
  );
};

export const useHomework = () => useContext(HomeworkContext);
