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
    <div style={{ padding: "20px" }}>
      <h2>Trip Journal</h2>

      <textarea
        placeholder="Write your journal entry..."
        value={entry}
        onChange={(e) => setEntry(e.target.value)}
      />

      <button onClick={handleAdd}>Add Journal</button>

      <ul>
        {journals.map((j) => (
          <li key={j._id}>
            <p>{j.text}</p>
            <button onClick={() => handleDelete(j._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Journals;

