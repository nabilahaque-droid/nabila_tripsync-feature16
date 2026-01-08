import React, { useState, useEffect } from "react";
import {
  createTrip,
  getUpcomingTrips,
  getPastTrips,
  updateTrip,
  deleteTrip,
} from "../api/trips";

import { motion } from "framer-motion";

const smoothTransition = {
  duration: 0.7,
  ease: [0.25, 0.1, 0.25, 1.0],
};

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
  const [editingTripId, setEditingTripId] = useState(null);
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);

  const [tripForm, setTripForm] = useState({
    title: "",
    destination: "",
    startDate: "",
    endDate: "",
  });

  useEffect(() => {
    fetchTrips();
  }, []);

  const toInputDate = (value) => {
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return "";
    return date.toISOString().slice(0, 10);
  };

  const resetForm = () => {
    setTripForm({ title: "", destination: "", startDate: "", endDate: "" });
    setEditingTripId(null);
    setError("");
  };

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
    if (!tripForm.title || !tripForm.destination) {
      setError("Please add a title and destination.");
      return;
    }

    try {
      setStatus("");
      setError("");
      if (editingTripId) {
        await updateTrip(editingTripId, tripForm);
        setStatus("Trip updated successfully.");
      } else {
        await createTrip(tripForm);
        setStatus("Trip added successfully.");
        setShowSuccess(true);
      }
      resetForm();
      fetchTrips();
    } catch (err) {
      console.error("Error saving trip:", err);
      const message =
        err?.response?.data?.message ||
        err?.message ||
        "Unable to save trip. Please try again.";
      setError(message);
    }
  };

  const handleEditTrip = (trip) => {
    setTripForm({
      title: trip.title || "",
      destination: trip.destination || "",
      startDate: toInputDate(trip.startDate),
      endDate: toInputDate(trip.endDate),
    });
    setEditingTripId(trip._id);
  };

  const handleCancelEdit = () => {
    resetForm();
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
    <div className="dashboard-panel">
      {status && <p className="tool-status success">{status}</p>}
      {error && <p className="tool-error">{error}</p>}

      <motion.div
        className="dashboard-form"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={smoothTransition}
      >
        <div className="dashboard-inputs">
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
        </div>
        <div className="dashboard-actions">
          <motion.button
            className="btn-create"
            onClick={handleCreateTrip}
            whileHover={{ scale: 1.07 }}
            whileTap={{ scale: 0.93 }}
          >
            {editingTripId ? "Save Changes" : "Add Trip"}
          </motion.button>

          {editingTripId && (
            <motion.button
              className="btn-cancel"
              onClick={handleCancelEdit}
              whileHover={{ scale: 1.07 }}
              whileTap={{ scale: 0.93 }}
            >
              Cancel
            </motion.button>
          )}
        </div>
      </motion.div>

      <div className="dashboard-section">
        <h3 className="dashboard-heading">Upcoming Trips</h3>
        <div className="dashboard-list">
          {upcoming.map((trip, index) => (
            <motion.div
              key={trip._id}
              custom={index}
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              className="trip-card"
            >
              <div className="trip-card__title">
                <strong>{trip.title}</strong>
                <span>{trip.destination}</span>
              </div>
              <div className="trip-card__dates">
                {new Date(trip.startDate).toDateString()} to{" "}
                {new Date(trip.endDate).toDateString()}
              </div>
              <div className="trip-card__actions">
                <motion.button
                  className="btn-edit"
                  onClick={() => handleEditTrip(trip)}
                  whileHover={{ scale: 1.07 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Edit
                </motion.button>

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
        </div>
      </div>

      <div className="dashboard-section">
        <h3 className="dashboard-heading">Past Trips</h3>
        <div className="dashboard-list">
          {past.map((trip, index) => (
            <motion.div
              key={trip._id}
              custom={index}
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              className="trip-card"
            >
              <div className="trip-card__title">
                <strong>{trip.title}</strong>
                <span>{trip.destination}</span>
              </div>
              <div className="trip-card__dates">
                {new Date(trip.startDate).toDateString()} to{" "}
                {new Date(trip.endDate).toDateString()}
              </div>
              <div className="trip-card__actions">
                <motion.button
                  className="btn-edit"
                  onClick={() => handleEditTrip(trip)}
                  whileHover={{ scale: 1.07 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Edit
                </motion.button>

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
      </div>

      {showSuccess && (
        <div className="toast-overlay">
          <div className="toast-card">
            <div className="toast-body">
              <h4>Trip added</h4>
              <p>Your trip has been saved successfully.</p>
            </div>
            <button className="btn-primary" onClick={() => setShowSuccess(false)}>
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TripsDashboard;
