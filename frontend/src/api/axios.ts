import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000/api",
  baseURL: "http://localhost:3000/api",
  withCredentials: true, // ✅ ใช้ cookie JWT
});

export default api;