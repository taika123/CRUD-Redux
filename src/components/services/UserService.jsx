// import axios from "axios";
import axios from "./customize-axios";

const fetchDataUser = (page) => {
  return axios.get(`/api/users?page=${page}`);
};

const addNewUser = (name, job) => {
  return axios.post("/api/users", { name, job });
};

const putUpdateUser = (name, job) => {
  return axios.put("/api/users", { name, job });
};

const deleteUser = (id) => {
  return axios.delete(`/api/users/${id}`);
};

const loginAPI = (email, password) => {
  return axios.post("/api/login", { email, password });
};

const registerLogin = (email, password) => {
  return axios.post("/api/register", { email, password });
};
export {
  fetchDataUser,
  addNewUser,
  putUpdateUser,
  deleteUser,
  loginAPI,
  registerLogin,
};
