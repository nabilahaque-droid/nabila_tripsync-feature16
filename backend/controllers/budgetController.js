import axios from "axios";

export const getBudgetRecommendation = async (req, res) => {
  const { destination, days, pastSpending } = req.body;

  const prompt = `Suggest a travel budget for ${destination} for ${days} days.
Past spending pattern: ${pastSpending}. Give category-wise budget.`;

  try {
    const response = await axios.post(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        model: "llama3-70b-8192",
        messages: [{ role: "user", content: prompt }]
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.GROQ_API_KEY}`
        }
      }
    );

    res.json({ recommendation: response.data.choices[0].message.content });
  } catch (error) {
    res.status(500).json({ error: "AI Budget generation failed" });
  }
};