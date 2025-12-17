const mongoose = require("mongoose");

const currencyRateSchema = new mongoose.Schema({
  base: {
    type: String,
    required: true,
    uppercase: true
  },
  target: {
    type: String,
    required: true,
    uppercase: true
  },
  rate: {
    type: Number,
    required: true
  },
  fetchedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("CurrencyRate", currencyRateSchema);
