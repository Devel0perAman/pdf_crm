import api from "./api";

export const getDashboardStats = () => {
  return api.get(
    "/dashboard/stats"
  );
};

export const getRecentPdfs = () => {
  return api.get(
    "/dashboard/recent-pdfs"
  );
};