import axios from "axios";

const BASE_URL = "http://localhost:5001/trips";
const TOKEN_KEY = "tripsync_token";

const getAuthHeaders = () => {
  const token = localStorage.getItem(TOKEN_KEY);
  if (!token) {
    throw new Error("Sign in to download reports.");
  }
  return { Authorization: `Bearer ${token}` };
};

// Create a trip
export const createTrip = async (trip) => {
  const res = await axios.post(BASE_URL, trip);
  return res.data;
};

// Get all trips
export const getAllTrips = async () => {
  const res = await axios.get(BASE_URL);
  return res.data;
};

// Get upcoming trips
export const getUpcomingTrips = async () => {
  const res = await axios.get(`${BASE_URL}/upcoming`);
  return res.data;
};

// Get past trips
export const getPastTrips = async () => {
  const res = await axios.get(`${BASE_URL}/past`);
  return res.data;
};

// Update a trip
export const updateTrip = async (id, trip) => {
  const res = await axios.put(`${BASE_URL}/${id}`, trip);
  return res.data;
};

// Delete a trip
export const deleteTrip = async (id) => {
  const res = await axios.delete(`${BASE_URL}/${id}`);
  return res.data;
};

// Download trip report PDF (includes user documents, requires auth)
export const downloadTripReport = async (tripId) => {
  const res = await axios.get(`${BASE_URL}/${tripId}/report`, {
    responseType: "blob",
    headers: getAuthHeaders(),
  });
  return res.data;
};
