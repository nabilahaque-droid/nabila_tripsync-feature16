const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Routes
const goalRoutes = require('./routes/goals');
const tripRoutes = require('./routes/trips');

app.use('/goals', goalRoutes);
app.use('/trips', tripRoutes);

// Root route
app.get('/', (req, res) => {
  res.send('Welcome to TripSync API');
});

// Start server
app.listen(PORT, () => {
  console.log(`✅ Server running at: http://localhost:${PORT}`);
});

const expenseRoutes = require("./routes/expenses");
app.use("/expenses", expenseRoutes);

const journalRoutes = require("./routes/journals");
app.use("/journals", journalRoutes);
