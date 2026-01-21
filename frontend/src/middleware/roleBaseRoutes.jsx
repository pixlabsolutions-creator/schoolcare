import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const RoleBasedRoute = ({ allowedRoles, children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) return <div>Loading...</div>;

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (!allowedRoles.includes(user?.userRole)) {
    const redirectMap = {
      teacher: "/teacher",
      student: "/student",
      admin: "/admin",
    };

    return <Navigate to={redirectMap[user?.userRole] || "/login"} replace />;
  }

  return children;
};

export default RoleBasedRoute;
