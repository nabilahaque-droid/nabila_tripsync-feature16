import React, { useState, useEffect } from "react";
import {
  createTrip,
  getUpcomingTrips,
  getPastTrips,
  deleteTrip
} from "../api/trips";

import { motion } from "framer-motion";
import bgImage from "../assets/landscape.jpg"; // Background image

// Smooth transition
const smoothTransition = {
  duration: 0.7,
  ease: [0.25, 0.1, 0.25, 1.0],
};

// Card animation variants
const cardVariants = {
  hidden: { opacity: 0, y: 25 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { ...smoothTransition, delay: i * 0.12 },
  }),
};

const TripsDashboard = () => {
  const [upcoming, setUpcoming] = useState([]);
  const [past, setPast] = useState([]);

  const [tripForm, setTripForm] = useState({
    title: "",
    destination: "",
    startDate: "",
    endDate: "",
  });

  useEffect(() => {
    fetchTrips();
  }, []);

  const fetchTrips = async () => {
    try {
      const upcomingData = await getUpcomingTrips();
      const pastData = await getPastTrips();
      setUpcoming(upcomingData);
      setPast(pastData);
    } catch (err) {
      console.error("Error loading trips:", err);
    }
  };

  const handleChange = (e) => {
    setTripForm({ ...tripForm, [e.target.name]: e.target.value });
  };

  const handleCreateTrip = async () => {
    if (!tripForm.title || !tripForm.destination)
      return alert("Missing fields");

    try {
      await createTrip(tripForm);
      setTripForm({ title: "", destination: "", startDate: "", endDate: "" });
      fetchTrips();
    } catch (err) {
      console.error("Error creating trip:", err);
    }
  };

  const handleDuplicateTrip = async (tripId) => {
    try {
      const response = await fetch(
        `http://localhost:5001/trips/${tripId}/duplicate`,
        { method: "POST" }
      );

      const data = await response.json();

      if (response.ok) {
        alert("Trip duplicated successfully!");
        fetchTrips();
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error("Duplicate error:", error);
    }
  };

  const handleDeleteTrip = async (id) => {
    if (!window.confirm("Delete this trip?")) return;
    try {
      await deleteTrip(id);
      fetchTrips();
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  return (
    <div
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
        padding: "30px",
        backdropFilter: "blur(2px)",
      }}
    >

      {/* ======================= NEW HEADER ======================= */}
      <motion.h1
        style={{
          textAlign: "center",
          fontSize: "42px",
          fontWeight: "800",
          padding: "18px 0",
          marginBottom: "25px",
          color: "white",
          letterSpacing: "1px",
          borderRadius: "14px",
          background: "rgba(0,0,0,0.45)", // elegant frosted black glass
          backdropFilter: "blur(6px)",
          textShadow: "0 0 10px rgba(0,0,0,0.7)",
          width: "80%",
          marginLeft: "auto",
          marginRight: "auto",
        }}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={smoothTransition}
      >
        TripSync : Plan, Pack and Go
      </motion.h1>
      {/* ========================================================== */}

      {/* Form */}
      <motion.div
        style={{
          textAlign: "center",
          marginBottom: "30px",
          padding: "20px",
          borderRadius: "12px",
          background: "rgba(255,255,255,0.3)",
          backdropFilter: "blur(6px)",
        }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={smoothTransition}
      >
        <input
          type="text"
          name="title"
          placeholder="Trip Title"
          value={tripForm.title}
          onChange={handleChange}
          className="input-box"
        />
        <input
          type="text"
          name="destination"
          placeholder="Destination"
          value={tripForm.destination}
          onChange={handleChange}
          className="input-box"
        />
        <input
          type="date"
          name="startDate"
          value={tripForm.startDate}
          onChange={handleChange}
          className="input-box"
        />
        <input
          type="date"
          name="endDate"
          value={tripForm.endDate}
          onChange={handleChange}
          className="input-box"
        />

        <motion.button
          className="btn-create"
          onClick={handleCreateTrip}
          whileHover={{ scale: 1.07 }}
          whileTap={{ scale: 0.93 }}
        >
          Add Trip
        </motion.button>
      </motion.div>

      {/* Upcoming Trips */}
      <h3 style={{ color: "white", textAlign: "center", marginTop: "20px" }}>
        Upcoming Trips
      </h3>

      {upcoming.map((trip, index) => (
        <motion.div
          key={trip._id}
          custom={index}
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          style={{
            padding: "18px",
            margin: "12px auto",
            width: "70%",
            background: "rgba(255,255,255,0.4)",
            backdropFilter: "blur(4px)",
            borderRadius: "12px",
          }}
        >
          <strong>{trip.title}</strong> — {trip.destination}
          <br />
          {new Date(trip.startDate).toDateString()} →{" "}
          {new Date(trip.endDate).toDateString()}

          <div style={{ marginTop: "10px" }}>
            <motion.button
              className="btn-duplicate"
              onClick={() => handleDuplicateTrip(trip._id)}
              whileHover={{ scale: 1.07 }}
              whileTap={{ scale: 0.95 }}
            >
              Duplicate
            </motion.button>

            <motion.button
              className="btn-delete"
              onClick={() => handleDeleteTrip(trip._id)}
              whileHover={{ scale: 1.07 }}
              whileTap={{ scale: 0.95 }}
            >
              Delete
            </motion.button>
          </div>
        </motion.div>
      ))}

      {/* Past Trips */}
      <h3 style={{ color: "white", textAlign: "center", marginTop: "20px" }}>
        Past Trips
      </h3>

      {past.map((trip, index) => (
        <motion.div
          key={trip._id}
          custom={index}
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          style={{
            padding: "18px",
            margin: "12px auto",
            width: "70%",
            background: "rgba(255,255,255,0.4)",
            backdropFilter: "blur(4px)",
            borderRadius: "12px",
          }}
        >
          <strong>{trip.title}</strong> — {trip.destination}
          <br />
          {new Date(trip.startDate).toDateString()} →{" "}
          {new Date(trip.endDate).toDateString()}

          <div style={{ marginTop: "10px" }}>
            <motion.button
              className="btn-duplicate"
              onClick={() => handleDuplicateTrip(trip._id)}
              whileHover={{ scale: 1.07 }}
              whileTap={{ scale: 0.95 }}
            >
              Duplicate
            </motion.button>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default TripsDashboard;


