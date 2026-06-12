import api from "./api";

export const getProfile = () =>
  api.get("/users/profile");

export const updateProfile = <T = unknown>(
  data: T
) =>
  api.put(
    "/users/profile",
    data
  );

export const changePassword = <T = unknown>(
  data: T
) =>
  api.put(
    "/users/password",
    data
  );

export const deleteAccount =
  () =>
    api.delete(
      "/users/profile"
    );

export const getUsers =
  () =>
    api.get("/users");

export const updateRole =
  (
    id: string,
    role: string
  ) =>
    api.put(
      `/users/${id}/role`,
      { role }
    );

export const deleteUser =
  (id: string) =>
    api.delete(
      `/users/${id}`
    );

export const uploadProfileImage =
  (
    formData: FormData
  ) =>
    api.post(
      "/users/profile-image",
      formData,
      {
        headers: {
          "Content-Type":
            "multipart/form-data",
        },
      }
    );