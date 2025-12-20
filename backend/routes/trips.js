const express = require('express');
const router = express.Router();
const tripController = require('../controllers/tripController');

// Create trip
router.post('/', tripController.createTrip);

// Get all trips
router.get('/', tripController.getAllTrips);

// Upcoming trips
router.get('/upcoming', tripController.getUpcomingTrips);

// Past trips
router.get('/past', tripController.getPastTrips);

// -----------------------------
// FR-3: Duplicate Trip Route
// -----------------------------
router.post('/:id/duplicate', tripController.duplicateTrip);

// Update trip
router.put('/:id', tripController.updateTrip);

// Delete trip
router.delete('/:id', tripController.deleteTrip);

module.exports = router;
