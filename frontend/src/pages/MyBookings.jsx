import { useEffect, useState } from "react";
import bookingsAPI from "../api/bookingsAPI";

export default function MyBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  // Edit modal
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({
    name: "",
    email: "",
    travelers: "",
    notes: "",
    date: "",
  });

  // Cancel modal
  const [cancelId, setCancelId] = useState(null);

  const loadBookings = async () => {
    try {
      const data = await bookingsAPI.my();
      setBookings(data);
    } catch (err) {
      console.error("Error loading bookings:", err);
    } finally {
      setLoading(false);
    }
  };

  const openEdit = (b) => {
    setEditing(b.id);
    setForm({
      name: b.name,
      email: b.email,
      travelers: b.travelers,
      notes: b.notes || "",
      date: b.date,
    });
  };

  const submitEdit = async () => {
    try {
      await bookingsAPI.update(editing, form);
      alert("Booking updated!");
      setEditing(null);
      loadBookings();
    } catch (err) {
      console.error("Update error:", err);
    }
  };

  const confirmCancel = async () => {
    try {
      await bookingsAPI.delete(cancelId);
      setBookings((prev) => prev.filter((b) => b.id !== cancelId));
      setCancelId(null);
    } catch (err) {
      console.error("Cancel error:", err);
    }
  };

  useEffect(() => {
    loadBookings();
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6">My Bookings</h2>

      {bookings.length === 0 && (
        <p className="text-gray-600 text-center">You have no bookings.</p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {bookings.map((b) => (
          <div key={b.id} className="border rounded-lg p-4 shadow bg-white">
            <img
              src={`http://localhost:5000${b.Destination.imageUrl}`}
              className="w-full h-40 object-cover rounded"
            />

            <h3 className="text-xl font-semibold mt-3">{b.Destination.name}</h3>
            <p className="mt-2 font-bold">Booking Date: {b.date}</p>

            <div className="flex gap-3 mt-4">
              <button
                onClick={() => openEdit(b)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded"
              >
                Edit
              </button>

              <button
                onClick={() => setCancelId(b.id)}
                className="bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded"
              >
                Cancel
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* CANCEL MODAL */}
      {cancelId && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center">
          <div className="bg-white p-6 rounded shadow-lg w-80">
            <h3 className="text-xl font-bold mb-3">Cancel Booking?</h3>
            <p className="text-gray-600 mb-4">
              This action cannot be undone.
            </p>

            <div className="flex justify-between">
              <button
                className="bg-gray-400 px-3 py-2 rounded"
                onClick={() => setCancelId(null)}
              >
                Close
              </button>
              <button
                className="bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded"
                onClick={confirmCancel}
              >
                Yes, Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* EDIT MODAL */}
      {editing && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center">
          <div className="bg-white p-6 rounded shadow-lg w-96">
            <h3 className="text-xl font-bold mb-4">Edit Booking</h3>

            <input
              className="border p-2 w-full mb-2"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="Name"
            />

            <input
              className="border p-2 w-full mb-2"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              placeholder="Email"
            />

            <input
              type="number"
              className="border p-2 w-full mb-2"
              value={form.travelers}
              onChange={(e) =>
                setForm({ ...form, travelers: e.target.value })
              }
              placeholder="Travelers"
            />

            <textarea
              className="border p-2 w-full mb-2"
              value={form.notes}
              onChange={(e) => setForm({ ...form, notes: e.target.value })}
              placeholder="Notes"
            />

            <input
              type="date"
              className="border p-2 w-full mb-4"
              value={form.date}
              onChange={(e) => setForm({ ...form, date: e.target.value })}
            />

            <div className="flex justify-between">
              <button
                className="bg-gray-400 px-3 py-2 rounded"
                onClick={() => setEditing(null)}
              >
                Close
              </button>
              <button
                className="bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded"
                onClick={submitEdit}
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
