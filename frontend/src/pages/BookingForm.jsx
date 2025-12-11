import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import bookingsAPI from "../api/bookingsAPI";

export default function BookingForm() {
  const { id } = useParams(); // destinationId
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    travelers: 1,
    date: "",
    notes: "",
  });

  const onChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submitBooking = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Please login first!");
        return navigate("/login");
      }

      await bookingsAPI.create({
        destinationId: id,
        name: form.name,
        email: form.email,
        travelers: Number(form.travelers),
        date: form.date,
        notes: form.notes,
      });

      alert("Booking successful!");
      navigate("/my-bookings");
    } catch (error) {
      console.error(error);
      alert("Booking failed.");
    }
  };

  return (
    <div className="p-6 max-w-lg mx-auto">
      <h2 className="text-3xl font-bold mb-6">Book Your Trip</h2>

      <form onSubmit={submitBooking} className="space-y-4">
        
        <div>
          <label className="block font-medium">Full Name</label>
          <input
            type="text"
            required
            name="name"
            value={form.name}
            onChange={onChange}
            className="border p-2 w-full rounded"
          />
        </div>

        <div>
          <label className="block font-medium">Email</label>
          <input
            type="email"
            required
            name="email"
            value={form.email}
            onChange={onChange}
            className="border p-2 w-full rounded"
          />
        </div>

        <div>
          <label className="block font-medium">Number of Travelers</label>
          <input
            type="number"
            min="1"
            required
            name="travelers"
            value={form.travelers}
            onChange={onChange}
            className="border p-2 w-full rounded"
          />
        </div>

        <div>
          <label className="block font-medium">Select Date</label>
          <input
            type="date"
            required
            name="date"
            value={form.date}
            onChange={onChange}
            className="border p-2 w-full rounded"
          />
        </div>

        <div>
          <label className="block font-medium">Additional Notes (Optional)</label>
          <textarea
            name="notes"
            value={form.notes}
            onChange={onChange}
            className="border p-2 w-full rounded"
          ></textarea>
        </div>

        <button className="bg-blue-600 text-white px-5 py-2 rounded">
          Book Now
        </button>
      </form>
    </div>
  );
}
