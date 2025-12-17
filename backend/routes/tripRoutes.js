const express = require('express');
const router = express.Router();
const tripController = require('../controllers/tripController');

// FR17: Get timezone data
router.get('/timezone/:area/:city', timeController.getDestinationTime);

module.exports = router;