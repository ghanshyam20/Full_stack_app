import { useEffect, useState } from "react";
import destinationsAPI from "../api/destinations";

export default function AdminDashboard() {
  const [destinations, setDestinations] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [newDest, setNewDest] = useState({
    title: "",
    description: "",
    price: "",
  });

  const [editDest, setEditDest] = useState(null);

  // Load destinations
  const loadDestinations = async () => {
    const data = await destinationsAPI.getAll();
    setDestinations(data);
  };

  useEffect(() => {
    loadDestinations();
  }, []);

  // ADD destination
  const handleAdd = async () => {
    await destinationsAPI.create(newDest);
    setShowAddModal(false);
    setNewDest({ title: "", description: "", price: "" });
    loadDestinations();
  };

  // DELETE destination
  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete?")) return;

    await destinationsAPI.remove(id);
    loadDestinations();
  };

  // UPDATE destination
  const handleUpdate = async () => {
    await destinationsAPI.update(editDest.id, editDest);
    setShowEditModal(false);
    setEditDest(null);
    loadDestinations();
  };

  return (
    <div className="p-6">
      <h1 className="text-4xl font-bold mb-6 text-center">Admin Dashboard</h1>

      {/* Add Button */}
      <div className="flex justify-end mb-4">
        <button
          onClick={() => setShowAddModal(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
        >
          + Add New Destination
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-white p-4 rounded shadow">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-200 text-left">
              <th className="p-2 border">ID</th>
              <th className="p-2 border">Title</th>
              <th className="p-2 border">Description</th>
              <th className="p-2 border">Price</th>
              <th className="p-2 border">Actions</th>
            </tr>
          </thead>

          <tbody>
            {destinations.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center p-4 text-gray-500">
                  No destinations found.
                </td>
              </tr>
            ) : (
              destinations.map((d) => (
                <tr key={d.id} className="border-b hover:bg-gray-50">
                  <td className="p-2 border">{d.id}</td>
                  <td className="p-2 border">{d.title}</td>
                  <td className="p-2 border">{d.description}</td>
                  <td className="p-2 border">{d.price} €</td>
                  <td className="p-2 border flex gap-2">
                    <button
                      className="bg-yellow-500 px-3 py-1 rounded text-white"
                      onClick={() => {
                        setEditDest(d);
                        setShowEditModal(true);
                      }}
                    >
                      Edit
                    </button>

                    <button
                      className="bg-red-600 px-3 py-1 rounded text-white"
                      onClick={() => handleDelete(d.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* ADD MODAL */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded w-full max-w-md">
            <h2 className="text-2xl font-bold mb-4">Add Destination</h2>

            <input
              type="text"
              placeholder="Title"
              className="w-full p-2 border rounded mb-2"
              value={newDest.title}
              onChange={(e) => setNewDest({ ...newDest, title: e.target.value })}
            />

            <textarea
              placeholder="Description"
              className="w-full p-2 border rounded mb-2"
              value={newDest.description}
              onChange={(e) =>
                setNewDest({ ...newDest, description: e.target.value })
              }
            ></textarea>

            <input
              type="number"
              placeholder="Price"
              className="w-full p-2 border rounded mb-2"
              value={newDest.price}
              onChange={(e) => setNewDest({ ...newDest, price: e.target.value })}
            />

            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowAddModal(false)}
                className="px-3 py-1 bg-gray-500 text-white rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleAdd}
                className="px-3 py-1 bg-blue-600 text-white rounded"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* EDIT MODAL */}
      {showEditModal && editDest && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded w-full max-w-md">
            <h2 className="text-2xl font-bold mb-4">Edit Destination</h2>

            <input
              type="text"
              className="w-full p-2 border rounded mb-2"
              value={editDest.title}
              onChange={(e) =>
                setEditDest({ ...editDest, title: e.target.value })
              }
            />

            <textarea
              className="w-full p-2 border rounded mb-2"
              value={editDest.description}
              onChange={(e) =>
                setEditDest({ ...editDest, description: e.target.value })
              }
            ></textarea>

            <input
              type="number"
              className="w-full p-2 border rounded mb-2"
              value={editDest.price}
              onChange={(e) =>
                setEditDest({ ...editDest, price: e.target.value })
              }
            />

            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowEditModal(false)}
                className="px-3 py-1 bg-gray-500 text-white rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdate}
                className="px-3 py-1 bg-green-600 text-white rounded"
              >
                Update
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
