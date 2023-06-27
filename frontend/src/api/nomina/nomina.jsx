import axios from "../config";

export const getNomina = () => axios.get("nomina/");
export const getNominaById = (id) => axios.get(`nomina/${id}`);

export const addNomina = (payload) => axios.post("nomina/", payload);

export const deleteNomina = (id) => axios.delete(`nomina/${id}/`);
