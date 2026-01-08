const axios = require("axios");

exports.getWeather = async (req, res) => {
    const city = req.params.city;
    const apiKey = process.env.OPENWEATHER_API_KEY;

    if (!apiKey) {
        return res
            .status(500)
            .json({ error: "Weather service is not configured. Missing API key." });
    }

    try {
        const response = await axios.get(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
        );

        res.json(response.data);
    } catch (error) {
        const status = error?.response?.status || 500;
        const message =
            error?.response?.data?.message ||
            "Unable to fetch weather. Check the city name or API key.";
        res.status(status).json({ error: message });
    }
};
