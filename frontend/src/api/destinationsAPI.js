// frontend/src/api/destinationsAPI.js
import api from "./axios";

const destinationsAPI = {
  // Get ALL destinations
  getAll: async () => {
    const res = await api.get("/api/destinations");
    return res.data;
  },

  // Get single destination by ID (hamro frontend ko base ma hunxa yo sab )
  getById: async (id) => {
    const res = await api.get(`/api/destinations/${id}`);
    return res.data;
  },

  // (this is for optional , hai ta)
  getOne: async (id) => {
    const res = await api.get(`/api/destinations/${id}`);
    return res.data;
  },

  // SEARCH , yesle yei kam garxa nam bata clear xa 
  search: async (query) => {
    const res = await api.get(`/api/destinations/search?q=${query}`);
    return res.data;
  },

  // Admin — create destination , yesle chai destination create garna help garxa 
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
