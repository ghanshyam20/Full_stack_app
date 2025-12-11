import api from "./axios";

const usersAPI = {
  // ADMIN — get all users
  getAll: async () => {
    const res = await api.get("/auth/users/all", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return res.data;
  },

  // ADMIN — delete a user
  delete: async (id) => {
    const res = await api.delete(`/auth/users/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return res.data;
  },

  // ADMIN — make user admin
  makeAdmin: async (id) => {
    const res = await api.put(
      `/auth/users/${id}/make-admin`,
      {},
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    return res.data;
  },

  // ADMIN — update user email or role
  update: async (id, data) => {
    const res = await api.put(`/auth/users/${id}`, data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return res.data;
  },
};

export default usersAPI;
