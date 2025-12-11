import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000",  // yo mula le wild time consuming agryo 
});

export default api;
