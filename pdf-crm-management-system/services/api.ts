import axios from "axios";

const api = axios.create({
  baseURL:
    process.env.NODE_ENV === "development"
      ? "http://localhost:5000/api"
      : "https://pdfcrm-production.up.railway.app/api",
});

api.interceptors.request.use(
  (config) => {
    if (
      typeof window !==
      "undefined"
    ) {
      const token =
        localStorage.getItem(
          "token"
        );

      if (token) {
        config.headers.Authorization =
          `Bearer ${token}`;
      }
    }

    return config;
  }
);

export default api;