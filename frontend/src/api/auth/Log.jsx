import axios from "./config";

export const addUser = (payload) => axios.post("register/", payload);
export const logUser = (payload) => axios.post("login/", payload);
