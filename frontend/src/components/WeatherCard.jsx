import React from "react";

export default function WeatherCard({ data }) {
  const cardStyle = {
    background: "linear-gradient(135deg, #87CEFA, #1E3A8A)", // sky blue → navy blue
    color: "#FFF9C4", // light yellow text
    padding: "25px",
    marginTop: "20px",
    borderRadius: "20px",
    width: "350px",
    boxShadow: "0 10px 25px rgba(0, 0, 0, 0.3)",
    textAlign: "center",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  };

  const tempStyle = {
    color: "#FFEB3B", // bright yellow
    fontWeight: "bold",
    fontSize: "22px",
  };

  const infoStyle = {
    margin: "5px 0",
    fontSize: "16px",
  };

  return (
    <div style={cardStyle}>
      <h2>{data.name}</h2>
      <p style={tempStyle}>Temperature: {data.main.temp}°C</p>
      <p style={infoStyle}>Condition: {data.weather[0].description}</p>
      <p style={infoStyle}>Humidity: {data.main.humidity}%</p>
      <p style={infoStyle}>Wind: {data.wind.speed} m/s</p>
    </div>
  );
}




