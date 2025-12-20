import axios from "axios";

const BASE_URL = "http://localhost:5001/goals"; // must match backend port

export const getGoals = async () => {
  const res = await axios.get(BASE_URL);
  return res.data;
};

export const createGoal = async (goal) => {
  const res = await axios.post(BASE_URL, goal);
  return res.data;
};

export const deleteGoal = async (id) => {
  const res = await axios.delete(`${BASE_URL}/${id}`);
  return res.data;
};
