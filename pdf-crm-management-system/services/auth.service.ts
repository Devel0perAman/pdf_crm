import api from "./api";

export interface LoginPayload {
  username: string;
  password: string;
}

export interface RegisterPayload {
  name: string;
  username: string;
  email: string;
  password: string;
}

export const loginUser = (data: LoginPayload) => {
  return api.post("/auth/login", data);
};

export const registerUser = (data: RegisterPayload) => {
  return api.post("/auth/register", data);
};
