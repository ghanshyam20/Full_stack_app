import { useEffect, useState } from "react";
import usersAPI from "../api/usersAPI";

export default function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadUsers();
  }, []);

  async function loadUsers() {
    try {
      const data = await usersAPI.getAll();
      setUsers(data);
    } catch (err) {
      console.error("Failed to load users:", err);
    }
    setLoading(false);
  }

  // DELETE USER
  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this user?")) return;

    try {
      await usersAPI.delete(id);
      setUsers(users.filter((u) => u.id !== id));
    } catch (err) {
      alert("Failed to delete user.");
    }
  };

  // MAKE ADMIN
  const makeAdmin = async (id) => {
    try {
      await usersAPI.makeAdmin(id);
      alert("User is now an admin.");
      loadUsers(); // refresh
    } catch (err) {
      alert("Failed to update role.");
    }
  };

  if (loading) {
    return <div className="p-6 text-xl">Loading users...</div>;
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold mb-6">Manage Users</h2>

      <table className="w-full border-collapse border">
        <thead>
          <tr className="bg-gray-200 text-left">
            <th className="p-3 border">ID</th>
            <th className="p-3 border">Email</th>
            <th className="p-3 border">Role</th>
            <th className="p-3 border">Actions</th>
          </tr>
        </thead>

        <tbody>
          {users.map((u) => (
            <tr key={u.id} className="border hover:bg-gray-50">
              <td className="p-3 border">{u.id}</td>
              <td className="p-3 border">{u.email}</td>
              <td className="p-3 border font-semibold">
                {u.role === "admin" ? (
                  <span className="text-green-600">Admin</span>
                ) : (
                  <span className="text-blue-600">User</span>
                )}
              </td>

              <td className="p-3 border flex gap-3">
                {/* MAKE ADMIN BUTTON */}
                {u.role !== "admin" && (
                  <button
                    onClick={() => makeAdmin(u.id)}
                    className="bg-purple-600 text-white px-3 py-1 rounded hover:bg-purple-700"
                  >
                    Make Admin
                  </button>
                )}

                {/* DELETE BUTTON */}
                <button
                  onClick={() => handleDelete(u.id)}
                  className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
