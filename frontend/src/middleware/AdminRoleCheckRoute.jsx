import { Navigate } from "react-router-dom";
import { useAdmin } from "../contexts/AdminContext";
import Splash from "../pages/Splash";

const AdminRoleCheckRoute = ({ allowedRoles, children }) => {
  const { admin, loading } = useAdmin();

  if (loading) return <Splash loading={loading} />;

  if (!admin || !allowedRoles.includes(admin.role)) {
    return <Navigate to="/admin/login" replace />;
  }

  return children;
};

export default AdminRoleCheckRoute;
