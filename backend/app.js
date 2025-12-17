const express = require("express");
const cors = require("cors");
const currencyRoutes = require("./routes/currencyRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/currency", currencyRoutes);

app.get("/", (req, res) => {
  res.send("TripSync Backend is running");
});

module.exports = app;
