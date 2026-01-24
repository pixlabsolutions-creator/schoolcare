import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useAuth } from "./AuthContext";
import axios from "axios";

const StudentContext = createContext();

export const StudentProvider = ({ children }) => {
  const [students, setStudents] = useState([]);
  const [studentsAdmin, setStudentsAdmin] = useState([]);
  const [studentsBySchool, setStudentsBySchool] = useState([]);
  const [classStudents, setClassStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const [openModal, setOpenModal] = useState(false);
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

  useEffect(() => {
    const fetchALlStudentForAdmin = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_BASE_URL}/api/student/admin`,
        );

        if (!res.ok) throw new Error("Failed to fetch");

        const data = await res.json();

        setStudentsAdmin(data);
      } catch (err) {
        setStudentsAdmin([]);

        toast.error("Failed to load classes");
      } finally {
        setLoading(false);
      }
    };

    fetchALlStudentForAdmin();
  }, []);

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

  const deleteStudent = async (id) => {
    try {
      const res = await axios.delete(
        `${import.meta.env.VITE_BASE_URL}/api/student/${id}`,
      );

      if (!res.data.success) {
        toast.error("Student delete failed");
        return;
      }

      setStudents((prev) => prev.filter((student) => student._id !== id));
      setClassStudents((prev) => prev.filter((s) => s._id !== id));
      setOpenModal(false);
      toast.success(res.data.message);
    } catch (error) {
      console.error(error);
      toast.error("Server error while deleting");
    }
  };

  const statusStudent = async (id, status) => {
    try {
      const res = await axios.put(
        `${import.meta.env.VITE_BASE_URL}/api/student/status/${id}?status=${status}`,
      );

      const updatedStudent = res.data.student;

      setStudents((prev) =>
        prev.map((s) => (s._id === id ? updatedStudent : s)),
      );
      setClassStudents((prev) =>
        prev.map((s) => (s._id === id ? updatedStudent : s)),
      );
      setOpenModal(false);
      toast.success("Updated");
    } catch (error) {
      console.error(error);
      toast.error("Update failed");
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
        deleteStudent,
        openModal,
        setOpenModal,
        statusStudent,
        studentsAdmin,
      }}
    >
      {children}
    </StudentContext.Provider>
  );
};

export const useStudent = () => useContext(StudentContext);
