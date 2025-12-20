import axios from "axios";

const BASE_URL = "http://localhost:5001/api/flights";

export const getFlightStatus = async (flightNumber) => {
  const res = await axios.get(`${BASE_URL}/${encodeURIComponent(flightNumber)}`);
  return res.data;
};
