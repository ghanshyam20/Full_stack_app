import api from "./axios";

const bookingsAPI = {
  // USER — create a booking
  create: async (data) => {
    const res = await api.post("/api/bookings", data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return res.data;
  },

  // USER — get own bookings
  my: async () => {
    const res = await api.get("/api/bookings/my", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return res.data;
  },

  // USER — update booking  ⭐ NEW ⭐
  update: async (id, data) => {
    const res = await api.put(`/api/bookings/${id}`, data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return res.data;
  },

  // ADMIN — get all bookings
  getAll: async () => {
    const res = await api.get("/api/bookings", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return res.data;
  },

  // ADMIN — delete a booking
  delete: async (id) => {
    const res = await api.delete(`/api/bookings/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return res.data;
  },
};

export default bookingsAPI;
