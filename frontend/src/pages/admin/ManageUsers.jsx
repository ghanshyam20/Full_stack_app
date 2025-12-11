import { useEffect, useState } from "react";
import usersAPI from "../../api/usersAPI";

export default function ManageUsers() {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null); // user being edited
  const [form, setForm] = useState({ email: "", role: "" });

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      const data = await usersAPI.getAll();
      setUsers(data);
    } catch (err) {
      console.error("Error loading users:", err);
    }
  };

  // ----------------------- DELETE USER -----------------------
  const deleteUser = async (id) => {
    if (!confirm("Are you sure you want to delete this user?")) return;

    try {
      await usersAPI.delete(id);
      loadUsers();
      alert("User deleted");
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  // ----------------------- MAKE ADMIN -----------------------
  const makeAdmin = async (id) => {
    if (!confirm("Make this user admin?")) return;

    try {
      await usersAPI.makeAdmin(id);
      loadUsers();
    } catch (err) {
      console.error("Failed:", err);
    }
  };

  // ----------------------- OPEN EDIT FORM -----------------------
  const startEdit = (user) => {
    setEditingUser(user);
    setForm({ email: user.email, role: user.role });
  };

  // ----------------------- SAVE EDIT -----------------------
  const saveEdit = async () => {
    try {
      await usersAPI.update(editingUser.id, form); // use your backend update route
      setEditingUser(null);
      loadUsers();
      alert("User updated");
    } catch (err) {
      console.error("Update failed:", err);
    }
  };

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-center">Manage Users</h2>

      {users.length === 0 ? (
        <p className="text-center text-gray-500">No users found.</p>
      ) : (
        <table className="w-full border shadow-md rounded">
          <thead>
            <tr className="bg-gray-200">
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

                <td className="p-3 border">
                  <span
                    className={`px-2 py-1 rounded text-white ${
                      u.role === "admin" ? "bg-blue-600" : "bg-gray-600"
                    }`}
                  >
                    {u.role}
                  </span>
                </td>

                <td className="p-3 border space-x-2">
                  <button
                    onClick={() => startEdit(u)}
                    className="px-3 py-1 bg-yellow-500 text-white rounded"
                  >
                    Edit
                  </button>

                  {u.role !== "admin" && (
                    <button
                      onClick={() => makeAdmin(u.id)}
                      className="px-3 py-1 bg-blue-600 text-white rounded"
                    >
                      Make Admin
                    </button>
                  )}

                  <button
                    onClick={() => deleteUser(u.id)}
                    className="px-3 py-1 bg-red-600 text-white rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* ----------------------- EDIT MODAL ----------------------- */}
      {editingUser && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center">
          <div className="bg-white p-6 rounded shadow-lg w-96">
            <h3 className="text-xl font-semibold mb-4">Edit User</h3>

            <label className="block mb-2 font-semibold">Email</label>
            <input
              type="text"
              className="w-full border p-2 rounded mb-3"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />

            <label className="block mb-2 font-semibold">Role</label>
            <select
              className="w-full border p-2 rounded mb-3"
              value={form.role}
              onChange={(e) => setForm({ ...form, role: e.target.value })}
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>

            <div className="flex justify-between">
              <button
                onClick={() => setEditingUser(null)}
                className="px-4 py-2 bg-gray-500 text-white rounded"
              >
                Cancel
              </button>

              <button
                onClick={saveEdit}
                className="px-4 py-2 bg-green-600 text-white rounded"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
