import React, { useState } from "react";
import "./App.css";
import TripsDashboard from "./components/TripsDashboard";
import WeatherPage from "./pages/WeatherPage";
import FlightStatus from "./components/FlightStatus";
import AuthCard from "./components/AuthCard";

const content = {
  en: {
    title: "TripSync",
    subtitle: "Plan, pack, and go with confidence",
    welcome:
      "Design trips, track budgets, and stay updated from one clean dashboard.",
    change: "Language",
  },
  bn: {
    title: "TripSync",
    subtitle: "Plan, pack, and go with confidence",
    welcome:
      "Design trips, track budgets, and stay updated from one clean dashboard.",
    change: "Language",
  },
  es: {
    title: "TripSync",
    subtitle: "Planifica, empaca y viaja",
    welcome: "Itinerarios, presupuestos y alertas en un solo lugar.",
    change: "Idioma",
  },
};

function App() {
  const [lang, setLang] = useState("en");

  return (
    <div className="app-shell">
      <header className="hero">
        <div className="hero-content">
          <p className="eyebrow">TripSync</p>
          <h1 className="hero-title">{content[lang].title}</h1>
          <p className="hero-subtitle">{content[lang].subtitle}</p>
          <p className="hero-body">{content[lang].welcome}</p>
          <div className="hero-actions">
            <a className="btn-primary" href="#dashboard">
              Plan a trip
            </a>
            <a className="btn-ghost" href="#tools">
              Explore tools
            </a>
          </div>
          <div className="hero-stats">
            <div>
              <span className="stat-value">All-in-one</span>
              <span className="stat-label">Trips, budgets, journals</span>
            </div>
            <div>
              <span className="stat-value">Live</span>
              <span className="stat-label">Weather and flight status</span>
            </div>
            <div>
              <span className="stat-value">Shared</span>
              <span className="stat-label">Collaborate with your group</span>
            </div>
          </div>
        </div>

        <div className="hero-panel">
          <div className="lang-panel">
            <p className="panel-label">{content[lang].change}</p>
            <div className="lang-buttons">
              <button
                onClick={() => setLang("en")}
                className={lang === "en" ? "is-active" : ""}
              >
                English
              </button>
              <button
                onClick={() => setLang("bn")}
                className={lang === "bn" ? "is-active" : ""}
              >
                Bangla
              </button>
              <button
                onClick={() => setLang("es")}
                className={lang === "es" ? "is-active" : ""}
              >
                Spanish
              </button>
            </div>
          </div>
          <AuthCard />
          <div className="hero-card">
            <h2>Trip-ready by design</h2>
            <p>
              Keep itineraries, notes, and budgets aligned. Built for quick
              planning and calm departures.
            </p>
            <div className="hero-tags">
              <span>Itineraries</span>
              <span>Budgeting</span>
              <span>Documents</span>
              <span>Updates</span>
            </div>
          </div>
        </div>
      </header>

      <main className="main-grid">
        <section id="dashboard" className="panel panel-wide">
          <div className="panel-header">
            <h2>Trip Dashboard</h2>
            <p>Manage upcoming and past trips in one place.</p>
          </div>
          <TripsDashboard />
        </section>

        <section id="tools" className="panel">
          <div className="panel-header">
            <h2>Weather</h2>
            <p>Check destination conditions before you pack.</p>
          </div>
          <WeatherPage />
        </section>

        <section className="panel">
          <div className="panel-header">
            <h2>Flight Status</h2>
            <p>Track live status, gates, and delays.</p>
          </div>
          <FlightStatus />
        </section>
      </main>
    </div>
  );
}

export default App;
