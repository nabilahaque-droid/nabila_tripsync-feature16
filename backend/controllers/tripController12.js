import axios from "axios";

export const shareTripToDiscord = async (req, res) => {
  try {
    const { title, destination, startDate } = req.body;
    const webhookUrl = process.env.DISCORD_WEBHOOK_URL;

    const daysLeft = Math.ceil(
      (new Date(startDate) - new Date()) / (1000 * 60 * 60 * 24)
    );

    const message = {
      embeds: [
        {
          title: "✈️ Trip Countdown",
          description: `**${title}**\nDestination: ${destination}`,
          fields: [
            { name: "Days Left", value: `${daysLeft} days`, inline: true }
          ],
          color: 0xF2A2C0
        }
      ]
    };

    await axios.post(webhookUrl, message);
    res.json({ success: true, message: "Shared to Discord successfully" });
  } catch (err) {
    res.status(500).json({ error: "Discord sharing failed" });
  }
};
