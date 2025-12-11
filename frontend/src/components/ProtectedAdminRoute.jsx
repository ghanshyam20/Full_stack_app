import { Navigate } from "react-router-dom";

export default function ProtectedAdminRoute({ children }) {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  //  Not logged in → go to login
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  //  Logged in but NOT admin → go to homepage
  if (role !== "admin") {
    return <Navigate to="/" replace />;
  }

  // Logged in + admin → allow page
  return children;
}
