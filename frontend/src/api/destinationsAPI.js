// frontend/src/api/destinationsAPI.js
import api from "./axios";

const destinationsAPI = {
  // Get ALL destinations
  getAll: async () => {
    const res = await api.get("/api/destinations");
    return res.data;
  },

  // Get single destination by ID (what your frontend expects)
  getById: async (id) => {
    const res = await api.get(`/api/destinations/${id}`);
    return res.data;
  },

  // (Optional if you want to keep the old name)
  getOne: async (id) => {
    const res = await api.get(`/api/destinations/${id}`);
    return res.data;
  },

  // SEARCH
  search: async (query) => {
    const res = await api.get(`/api/destinations/search?q=${query}`);
    return res.data;
  },

  // Admin — create destination
  create: async (formData) => {
    const res = await api.post("/api/destinations", formData, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "multipart/form-data",
      },
    });
    return res.data;
  },

  // Admin — update destination
  update: async (id, formData) => {
    const res = await api.put(`/api/destinations/${id}`, formData, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "multipart/form-data",
      },
    });
    return res.data;
  },

  // Admin — delete destination
  delete: async (id) => {
    const res = await api.delete(`/api/destinations/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return res.data;
  },
};

export default destinationsAPI;
