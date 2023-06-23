import axios from "../config";

export const getGrupos = () => axios.get("grupos/");
export const getGrupoById = (id) => axios.get(`grupos/${id}`);

export const addGrupos = (payload) => axios.post("grupos/", payload);

export const updateGrupo = (payload) => {
  // console.log(payload);
  axios.put(`grupos/${payload.id}/`, payload);
};

export const deleteGrupo = (id) => axios.delete(`grupos/${id}/`);
