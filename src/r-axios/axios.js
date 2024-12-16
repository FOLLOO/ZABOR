import axios from "axios";
import { removeFromStorage } from "../services/AuthServices";
import { IMAGE_URL } from "../utils";

const token = localStorage.getItem("token");

const axiosInstance = axios.create({
  baseURL: `${IMAGE_URL}/api`,
  headers: {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token && config?.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
      if (error.response?.status === 401) {
        console.error("Unauthorized. Logging out...");
        removeFromStorage();
        window.location.href = "/login"; // Перенаправление на страницу логина
      }
      return Promise.reject(error);
    }
);

export default axiosInstance;
