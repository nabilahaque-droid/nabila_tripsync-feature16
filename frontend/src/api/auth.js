import axios from "axios";

const BASE_URL = "http://localhost:5001/api/auth";

export const registerUser = async (payload) => {
  const res = await axios.post(`${BASE_URL}/register`, payload);
  return res.data;
};

export const loginUser = async (payload) => {
  const res = await axios.post(`${BASE_URL}/login`, payload);
  return res.data;
};
