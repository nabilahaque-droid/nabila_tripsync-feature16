

import React, { useState } from "react";
import TripsDashboard from "./components/TripsDashboard";
import WeatherPage from "./pages/WeatherPage";

// Language content
const content = {
  en: { title: "TripSync ✈️", subtitle: "Plan, Pack and Go", welcome: "Ready for your next adventure?", change: "Select Language" },
  bn: { title: "ট্রিপসিঙ্ক ✈️", subtitle: "পরিকল্পনা করুন এবং যাত্রা শুরু করুন", welcome: "আপনার পরবর্তী অ্যাডভেঞ্চারের জন্য প্রস্তুত?", change: "ভাষা নির্বাচন করুন" },
  es: { title: "TripSync ✈️", subtitle: "Planifica, Empaca y Ve", welcome: "¿Listo para tu próxima aventura?", change: "Seleccionar idioma" }
};

function App() {
  const [lang, setLang] = useState("en");

  return (
    <div className="main-container">
      {/* Language Switch Card */}
      <div className="glass-card">
        <h1 className="title">{content[lang].title}</h1>
        <p className="subtitle">{content[lang].subtitle}</p>
        <div className="divider"></div>
        <h2 className="welcome-text">{content[lang].welcome}</h2>
        
        <p className="lang-label">✨ {content[lang].change} ✨</p>
        <div className="button-group">
          <button onClick={() => setLang("en")}>English 🇺🇸</button>
          <button onClick={() => setLang("bn")}>বাংলা 🇧🇩</button>
          <button onClick={() => setLang("es")}>Español 🇪🇸</button>
        </div>
      </div>

      {/* Existing Dashboard and Weather Page */}
      <div className="dashboard-weather">
        <h1>TripSync Dashboard</h1>
        <TripsDashboard />
        <WeatherPage />
      </div>
    </div>
  );
}

export default App;



