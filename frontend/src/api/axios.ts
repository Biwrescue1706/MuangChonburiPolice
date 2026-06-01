import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:10000/api",
  //baseURL: "https://hub-muangchonburi.smartdorm-biwboong.shop/api",
  withCredentials: true, // ✅ ใช้ cookie JWT
});

export default api;