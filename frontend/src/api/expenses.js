import axios from "axios";

const BASE_URL = "http://localhost:5001/expenses";

export const addExpense = async (expense) => {
  const res = await axios.post(BASE_URL, expense);
  return res.data;
};

export const getExpensesByTrip = async (tripId) => {
  const res = await axios.get(`${BASE_URL}/${tripId}`);
  return res.data;
};

export const deleteExpense = async (id) => {
  const res = await axios.delete(`${BASE_URL}/${id}`);
  return res.data;
};
