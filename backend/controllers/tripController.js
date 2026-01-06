const Trip = require('../models/Trip');

// Create new trip
exports.createTrip = async (req, res) => {
  try {
    const trip = new Trip(req.body);
    const savedTrip = await trip.save();
    res.status(201).json(savedTrip);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get all trips
exports.getAllTrips = async (req, res) => {
  try {
    const trips = await Trip.find().sort({ startDate: 1 });
    res.status(200).json(trips);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Upcoming trips
exports.getUpcomingTrips = async (req, res) => {
  try {
    const today = new Date();
    const trips = await Trip.find({ startDate: { $gte: today } }).sort({ startDate: 1 });
    res.status(200).json(trips);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Past trips
exports.getPastTrips = async (req, res) => {
  try {
    const today = new Date();
    const trips = await Trip.find({ endDate: { $lt: today } }).sort({ endDate: -1 });
    res.status(200).json(trips);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
// [NEW] FR-1: Update Trip (Edit)
exports.updateTrip = async (req, res) => {
  try {
    const { id } = req.params;
    // { new: true } returns the updated document so we can send it back to frontend
    const updatedTrip = await Trip.findByIdAndUpdate(id, req.body, { new: true });
    
    if (!updatedTrip) {
      return res.status(404).json({ message: "Trip not found" });
    }
    
    res.status(200).json(updatedTrip);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
// -----------------------------
// FR-3: Duplicate Trip
// -----------------------------
exports.duplicateTrip = async (req, res) => {
  try {
    const { id } = req.params;

    // Find original trip
    const originalTrip = await Trip.findById(id);
    if (!originalTrip) {
      return res.status(404).json({ message: 'Trip not found' });
    }

    // Create a new trip with copied fields
    const duplicatedTrip = new Trip({
      title: originalTrip.title + ' (Copy)',
      destination: originalTrip.destination,
      startDate: originalTrip.startDate,
      endDate: originalTrip.endDate,
      budget: originalTrip.budget,
      notes: originalTrip.notes,
      preferences: originalTrip.preferences,
      createdAt: new Date(),
    });

    await duplicatedTrip.save();

    res.status(201).json({
      message: 'Trip duplicated successfully',
      trip: duplicatedTrip,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error duplicating trip', error });
  }
};

// Delete a trip
exports.deleteTrip = async (req, res) => {
  try {
    const { id } = req.params;
    await Trip.findByIdAndDelete(id);
    res.status(200).json({ message: "Trip deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
