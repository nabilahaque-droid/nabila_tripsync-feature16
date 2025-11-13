const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose'); // <-- Add this
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('✅ MongoDB connected'))
.catch((err) => console.error('MongoDB connection error:', err));

// Routes
const goalRoutes = require('./routes/goals');
app.use('/goals', goalRoutes);

// Root route
app.get('/', (req, res) => {
  res.send('Welcome to TripSync API');
});

// Start the server
app.listen(PORT, () => {
  console.log(`✅ Server running at: http://localhost:${PORT}`);
});
