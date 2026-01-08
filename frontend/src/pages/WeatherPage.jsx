import React, { useState } from "react";
import axios from "axios";
import WeatherCard from "../components/WeatherCard";

export default function WeatherPage() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");

  const fetchWeather = async () => {
    const trimmed = city.trim();
    if (!trimmed) {
      setError("Enter a city name.");
      return;
    }

    try {
      setError("");
      const res = await axios.get(
        `http://localhost:5001/api/weather/${encodeURIComponent(trimmed)}`
      );
      setWeather(res.data);
    } catch (err) {
      setWeather(null);
      const message =
        err?.response?.data?.error ||
        err?.response?.data?.message ||
        "Unable to fetch weather. Try a valid city name.";
      setError(message);
    }
  };

  return (
    <div className="tool-stack">
      <div className="tool-form">
        <input
          type="text"
          placeholder="Enter city"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="tool-input"
        />
        <button onClick={fetchWeather} className="tool-button">
          Get Weather
        </button>
      </div>

      {error && <p className="tool-error">{error}</p>}
      {weather && <WeatherCard data={weather} />}
    </div>
  );
}
