// frontend/src/api/destinations.js

import api from "./axios";

const destinationsAPI = {
  getAll: async () => {
    const res = await api.get("/api/destinations");
    return res.data;
  },

  getById: async (id) => {
    const res = await api.get(`/api/destinations/${id}`);
    return res.data;
  }
};

export default destinationsAPI;
