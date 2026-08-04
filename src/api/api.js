import axios from "axios";

const baseURL = import.meta.env.VITE_BASE_URL || window.location.origin;

const api = axios.create({
  baseURL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;