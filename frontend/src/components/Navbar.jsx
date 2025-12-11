import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

// Simple Navbar that shows Login/Register OR Logout depending on token
export default function Navbar() {
  const [loggedIn, setLoggedIn] = useState(false);
  const navigate = useNavigate();

  // Check token on page load
  useEffect(() => {
    const token = localStorage.getItem("token");
    setLoggedIn(!!token); // true if token exists
  }, []);

  // Logout function
  const handleLogout = () => {
    localStorage.removeItem("token");
    setLoggedIn(false);
    navigate("/"); // redirect home
  };

  // 🔥 Reusable classy hover effect
  const navLink = "relative group no-underline";

  const hoverBar = (
    <span className="absolute left-0 -bottom-1 h-[2px] w-0 bg-white transition-all duration-300 group-hover:w-full"></span>
  );

  return (
    <nav className="bg-blue-700 text-white px-6 py-4 flex justify-between items-center">
      {/* Website Logo */}
      <Link to="/" className="text-xl font-bold">
        TravelX
      </Link>

      {/* Navigation Links */}
      <div className="flex gap-6 items-center">

        <Link to="/" className={navLink}>
          Home
          {hoverBar}
        </Link>

        <Link to="/destinations" className={navLink}>
          Destinations
          {hoverBar}
        </Link>

        {/* ⭐ SHOW ONLY WHEN USER LOGGED IN */}
        {loggedIn && (
          <Link to="/my-bookings" className={navLink}>
            My Bookings
            {hoverBar}
          </Link>
        )}

        {/* If user NOT logged in → show Login + Sign Up */}
        {!loggedIn && (
          <>
            <Link to="/login" className={navLink}>
              Login
              {hoverBar}
            </Link>

            <Link to="/register" className={navLink}>
              Sign Up
              {hoverBar}
            </Link>
          </>
        )}

        {/* If user IS logged in → show Logout button */}
        {loggedIn && (
          <button
            onClick={handleLogout}
            className="bg-red-500 px-3 py-1 rounded hover:bg-red-600"
          >
            Logout
          </button>
        )}
      </div>
    </nav>
  );
}
