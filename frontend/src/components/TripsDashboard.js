import React, { useState, useEffect } from "react";
import { createTrip, getUpcomingTrips, getPastTrips, deleteTrip } from "../api/trips";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom"; // Hook for navigation
import bgImage from "../assets/landscape.jpg"; 

const smoothTransition = { duration: 0.7, ease: [0.25, 0.1, 0.25, 1.0] };
const cardVariants = {
  hidden: { opacity: 0, y: 25 },
  visible: (i) => ({ opacity: 1, y: 0, transition: { ...smoothTransition, delay: i * 0.12 } }),
};

const TripsDashboard = () => {
  const [upcoming, setUpcoming] = useState([]);
  const [past, setPast] = useState([]);
  const navigate = useNavigate(); // Initialize navigation

  // Added budget to form state
  const [tripForm, setTripForm] = useState({
    title: "", destination: "", startDate: "", endDate: "", budget: ""
  });

  useEffect(() => { fetchTrips(); }, []);

  const fetchTrips = async () => {
    try {
      const upcomingData = await getUpcomingTrips();
      const pastData = await getPastTrips();
      setUpcoming(upcomingData);
      setPast(pastData);
    } catch (err) { console.error("Error loading trips:", err); }
  };

  const handleChange = (e) => {
    setTripForm({ ...tripForm, [e.target.name]: e.target.value });
  };

  const handleCreateTrip = async () => {
    if (!tripForm.title || !tripForm.destination) return alert("Missing fields");
    try {
      await createTrip(tripForm);
      setTripForm({ title: "", destination: "", startDate: "", endDate: "", budget: "" });
      fetchTrips();
    } catch (err) { console.error("Error creating trip:", err); }
  };

  const handleDuplicateTrip = async (tripId) => {
    /* (Keep your existing logic here) */
    try {
        const response = await fetch(`http://localhost:5001/trips/${tripId}/duplicate`, { method: "POST" });
        if (response.ok) { alert("Trip duplicated!"); fetchTrips(); }
    } catch (error) { console.error("Duplicate error:", error); }
  };

  const handleDeleteTrip = async (id) => {
    if (!window.confirm("Delete this trip?")) return;
    try { await deleteTrip(id); fetchTrips(); } catch (err) { console.error(err); }
  };

  return (
    <div style={{
        backgroundImage: `url(${bgImage})`, backgroundSize: "cover", backgroundPosition: "center",
        minHeight: "100vh", padding: "30px", backdropFilter: "blur(2px)",
    }}>
      <motion.h1 
        style={{ textAlign: "center", color: "white", background: "rgba(0,0,0,0.5)", padding: "10px", borderRadius: "10px" }}
        initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}
      >
        TripSync : Plan, Pack and Go
      </motion.h1>

      <motion.div style={{
          textAlign: "center", marginBottom: "30px", padding: "20px", borderRadius: "12px",
          background: "rgba(255,255,255,0.3)", backdropFilter: "blur(6px)",
      }}>
        {/* Updated Inputs to include Budget */}
        <input type="text" name="title" placeholder="Trip Title" value={tripForm.title} onChange={handleChange} className="input-box"/>
        <input type="text" name="destination" placeholder="Destination" value={tripForm.destination} onChange={handleChange} className="input-box"/>
        <input type="number" name="budget" placeholder="Budget ($)" value={tripForm.budget} onChange={handleChange} className="input-box" style={{width:'100px'}}/>
        <input type="date" name="startDate" value={tripForm.startDate} onChange={handleChange} className="input-box"/>
        <input type="date" name="endDate" value={tripForm.endDate} onChange={handleChange} className="input-box"/>
        <button className="btn-create" onClick={handleCreateTrip}>Add Trip</button>
      </motion.div>

      <h3 style={{ color: "white", textAlign: "center" }}>Upcoming Trips</h3>
      {upcoming.map((trip, index) => (
        <motion.div key={trip._id} custom={index} variants={cardVariants} initial="hidden" animate="visible"
          style={{ padding: "18px", margin: "12px auto", width: "70%", background: "rgba(255,255,255,0.8)", borderRadius: "12px" }}>
          
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div>
                <strong>{trip.title}</strong> — {trip.destination}<br />
                <small>Budget: ${trip.budget || 0}</small>
            </div>
            
            {/* The Manage Button connects to FR-4 and FR-13 */}
            <div>
                <button 
                    onClick={() => navigate(`/trip/${trip._id}`)} 
                    style={{ background: "#4caf50", color: "white", marginRight: "10px", padding: "8px 12px", borderRadius: "5px", border: "none", cursor: "pointer" }}
                >
                    Manage (Plan/Budget)
                </button>
                <button onClick={() => handleDuplicateTrip(trip._id)} className="btn-duplicate">Copy</button>
                <button onClick={() => handleDeleteTrip(trip._id)} className="btn-delete" style={{marginLeft:'10px'}}>Delete</button>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default TripsDashboard;

