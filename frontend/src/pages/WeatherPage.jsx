import React, { useState } from "react";
import axios from "axios";
import WeatherCard from "../components/WeatherCard";

export default function WeatherPage() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);

  const fetchWeather = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/weather/${city}`);
      setWeather(res.data);
    } catch (error) {
      alert("Error fetching weather. Try a valid city name!");
    }
  };

  const containerStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    minHeight: "100vh",
    background: "linear-gradient(to bottom, #E0F7FA, #81D4FA)", // light sky background
    padding: "50px 20px",
  };

  const inputStyle = {
    padding: "10px 15px",
    borderRadius: "10px",
    border: "none",
    fontSize: "16px",
    width: "250px",
    marginRight: "10px",
  };

  const buttonStyle = {
    padding: "10px 20px",
    borderRadius: "10px",
    border: "none",
    backgroundColor: "#1E3A8A", // navy blue
    color: "#FFEB3B", // yellow text
    fontWeight: "bold",
    cursor: "pointer",
  };

  const formStyle = {
    display: "flex",
    justifyContent: "center",
    marginBottom: "30px",
  };

  return (
    <div style={containerStyle}>
      <h1 style={{ color: "#1E3A8A", marginBottom: "20px" }}>🌤 TripSync Weather</h1>

      <div style={formStyle}>
        <input
          type="text"
          placeholder="Enter city"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          style={inputStyle}
        />
        <button onClick={fetchWeather} style={buttonStyle}>
          Get Weather
        </button>
      </div>

      {weather && <WeatherCard data={weather} />}
    </div>
  );
}
