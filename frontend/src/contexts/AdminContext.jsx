import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const AdminContext = createContext();

export const AdminProvider = ({ children }) => {
  const [admin, setAdmin] = useState(null);
  const [adminRole, setAdminRole] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  // Load admin from localStorage on mount
  useEffect(() => {
    const savedAdmin = localStorage.getItem("admin");
    const savedRole = localStorage.getItem("role");
    const savedToken = localStorage.getItem("token");

    if (savedAdmin && savedRole && savedToken) {
      setAdmin(JSON.parse(savedAdmin));
      setAdminRole(savedRole);
      setToken(savedToken);
    }

    setLoading(false); // done loading
  }, []);

  // ===== Login =====
  const login = async (formData) => {
    setLoading(true);
    try {
      const url = `${import.meta.env.VITE_BASE_URL}/api/admin/login`;
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        toast.error(data.message || "Login failed");
        return null;
      }

      // Save to state & localStorage
      localStorage.setItem("token", data.token);
      localStorage.setItem("role", data.admin.role);
      localStorage.setItem("admin", JSON.stringify(data.admin));

      setToken(data.token);
      setAdminRole(data.admin.role);
      setAdmin(data.admin);

      toast.success("Login successful 🎉");
      return data.admin;
    } catch (err) {
      toast.error("Server error. Try again later");
      return null;
    } finally {
      setLoading(false);
    }
  };

  // ===== Logout =====
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("admin");

    setAdmin(null);
    setAdminRole(null);
    setToken(null);
    navigate("/admin/login");
  };

  return (
    <AdminContext.Provider
      value={{ admin, adminRole, token, loading, login, logout }}
    >
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => useContext(AdminContext);
