
import React, { useState } from "react";
import axios from "axios";

export default function ShareTrip() {
  const [form, setForm] = useState({ title: "", destination: "", startDate: "" });

  const submit = async () => {
    await axios.post("http://localhost:5000/api/trips/share", form);
    alert("Trip shared to Discord!");
  };

  return (
    <div className="card">
      <h1>🌸 Trip Countdown Share</h1>
      <input placeholder="Trip Title" onChange={e => setForm({...form, title: e.target.value})} />
      <input placeholder="Destination" onChange={e => setForm({...form, destination: e.target.value})} />
      <input type="date" onChange={e => setForm({...form, startDate: e.target.value})} />
      <button onClick={submit}>Share to Discord</button>
    </div>
  );
}