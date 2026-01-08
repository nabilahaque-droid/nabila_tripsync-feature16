const mongoose = require("mongoose");

const expenseSchema = new mongoose.Schema({
  tripId: { type: mongoose.Schema.Types.ObjectId, ref: "Trip", required: true },
  category: { type: String, required: true },
  amount: { type: Number, required: true, min: 0 },
  note: { type: String },
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Expense", expenseSchema);
