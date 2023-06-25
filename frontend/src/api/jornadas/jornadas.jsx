import axios from "../config";

export const getJornadas = () => axios.get("jornada/");
export const getJornadaById = (id) => axios.get(`jornada/${id}`);

export const addJornada = (payload) => axios.post(`jornada/`, payload);

export const updateJornada = (payload) => {
  // console.log(payload);
  axios.put(`jornada/${payload.id}/`, payload);
};

export const deleteJornada = (id) => axios.delete(`jornada/${id}/`);
