const mongoose = require("mongoose");

const journalSchema = new mongoose.Schema({
  tripId: { type: mongoose.Schema.Types.ObjectId, ref: "Trip", required: true },
  text: { type: String, required: true },
  photo: { type: String }, // Cloudinary or local URL
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Journal", journalSchema);
