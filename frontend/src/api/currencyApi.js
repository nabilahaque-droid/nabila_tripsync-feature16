import axios from "axios";

const BASE_URL = "http://127.0.0.1:8080";

export const convertCurrency = async (base, target, amount) => {
  const response = await axios.get(
    `${BASE_URL}/api/currency/convert`,
    {
      params: { base, target, amount }
    }
  );
  return response.data;
};
