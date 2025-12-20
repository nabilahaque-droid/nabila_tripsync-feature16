const axios = require("axios");

exports.getWeather = async (req, res) => {
    const city = req.params.city;

    try {
        const response = await axios.get(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.OPENWEATHER_API_KEY}&units=metric`
        );

        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: "Unable to fetch weather" });
    }
};
