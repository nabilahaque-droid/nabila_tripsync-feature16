const express = require("express");
const { getFlightStatus } = require("../controllers/flightController");

const router = express.Router();

router.get("/:flightNumber", getFlightStatus);

module.exports = router;
