const express = require("express");
const router = express.Router();
const journalController = require("../controllers/journalController");

router.post("/", journalController.createJournal);
router.get("/:tripId", journalController.getJournals);
router.delete("/:id", journalController.deleteJournal);

module.exports = router;
