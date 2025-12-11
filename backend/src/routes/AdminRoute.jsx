import { Navigate } from "react-router-dom";

const AdminRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  // Not logged in → redirect to login
  if (!token) return <Navigate to="/login" />;

  // Logged in but NOT admin → redirect to home
  if (role !== "admin") return <Navigate to="/" />;

  // Admin → allow access
  return children;
};

export default AdminRoute;
