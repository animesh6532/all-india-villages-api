import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api",
  timeout: 15000
});

api.interceptors.request.use((config) => {
  const apiKey = localStorage.getItem("aiv_api_key") || import.meta.env.VITE_DEMO_API_KEY || "demo_key_123456";
  const apiSecret =
    localStorage.getItem("aiv_api_secret") || import.meta.env.VITE_DEMO_API_SECRET || "demo_secret_123456";

  if (!config.url?.startsWith("/auth")) {
    config.headers["x-api-key"] = apiKey;
    config.headers["x-api-secret"] = apiSecret;
  }

  return config;
});

export default api;
