import React, { useState } from "react";
import { getFlightStatus } from "../api/flights";

const FlightStatus = () => {
  const [flightNumber, setFlightNumber] = useState("");
  const [flight, setFlight] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    const trimmed = flightNumber.trim();
    if (!trimmed) {
      setError("Enter a flight number.");
      return;
    }

    setLoading(true);
    setError("");
    setFlight(null);

    try {
      const data = await getFlightStatus(trimmed);
      setFlight(data);
    } catch (err) {
      const message =
        err?.response?.data?.message || "Unable to fetch flight information.";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="tool-stack">
      <div className="tool-form">
        <input
          type="text"
          placeholder="Enter flight number (e.g., AA100)"
          value={flightNumber}
          onChange={(e) => setFlightNumber(e.target.value)}
          className="tool-input"
        />
        <button
          onClick={handleSearch}
          disabled={loading}
          className="tool-button"
        >
          {loading ? "Checking..." : "Search"}
        </button>
      </div>

      {error && <p className="tool-error">{error}</p>}

      {flight && (
        <div className="tool-details">
          <div className="tool-row">
            <span>Flight</span>
            <span>{flight.flightNumber}</span>
          </div>
          <div className="tool-row">
            <span>Status</span>
            <span>{flight.status}</span>
          </div>
          <div className="tool-row">
            <span>Departure Gate</span>
            <span>{flight.departure?.gate || "N/A"}</span>
          </div>
          <div className="tool-row">
            <span>Arrival Gate</span>
            <span>{flight.arrival?.gate || "N/A"}</span>
          </div>
          <div className="tool-row">
            <span>Delay (min)</span>
            <span>
              {typeof flight.delayMinutes === "number"
                ? flight.delayMinutes
                : "N/A"}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default FlightStatus;
