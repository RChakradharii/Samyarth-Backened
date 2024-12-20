// controllers/priorityController.js
const axios = require("axios");

const getAIPriority = async (req, res) => {
  const { description } = req.body;

  if (!description) {
    return res.status(400).json({ message: "Description is required" });
  }

  try {
    const prompt = `Determine the priority for the following task based on its description: "${description}". Respond with "High", "Medium", or "Low".`;

    const response = await axios.post(
      "https://api.openai.com/v1/completions", 
      {
        model: "text-davinci-003", 
        prompt,
        max_tokens: 10,
        temperature: 0.5,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        },
      }
    );

    const priority = response.data.choices[0].text.trim();
    res.status(200).json({ priority });
  } catch (error) {
    console.error("Error fetching AI priority:", error);
    res.status(500).json({ message: "Error fetching AI priority" });
  }
};

module.exports = { getAIPriority };
