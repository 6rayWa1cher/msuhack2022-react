import { basicAxios, mainAxios } from "./utils";

export const signInApi = (username, password) =>
  basicAxios().post("/auth/login", {
    username,
    password_hash: password,
  });

export const signUpApi = ({ username, password }) =>
  basicAxios().post("/auth/register", {
    username,
    password_hash: password,
  });

export const getSelfUserApi = () => mainAxios.get("/auth/profile");
