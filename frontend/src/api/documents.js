import axios from "axios";

const BASE_URL = "http://localhost:5001/api/documents";
const FILE_BASE_URL = "http://localhost:5001";
const TOKEN_KEY = "tripsync_token";

const getAuthHeaders = () => {
  const token = localStorage.getItem(TOKEN_KEY);
  if (!token) {
    throw new Error("Sign in to use documents.");
  }
  return {
    Authorization: `Bearer ${token}`,
  };
};

export const listDocuments = async () => {
  const res = await axios.get(BASE_URL, {
    headers: getAuthHeaders(),
  });
  return res.data;
};

export const uploadDocument = async (file) => {
  const formData = new FormData();
  formData.append("file", file);

  const res = await axios.post(`${BASE_URL}/upload`, formData, {
    headers: {
      ...getAuthHeaders(),
      "Content-Type": "multipart/form-data",
    },
  });

  return res.data;
};

export const deleteDocument = async (id) => {
  const res = await axios.delete(`${BASE_URL}/${id}`, {
    headers: getAuthHeaders(),
  });
  return res.data;
};

export const buildDocumentUrl = (relativePath = "") => {
  return `${FILE_BASE_URL}${relativePath}`;
};
