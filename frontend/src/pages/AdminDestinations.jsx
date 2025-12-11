// Admin Destinations CRUD page

import { useEffect, useState } from "react";
import api from "../api/axios";

export default function AdminDestinations() {
  const [destinations, setDestinations] = useState([]);
  const [editingId, setEditingId] = useState(null);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [imageFile, setImageFile] = useState(null);

  const fetchDestinations = async () => {
    try {
      const res = await api.get("/api/destinations");
      setDestinations(res.data);
    } catch (err) {
      console.error("Error loading destinations:", err);
    }
  };

  useEffect(() => {
    fetchDestinations();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", name);                 // ✔ NAME FIELD FIXED
    formData.append("description", description);
    formData.append("price", price);
    if (imageFile) formData.append("image", imageFile);

    try {
      const authHeader = {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      };

      if (editingId) {
        await api.put(`/api/destinations/${editingId}`, formData, authHeader);
      } else {
        await api.post("/api/destinations", formData, authHeader);
      }

      resetForm();
      fetchDestinations();
    } catch (err) {
      console.error("Save error:", err);
      alert("Failed to save destination. Check backend console.");
    }
  };

  const handleEdit = (d) => {
    setEditingId(d.id);
    setName(d.name);
    setDescription(d.description);
    setPrice(d.price);
    setImageFile(null);
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this destination?")) return;

    try {
      await api.delete(`/api/destinations/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });

      fetchDestinations();
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  const resetForm = () => {
    setEditingId(null);
    setName("");
    setDescription("");
    setPrice("");
    setImageFile(null);
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Manage Destinations</h1>

      <div className="bg-white p-4 rounded shadow mb-6">
        <h2 className="text-xl font-semibold">
          {editingId ? "Edit Destination" : "Add Destination"}
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">

          <input
            className="border p-2 rounded"
            placeholder="Destination Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <textarea
            className="border p-2 rounded"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />

          <input
            className="border p-2 rounded"
            type="number"
            placeholder="Price (€)"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />

          <input
            type="file"
            accept="image/*"
            className="border p-2 rounded"
            onChange={(e) => setImageFile(e.target.files[0])}
          />

          <button className="bg-blue-600 text-white py-2 rounded">
            {editingId ? "Update" : "Create Destination"}
          </button>

        </form>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {destinations.map((d) => (
          <div key={d.id} className="bg-white shadow rounded p-3">
            {d.imageUrl && (
              <img
                src={`http://localhost:5000${d.imageUrl}`}
                className="w-full h-40 object-cover rounded"
              />
            )}

            <h3 className="text-xl font-bold mt-2">{d.name}</h3>
            <p>{d.description}</p>
            <p className="font-semibold">€{d.price}</p>

            <div className="flex gap-2 mt-3">
              <button
                onClick={() => handleEdit(d)}
                className="bg-yellow-500 text-white px-3 py-1 rounded"
              >
                Edit
              </button>

              <button
                onClick={() => handleDelete(d.id)}
                className="bg-red-600 text-white px-3 py-1 rounded"
              >
                Delete
              </button>
            </div>

          </div>
        ))}
      </div>
    </div>
  );
}
