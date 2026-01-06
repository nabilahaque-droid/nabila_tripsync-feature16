const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const axios = require('axios'); // Required for your Timezone API
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(cors());
app.use(express.json());

// --- Routes Import ---
const goalRoutes = require('./routes/goals');
const tripRoutes = require('./routes/trips');
const expenseRoutes = require('./routes/expenses');
const journalRoutes = require('./routes/journals');
// Preserving your existing Weather/Lang routes
const weatherRoutes = require("./routes/weatherRoutes");
const langRoutes = require('./routes/langRoutes');

// --- Use Routes ---
app.use('/goals', goalRoutes);
app.use('/trips', tripRoutes);
app.use('/expenses', expenseRoutes);
app.use('/journals', journalRoutes);
// Preserving your existing Weather/Lang endpoints
app.use("/api/weather", weatherRoutes);
app.use('/api/language', langRoutes);

// --- FR17: TimeZoneDB Implementation ---
app.get('/api/timezone/:area/:city', async (req, res) => {
    const { area, city } = req.params;
    const apiKey = process.env.TIMEZONE_API_KEY; 
    
    // TimeZoneDB uses "Area/City" format
    const zone = `${area}/${city}`; 
    const url = `http://api.timezonedb.com/v2.1/get-time-zone?key=${apiKey}&format=json&by=zone&zone=${zone}`;

    try {
        const response = await axios.get(url);
        
        if (response.data.status === "FAILED") {
            return res.status(404).json({ message: "Location not found 🌸" });
        }

        res.json({
            timezone: response.data.zoneName,
            datetime: response.data.formatted, 
            abbreviation: response.data.abbreviation,
            country: response.data.countryName
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "API Error ❌" });
    }
});

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