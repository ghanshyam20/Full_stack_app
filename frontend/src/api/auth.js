import api from "./axios";

// Authentication API , yo api le 2 ta end poitns lai jodne kam garxa 
const authAPI = {
  // Register user
  register: async (data) => {
    const res = await api.post("/api/auth/register", data); // FIXED
    return res.data;
  },

  // Login user , yp api le login ko api ko kam grx
  login: async (data) => {
    const res = await api.post("/api/auth/login", data); // FIXED
    return res.data;
  },

  // Get logged in user's profile ,, yo api le logged in vako user lai permisson dinxa
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
