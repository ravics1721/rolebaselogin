import Axios from "axios";
const API = process.env.REACT_APP_API || "http://localhost:5000/api";

export const loginUser = async (email, password) => {
  return await Axios.post(`${API}/login`, { email, password });
};

export const registerUser = async (name, email, role, password) => {
  return await Axios.post(`${API}/register`, { name, email, role, password });
};

export const getDashboard = async (token) => {
  return await Axios.get(`${API}/dashboard`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
