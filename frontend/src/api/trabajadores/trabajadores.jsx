import axios from "../config";

export const getTrabajadores = () => axios.get("empleados/");

export const addTrabajador = (payload) => axios.post("empleados/", payload);

export const updateTrabajador = (payload) => {
  // console.log(payload);
  axios.put(`empleados/${payload.id}/`, payload);
};

export const deleteTrabajador = (id) => axios.delete(`empleados/${id}/`);
