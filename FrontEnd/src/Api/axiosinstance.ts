// src/api/axiosinstance.ts
import axios from "axios";
import store from "../Redux/store";
import loginaxios from "./loginaxios";
// import { logoutUser } from "../Redux/slices/AuthSlice";
import { toast } from "react-toastify";
import { logout } from "../Redux/Slices/Auth/reducers";

const axiosInstance = axios.create({
  baseURL: "http://localhost:3000/",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // for refresh cookie
});

// ADD TOKEN TO EVERY REQUEST (JWT in Authorization header)
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token") || sessionStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// RESPONSE INTERCEPTOR - 401 Handling + Refresh
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      const code = error.response?.data?.CODE;

      switch (code) {
        case "REFRESH_MISSING":
        case "REFRESH_INVALID":
        case "USER_INVALID":
          store.dispatch(logout());
          toast.error("Session expired. Please login again.");
          return Promise.reject(error);

        case "ACCESS_MISSING":
        case "ACCESS_INVALID":
          try {
            await loginaxios.get("/auth/generate/access");
            return axiosInstance(originalRequest); // retry with new access token
          } catch (refreshError) {
            store.dispatch(logout());
            toast.error("Session expired. Logging out...");
            return Promise.reject(refreshError);
          }

        default:
          // Unknown 401 → logout
          store.dispatch(logout());
          toast.error("Unauthorized. Please login again.");
          return Promise.reject(error);
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;