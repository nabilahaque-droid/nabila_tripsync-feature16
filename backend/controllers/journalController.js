const Journal = require("../models/Journal");

// Create entry
exports.createJournal = async (req, res) => {
  try {
    const journal = new Journal(req.body);
    const saved = await journal.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Get journals of a trip
exports.getJournals = async (req, res) => {
  try {
    const journals = await Journal.find({ tripId: req.params.tripId });
    res.json(journals);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete entry
exports.deleteJournal = async (req, res) => {
  try {
    await Journal.findByIdAndDelete(req.params.id);
    res.json({ message: "Journal entry deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
