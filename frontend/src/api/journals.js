import axios from "axios";

const BASE_URL = "http://localhost:5001/journals";

export const addJournal = async (journal) => {
  const res = await axios.post(BASE_URL, journal);
  return res.data;
};

export const getJournalsByTrip = async (tripId) => {
  const res = await axios.get(`${BASE_URL}/${tripId}`);
  return res.data;
};

export const deleteJournal = async (id) => {
  const res = await axios.delete(`${BASE_URL}/${id}`);
  return res.data;
};
