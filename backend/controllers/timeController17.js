import axios from "axios";

// Popular city → timezone mapping
const cityToZone = {
  Dhaka: "Asia/Dhaka",
  Tokyo: "Asia/Tokyo",
  London: "Europe/London",
  "New York": "America/New_York",
  Paris: "Europe/Paris",
  Sydney: "Australia/Sydney",
  "Los Angeles": "America/Los_Angeles"
};

export const getTimeByCity = async (req, res) => {
  try {
    const { city } = req.query;
    if (!city) return res.status(400).json({ message: "City is required" });

    const zone = cityToZone[city];
    if (!zone) return res.status(404).json({ message: "City not supported" });

    const url = `http://api.timezonedb.com/v2.1/get-time-zone`;
    const response = await axios.get(url, {
      params: {
        key: process.env.TIMEZONEDB_API_KEY,
        format: "json",
        by: "zone",
        zone: zone
      }
    });

    if (response.data.status !== "OK") {
      return res.status(404).json({ message: "Timezone not found" });
    }

    res.json({
      city,
      timezone: response.data.abbreviation,
      localTime: response.data.formatted
    });

  } catch (err) {
    console.error(err.message); // Log error in backend
    res.status(500).json({ message: "Failed to fetch time" });
  }
};
