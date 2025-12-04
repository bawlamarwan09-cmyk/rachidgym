import axios from "axios";
const api = axios.create({
  baseURL: "https://rachidgym.infinityfreeapp.com",
  timeout: 10000,
});
export default api;
