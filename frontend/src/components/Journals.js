import React, { useState, useEffect } from "react";
import { addJournal, getJournalsByTrip, deleteJournal } from "../api/journals";

const Journals = ({ tripId }) => {
  const [journals, setJournals] = useState([]);
  const [entry, setEntry] = useState("");

  useEffect(() => {
    loadJournals();
  }, [tripId]);

  const loadJournals = async () => {
    const data = await getJournalsByTrip(tripId);
    setJournals(data);
  };

  const handleAdd = async () => {
    if (!entry) return alert("Write something first!");
    await addJournal({ text: entry, tripId });
    setEntry("");
    loadJournals();
  };

  const handleDelete = async (id) => {
    await deleteJournal(id);
    loadJournals();
  };

  return (
    <div>
      <h2>📖 Travel Journal</h2>
      <textarea
        placeholder="Write about your day..."
        value={entry}
        onChange={(e) => setEntry(e.target.value)}
        rows="3"
        style={{ width: "95%", padding: "5px" }}
      />
      <button onClick={handleAdd} style={{ marginTop: "5px" }}>Save Entry</button>

      <ul style={{ marginTop: "15px", maxHeight: "200px", overflowY: "auto" }}>
        {journals.map((j) => (
          <li key={j._id} style={{ background: "white", padding: "8px", borderRadius: "5px", marginBottom: "5px" }}>
            <p style={{ margin: 0, fontStyle: "italic" }}>"{j.text}"</p>
            <button onClick={() => handleDelete(j._id)} style={{ marginTop: "5px", fontSize: "0.7rem", color: "red", border:"none", background:"none", cursor:"pointer" }}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Journals;
