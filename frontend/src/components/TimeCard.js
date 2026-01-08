import { useState } from "react";
import { fetchTime } from "../services/timeService";

export default function TimeCard() {
  const [city, setCity] = useState("");
  const [data, setData] = useState(null);

  const handleFetch = async () => {
    const res = await fetchTime(city);
    setData(res);
  };

  return (
    <div className="card">
      <input
        placeholder="Enter city (e.g. Tokyo)"
        value={city}
        onChange={e => setCity(e.target.value)}
      />
      <button onClick={handleFetch}>Get Time</button>

      {data && (
        <div className="result">
          <p><b>City:</b> {data.city}</p>
          <p><b>Timezone:</b> {data.timezone}</p>
          <p><b>Local Time:</b> {data.localTime}</p>
        </div>
      )}
    </div>
  );
}
