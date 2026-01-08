import React, { useEffect, useMemo, useState } from "react";
import { downloadTripReport, getAllTrips } from "../api/trips";

const formatDate = (value) => {
  if (!value) return "N/A";
  const d = new Date(value);
  return Number.isNaN(d.getTime()) ? "N/A" : d.toLocaleDateString();
};

const TripReport = () => {
  const [trips, setTrips] = useState([]);
  const [selectedTripId, setSelectedTripId] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const selectedTrip = useMemo(
    () => trips.find((t) => t._id === selectedTripId),
    [trips, selectedTripId]
  );

  useEffect(() => {
    const loadTrips = async () => {
      try {
        const data = await getAllTrips();
        setTrips(data);
        if (data.length) {
          setSelectedTripId(data[0]._id);
        }
      } catch (err) {
        const message =
          err?.response?.data?.message ||
          err?.message ||
          "Unable to load trips.";
        setError(message);
      }
    };

    loadTrips();
  }, []);

  const handleDownload = async () => {
    if (!selectedTripId) {
      setError("Select a trip first.");
      return;
    }

    setLoading(true);
    setError("");
    try {
      const blob = await downloadTripReport(selectedTripId);
      const url = window.URL.createObjectURL(
        new Blob([blob], { type: "application/pdf" })
      );

      const filename = `${(selectedTrip?.title || "trip")}-report.pdf`;
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", filename);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      const message =
        err?.response?.data?.message ||
        err?.message ||
        "Unable to download report.";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="tool-stack">
      <div className="tool-form">
        <select
          className="tool-input"
          value={selectedTripId}
          onChange={(e) => setSelectedTripId(e.target.value)}
        >
          {!trips.length && <option value="">No trips available</option>}
          {trips.map((trip) => (
            <option key={trip._id} value={trip._id}>
              {trip.title} — {trip.destination}
            </option>
          ))}
        </select>
        <button
          className="tool-button"
          onClick={handleDownload}
          disabled={loading || !selectedTripId}
        >
          {loading ? "Preparing..." : "Download PDF"}
        </button>
      </div>

      <p className="tool-hint">
        Sign in first so your documents can be included in the report.
      </p>

      {error && <p className="tool-error">{error}</p>}

      {selectedTrip && (
        <div className="tool-details">
          <div className="tool-row">
            <span>Trip</span>
            <span>{selectedTrip.title}</span>
          </div>
          <div className="tool-row">
            <span>Destination</span>
            <span>{selectedTrip.destination}</span>
          </div>
          <div className="tool-row">
            <span>Dates</span>
            <span>
              {formatDate(selectedTrip.startDate)} —{" "}
              {formatDate(selectedTrip.endDate)}
            </span>
          </div>
          {selectedTrip.budget != null && (
            <div className="tool-row">
              <span>Budget</span>
              <span>${Number(selectedTrip.budget).toFixed(2)}</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default TripReport;
