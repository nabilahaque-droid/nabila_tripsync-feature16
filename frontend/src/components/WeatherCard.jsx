import React from "react";

export default function WeatherCard({ data }) {
  const temperature = Math.round(data?.main?.temp ?? 0);

  return (
    <div className="weather-card">
      <div className="weather-card__header">
        <h3>{data.name}</h3>
        <span>{data.weather?.[0]?.description || "Unknown"}</span>
      </div>
      <div className="weather-card__temp">{temperature} C</div>
      <div className="weather-card__meta">
        <div>
          <span>Humidity</span>
          <strong>{data.main?.humidity ?? "N/A"}%</strong>
        </div>
        <div>
          <span>Wind</span>
          <strong>{data.wind?.speed ?? "N/A"} m/s</strong>
        </div>
      </div>
    </div>
  );
}
