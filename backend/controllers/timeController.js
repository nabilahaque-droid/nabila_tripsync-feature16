const Trip = require('../models/Time');
const axios = require('axios');

exports.getDestinationTime = async (req, res) => {
    try {
        const { city } = req.params; // Expecting city name or area/city
        const response = await axios.get(`http://worldtimeapi.org/api/timezone/${city}`);
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ message: "Error fetching timezone" });
    }
};