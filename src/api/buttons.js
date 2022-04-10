import { basicAxios, mainAxios } from "./utils";

export const getButtonByIdApi = (id) => mainAxios.get(`/button/${id}`);

export const getButtonsByOwnerIdApi = (ownerId) =>
  mainAxios.get(`/button/all/${ownerId}`);
