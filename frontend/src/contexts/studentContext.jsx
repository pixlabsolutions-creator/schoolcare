import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useAuth } from "./AuthContext";

const StudentContext = createContext();

export const StudentProvider = ({ children }) => {
  const [students, setStudents] = useState([]);
  const [studentsBySchool, setStudentsBySchool] = useState([]);

  const [classStudents, setClassStudents] = useState([]);

  const [loading, setLoading] = useState(true);

  const { user } = useAuth();

  //  fetch student
  useEffect(() => {
    if (!user?.school) return;

    const fetchStudent = async (school) => {
      try {
        const res = await fetch(
          `${
            import.meta.env.VITE_BASE_URL
          }/api/student?school=${encodeURIComponent(school)}`,
        );

        if (!res.ok) throw new Error("Failed to fetch");

        const data = await res.json();

        setStudents(data);
      } catch (err) {
        setStudents([]);

        toast.error("Failed to load classes");
      } finally {
        setLoading(false);
      }
    };

    fetchStudent(user?.school);
  }, [user?.school]);
  //  fetch School Wise student

  const fetchStudentBySchool = async (school) => {
    try {
      const res = await fetch(
        `${
          import.meta.env.VITE_BASE_URL
        }/api/student?school=${encodeURIComponent(school)}`,
      );

      if (!res.ok) throw new Error("Failed to fetch");

      const data = await res.json();

      setStudentsBySchool(data);
    } catch (err) {
      setStudentsBySchool([]);

      toast.error("Failed to load classes");
    } finally {
      setLoading(false);
    }
  };

  // ================fatch Student By Class=================

  const fetchClassWiseStudent = async (classId, school) => {
    try {
      const res = await fetch(
        `${
          import.meta.env.VITE_BASE_URL
        }/api/student/class/${classId}?school=${encodeURIComponent(school)}`,
      );

      if (!res.ok) throw new Error("Failed to fetch");

      const data = await res.json();
      setClassStudents(data);
    } catch (err) {
      setClassStudents([]);
      toast.error("Failed to load classes");
    } finally {
      setLoading(false);
    }
  };

  return (
    <StudentContext.Provider
      value={{
        students,
        loading,
        setStudents,
        fetchClassWiseStudent,
        classStudents,
        fetchStudentBySchool,
        studentsBySchool,
      }}
    >
      {children}
    </StudentContext.Provider>
  );
};

export const useStudent = () => useContext(StudentContext);
