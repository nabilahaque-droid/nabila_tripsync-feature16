const axios = require("axios");

const FLIGHT_API_BASE_URL =
  process.env.AVIATIONSTACK_BASE_URL || "https://api.aviationstack.com/v1/flights";

const normalizeFlight = (flight, fallbackNumber) => {
  const departure = flight?.departure || {};
  const arrival = flight?.arrival || {};
  const flightInfo = flight?.flight || {};

  const delayMinutes =
    typeof departure.delay === "number"
      ? departure.delay
      : typeof arrival.delay === "number"
        ? arrival.delay
        : null;

  return {
    flightNumber: flightInfo.iata || flightInfo.icao || fallbackNumber,
    status: flight?.flight_status || "unknown",
    airline: flight?.airline?.name || null,
    departure: {
      airport: departure.airport || null,
      terminal: departure.terminal || null,
      gate: departure.gate || null,
      scheduled: departure.scheduled || null,
      estimated: departure.estimated || null,
    },
    arrival: {
      airport: arrival.airport || null,
      terminal: arrival.terminal || null,
      gate: arrival.gate || null,
      scheduled: arrival.scheduled || null,
      estimated: arrival.estimated || null,
    },
    delayMinutes,
  };
};

exports.getFlightStatus = async (req, res) => {
  const { flightNumber } = req.params;
  const apiKey = process.env.AVIATIONSTACK_API_KEY;

  if (!flightNumber) {
    return res.status(400).json({ message: "Flight number is required." });
  }

  if (!apiKey) {
    return res.status(500).json({ message: "Flight API key is missing." });
  }

  try {
    const response = await axios.get(FLIGHT_API_BASE_URL, {
      params: {
        access_key: apiKey,
        flight_iata: flightNumber,
      },
    });

    const flights = response.data?.data || [];

    if (!flights.length) {
      return res.status(404).json({ message: "Flight not found." });
    }

    const normalized = normalizeFlight(flights[0], flightNumber);
    res.status(200).json(normalized);
  } catch (err) {
    res.status(500).json({ message: "Unable to fetch flight information." });
  }
};
