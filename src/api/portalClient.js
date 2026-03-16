import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const portalClient = axios.create({
  baseURL: API_URL,
});

portalClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("portal_token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

portalClient.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {
      localStorage.removeItem("portal_token");
      localStorage.removeItem("portal_user");
      window.location.href = "/portal/login";
    }
    return Promise.reject(err);
  }
);

export default portalClient;
