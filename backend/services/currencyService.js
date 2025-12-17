/**
 * Currency Service
 * ----------------
 * This service is API-ready.
 * If live API is unavailable, it falls back to predefined rates.
 * This guarantees FR-9 functionality and system reliability.
 */

const axios = require("axios");

// Fallback rates (used if API fails)
const fallbackRates = {
  USD: { EUR: 0.92, BDT: 109.5 },
  EUR: { USD: 1.09, BDT: 119.3 },
  BDT: { USD: 0.0091, EUR: 0.0084 }
};

const fetchCurrencyRate = async (base, target) => {
  try {
    // Attempt live API
    const response = await axios.get(
      `https://open.er-api.com/v6/latest/${base}`
    );

    if (
      response.data &&
      response.data.result === "success" &&
      response.data.rates[target]
    ) {
      return response.data.rates[target];
    }
  } catch (error) {
    console.warn("Live currency API unavailable. Using fallback rates.");
  }

  // Fallback logic
  if (
    fallbackRates[base] &&
    fallbackRates[base][target]
  ) {
    return fallbackRates[base][target];
  }

  throw new Error("Currency conversion unavailable");
};

module.exports = fetchCurrencyRate;
