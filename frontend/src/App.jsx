// App.jsx
// Controls all routes + shows Navbar and Footer on every page

import { BrowserRouter, Routes, Route } from "react-router-dom";

// Public pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Destinations from "./pages/Destinations";
import DestinationDetails from "./pages/DestinationDetails";

// Booking pages
import BookingForm from "./pages/BookingForm";
import MyBookings from "./pages/MyBookings"; // ⭐ User booking history

// Admin pages
import Admin from "./pages/Admin";
import AdminDestinations from "./pages/AdminDestinations";
import AdminUsers from "./pages/AdminUsers";
import AdminBookings from "./pages/AdminBookings";

// Layout components
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

// Protect admin routes
import ProtectedAdminRoute from "./components/ProtectedAdminRoute";

// Scroll to top on every route change
function ScrollToTop() {
  window.scrollTo(0, 0);
  return null;
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Navbar />

      <Routes>

        {/* ---------- PUBLIC ROUTES ---------- */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Destinations List + Details */}
        <Route path="/destinations" element={<Destinations />} />
        <Route path="/destinations/:id" element={<DestinationDetails />} />

        {/* ---------- USER BOOKING ROUTES ---------- */}
        <Route path="/book/:id" element={<BookingForm />} />
        <Route path="/my-bookings" element={<MyBookings />} />

        {/* ---------- ADMIN ROUTES ---------- */}
        <Route
          path="/admin"
          element={
            <ProtectedAdminRoute>
              <Admin />
            </ProtectedAdminRoute>
          }
        />

        <Route
          path="/admin/destinations"
          element={
            <ProtectedAdminRoute>
              <AdminDestinations />
            </ProtectedAdminRoute>
          }
        />

        <Route
          path="/admin/users"
          element={
            <ProtectedAdminRoute>
              <AdminUsers />
            </ProtectedAdminRoute>
          }
        />

        <Route
          path="/admin/bookings"
          element={
            <ProtectedAdminRoute>
              <AdminBookings />
            </ProtectedAdminRoute>
          }
        />

      </Routes>

      <Footer />
    </BrowserRouter>
  );
}
