
import React, { useState } from "react";
import TripsDashboard from "./components/TripsDashboard";
import WeatherPage from "./pages/WeatherPage";
import TimeZoneCard from "./components/TimeZoneCard"; // Assuming it's in components

// Expanded Language content to cover TimeZone labels
const content = {
  en: { 
    title: "TripSync ✈️", 
    subtitle: "Plan, Pack and Go", 
    welcome: "Ready for your next adventure?", 
    change: "Select Language",
    tzDate: "Date",
    tzTime: "Local Time",
    tzZone: "Zone"
  },
  bn: { 
    title: "ট্রিপসিঙ্ক ✈️", 
    subtitle: "পরিকল্পনা করুন এবং যাত্রা শুরু করুন", 
    welcome: "আপনার পরবর্তী অ্যাডভেঞ্চারের জন্য প্রস্তুত?", 
    change: "ভাষা নির্বাচন করুন",
    tzDate: "তারিখ",
    tzTime: "স্থানীয় সময়",
    tzZone: "জোন"
  },
  es: { 
    title: "TripSync ✈️", 
    subtitle: "Planifica, Empaca y Ve", 
    welcome: "¿Listo para tu aventura?", 
    change: "Seleccionar idioma",
    tzDate: "Fecha",
    tzTime: "Hora Local",
    tzZone: "Zona"
  }
};

function App() {
  const [lang, setLang] = useState("en");

  // Sample data for the TimeZoneCard (In a real app, this comes from an API)
  const sampleTimeData = {
    datetime: "2023-10-27T14:30:00",
    timezone: "America/New_York",
    utc_offset: "-04:00"
  };

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

      {/* Main Dashboard Area */}
      <div className="dashboard-weather">
        <h1>TripSync Dashboard</h1>
        
        <div className="flex-row">
           {/* Added the TimeZoneCard here */}
          <TimeZoneCard 
            data={sampleTimeData} 
            city="New York" 
            labels={content[lang]} 
          />
          <WeatherPage />
        </div>

        <TripsDashboard />
      </div>
    </div>
  );
}

export default App;