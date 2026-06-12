import api from "./api";

export const getNotifications = () =>
  api.get("/notifications");

export const markNotificationRead = (
  id: string
) =>
  api.put(
    `/notifications/${id}/read`
  );