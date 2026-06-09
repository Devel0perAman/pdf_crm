import api from "./api";

export const getDashboardStats =
  () =>
    api.get("/dashboard/stats");

export const getRecentPdfs =
  () =>
    api.get(
      "/dashboard/recent-pdfs"
    );