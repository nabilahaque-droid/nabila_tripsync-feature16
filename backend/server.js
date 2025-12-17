const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
const goalRoutes = require('./routes/goals');
const tripRoutes = require('./routes/trips');
const expenseRoutes = require('./routes/expenses');
const journalRoutes = require('./routes/journals');
const weatherRoutes = require("./routes/weatherRoutes");
;

app.use('/goals', goalRoutes);
app.use('/trips', tripRoutes);
app.use('/expenses', expenseRoutes);
app.use('/journals', journalRoutes);
app.use("/api/weather", weatherRoutes);

// Root route
app.get('/', (req, res) => {
  res.send('Welcome to TripSync API');
});

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Start server
app.listen(PORT, () => {
  console.log(`✅ Server running at: http://localhost:${PORT}`);
});
