import { basicAxios, mainAxios } from "./utils";

export const getButtonByIdApi = (id) => mainAxios.get(`/button/${id}`);

export const getButtonsByOwnerIdApi = (ownerId) =>
  mainAxios.get(`/button/all/${ownerId}`);

export const putButtonApi = (id, { label, description, press_counter }) =>
  mainAxios.put(`/button/${id}`, { label, description, press_counter });

export const deleteButtonApi = (id) => mainAxios.delete(`/button/${id}`);
