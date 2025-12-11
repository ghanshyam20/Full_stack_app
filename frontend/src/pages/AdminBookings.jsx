import { useEffect, useState } from "react";
import bookingsAPI from "../api/bookingsAPI";

export default function AdminBookings() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    loadBookings();
  }, []);

  const loadBookings = async () => {
    try {
      const data = await bookingsAPI.getAll();
      setBookings(data);
    } catch (err) {
      console.error("Error loading bookings:", err);
    }
  };

  const deleteBooking = async (id) => {
    if (!confirm("Delete this booking?")) return;

    try {
      await bookingsAPI.delete(id);
      loadBookings();
      alert("Booking deleted.");
    } catch (err) {
      console.error("Delete error:", err);
      alert("Failed to delete booking.");
    }
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-center">All Bookings</h2>

      {bookings.length === 0 ? (
        <p className="text-center text-gray-600">No bookings found.</p>
      ) : (
        <table className="w-full border shadow-md">
          <thead>
            <tr className="bg-gray-200 text-left">
              <th className="p-3 border">Full Name</th>
              <th className="p-3 border">Email</th>
              <th className="p-3 border">Phone</th>
              <th className="p-3 border">Travelers</th>
              <th className="p-3 border">Notes</th>
              <th className="p-3 border">Destination</th>
              <th className="p-3 border">Date</th>
              <th className="p-3 border">Actions</th>
            </tr>
          </thead>

          <tbody>
            {bookings.map((b) => (
              <tr key={b.id} className="border-b hover:bg-gray-50">
                <td className="p-3 border">{b.name}</td>
                <td className="p-3 border">{b.email}</td>
                <td className="p-3 border">{b.phone || "-"}</td>
                <td className="p-3 border">{b.travelers}</td>
                <td className="p-3 border">{b.notes || "-"}</td>
                <td className="p-3 border">{b.Destination?.name}</td>
                <td className="p-3 border">{b.date}</td>

                <td className="p-3 border">
                  <button
                    onClick={() => deleteBooking(b.id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
