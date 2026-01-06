import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import Expenses from "./Expenses";
import Journals from "./Journals";

const TripDetails = () => {
  const { id } = useParams(); // Get trip ID from URL
  const [trip, setTrip] = useState(null);

  useEffect(() => {
    // Fetch trip details (to show title and budget)
    const fetchTrip = async () => {
      try {
        const res = await axios.get(`http://localhost:5001/trips`); 
        // Note: In a real app, you'd want a specific endpoint like GET /trips/:id
        // For now, we filter from all trips to keep your backend simple
        const foundTrip = res.data.find((t) => t._id === id);
        setTrip(foundTrip);
      } catch (err) {
        console.error(err);
      }
    };
    fetchTrip();
  }, [id]);

  if (!trip) return <div style={{color:'white', textAlign:'center'}}>Loading Trip...</div>;

  return (
    <div style={{ padding: "20px", maxWidth: "800px", margin: "0 auto" }}>
      <Link to="/" style={{ textDecoration: "none", color: "#333", fontWeight: "bold" }}>← Back to Dashboard</Link>
      
      <div style={{ 
          background: "white", padding: "20px", borderRadius: "10px", marginTop: "10px", 
          boxShadow: "0 4px 10px rgba(0,0,0,0.1)" 
      }}>
        <h1>{trip.title}</h1>
        <h3>📍 {trip.destination}</h3>
        <p><strong>Date:</strong> {new Date(trip.startDate).toLocaleDateString()} - {new Date(trip.endDate).toLocaleDateString()}</p>
        <p><strong>Total Budget:</strong> ${trip.budget}</p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", marginTop: "20px" }}>
        {/* FR-4 Area */}
        <div style={{ background: "#e3f2fd", padding: "15px", borderRadius: "10px" }}>
           <Expenses tripId={id} budget={trip.budget} />
        </div>

        {/* FR-13 Area */}
        <div style={{ background: "#fff3e0", padding: "15px", borderRadius: "10px" }}>
           <Journals tripId={id} />
        </div>
      </div>
    </div>
  );
};

export default TripDetails;