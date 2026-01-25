import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [teachers, setTeachers] = useState([]);
  const [allTeachers, setAllTeachers] = useState([]);
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [openModal, setOpenModal] = useState(false);
  const [userRole, setUserRole] = useState(
    localStorage.getItem("userRole") || null,
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTeachersByAdmin = async (school) => {
      try {
        const url = `${import.meta.env.VITE_BASE_URL}/api/user`;

        const res = await fetch(url);

        if (!res.ok) throw new Error("Unauthorized");

        const data = await res.json();

        setAllTeachers(data);
      } catch (err) {
        setAllTeachers(null);
      }
    };
    fetchTeachersByAdmin();
  }, [token]);

  const fetchTeachersBySchool = async (school) => {
    try {
      const url = `${import.meta.env.VITE_BASE_URL}/api/user/${school}`;

      const res = await fetch(url);

      if (!res.ok) throw new Error("Unauthorized");

      const data = await res.json();

      setTeachers(data);
    } catch (err) {
      setTeachers(null);
    }
  };

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const url =
          userRole === "teacher"
            ? `${import.meta.env.VITE_BASE_URL}/api/user/profile`
            : `${import.meta.env.VITE_BASE_URL}/api/student/profile`;

        const res = await fetch(url, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!res.ok) throw new Error("Unauthorized");

        const data = await res.json();
        setUser(data.user || data);
      } catch (err) {
        localStorage.removeItem("token");
        localStorage.removeItem("userRole");
        setToken(null);
        setUserRole(null);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    if (token && userRole) {
      setLoading(true);
      fetchProfile();
    } else {
      setUser(null);
      setLoading(false);
    }
  }, [token, userRole]);

  // ===== Login =====
  const login = async (formData) => {
    setLoading(true);
    try {
      const url =
        formData.userRole === "teacher"
          ? `${import.meta.env.VITE_BASE_URL}/api/user/login`
          : `${import.meta.env.VITE_BASE_URL}/api/student/login`;

      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      console.log(formData);
      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        toast.error(data.message || "Login failed");
        return null;
      }

      // Save token & role first
      localStorage.setItem("token", data.token);
      localStorage.setItem("userRole", formData.userRole);
      setToken(data.token);
      setUserRole(formData.userRole);
      setUser(data.user || data); // student API may return user directly

      toast.success("Login successful 🎉");
      return data.user || data;
    } catch (err) {
      toast.error("Server error. Try again later");
      return null;
    } finally {
      setLoading(false);
    }
  };

  // ===== Logout =====
  const logout = async () => {
    setLoading(true);
    try {
      const url =
        userRole === "teacher"
          ? `${import.meta.env.VITE_BASE_URL}/api/user/logout`
          : `${import.meta.env.VITE_BASE_URL}/api/student/logout`;

      const res = await fetch(url, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) toast.error(data.message || "Logout failed");
      else toast.success("Logout successful 🎉");
    } catch (err) {
      toast.error("Server error");
    } finally {
      localStorage.removeItem("token");
      localStorage.removeItem("userRole");
      setToken(null);
      setUserRole(null);
      setUser(null);
      setLoading(false);
    }
  };

  const deleteTeacher = async (id) => {
    try {
      const res = await axios.delete(
        `${import.meta.env.VITE_BASE_URL}/api/user/${id}`,
      );

      toast.success("Teacher deleted successfully");
      setOpenModal(false);
      setTeachers((prev) => prev.filter((user) => user._id !== id));
    } catch (error) {
      toast.error("Something went wrong");
      console.error(error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        userRole,
        token,
        login,
        logout,
        loading,
        fetchTeachersBySchool,
        teachers,
        allTeachers,
        deleteTeacher,
        openModal,
        setOpenModal,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
