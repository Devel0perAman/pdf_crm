import api from "./api";

export const registerUser = (
  data: {
    name: string;
    username: string;
    password: string;
  }
) =>
  api.post(
    "/auth/register",
    data
  );

export const loginUser = (
  data: {
    username: string;
    password: string;
  }
) =>
  api.post(
    "/auth/login",
    data
  );

export const getProfile = () =>
  api.get(
    "/users/profile"
  );

export const logoutUser = () => {
  localStorage.removeItem(
    "token"
  );

  localStorage.removeItem(
    "user"
  );
};