import axios from "axios";
const BASE_URL = import.meta.env.VITE_BASE_URL;

import Cookies from "universal-cookie";
export const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});
const cookies = new Cookies();
axiosInstance.interceptors.request.use((req) => {
  const token = cookies.get("token");
  if (token) {
    req.headers["X-Access-Token"] = token;
  }
  return req;
});

export default axiosInstance;
