import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import TopNav from "./components/TopNav";
import FeatureLayout from "./components/FeatureLayout";
import FlightStatus from "./components/FlightStatus";
import HomePage from "./pages/HomePage";
import WeatherPage from "./pages/WeatherPage";
import DocumentsPage from "./pages/DocumentsPage";
import TripReportPage from "./pages/TripReportPage";

function App() {
  return (
    <Router>
      <div className="app-shell">
        <TopNav />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/weather"
            element={
              <FeatureLayout
                title="Weather"
                subtitle="Check destination conditions before you pack."
              >
                <WeatherPage />
              </FeatureLayout>
            }
          />
          <Route
            path="/documents"
            element={
              <FeatureLayout
                title="Travel Documents"
                subtitle="Securely upload passports, tickets, and visas."
              >
                <DocumentsPage />
              </FeatureLayout>
            }
          />
          <Route
            path="/reports"
            element={
              <FeatureLayout
                title="Trip Reports"
                subtitle="Export itinerary, budgets, and documents as a PDF."
              >
                <TripReportPage />
              </FeatureLayout>
            }
          />
          <Route
            path="/flights"
            element={
              <FeatureLayout
                title="Flight Status"
                subtitle="Track live departures, gates, and delays."
              >
                <FlightStatus />
              </FeatureLayout>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
