import api from "./axios";

// Authentication API
const authAPI = {
  // Register user
  register: async (data) => {
    const res = await api.post("/api/auth/register", data); // FIXED
    return res.data;
  },

  // Login user
  login: async (data) => {
    const res = await api.post("/api/auth/login", data); // FIXED
    return res.data;
  },

  // Get logged in user's profile
  getProfile: async () => {
    const res = await api.get("/api/users/profile", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return res.data;
  },
};

export default authAPI;
