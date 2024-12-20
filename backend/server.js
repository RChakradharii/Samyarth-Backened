const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const Task = require("./models/Task");
const axios = require("axios");
const taskRoutes = require('./routes/taskRoutes');
const PRoutes = require('./routes/PRoutes');
require("dotenv").config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected!"))
  .catch((err) => console.error("MongoDB connection error:", err));

// OpenAI API function to get priority
const getAIPriority = async (description) => {
  const prompt = `Determine the priority for the following task based on its description: "${description}". Respond with "High", "Medium", or "Low".`;

  try {
    const response = await axios.post(
      "https://api.openai.com/v1/completions",
      {
        model: "text-davinci-003", // AI model
        prompt,
        max_tokens: 10,
        temperature: 0.5,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`, // Use OpenAI API Key from .env
        },
      }
    );
    return response.data.choices[0].text.trim(); // Extract the priority from the response
  } catch (error) {
    console.error("Error getting AI priority:", error);
    return "Medium"; // Default priority if API fails
  }
};

// Test Route
app.get("/", (req, res) => {
  res.send("Backend is running!");
});

// Create a new task
app.post("/tasks", async (req, res) => {
  try {
    const { title, description } = req.body;
    const priority = await getAIPriority(description); // Get AI-generated priority

    const newTask = new Task({
      title,
      description,
      priority, // Store AI priority in the task
    });

    await newTask.save();
    res.status(201).json(newTask); // Send the new task with priority
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get all tasks
app.get("/tasks", async (req, res) => {
  try {
    const tasks = await Task.find();
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update a task
app.put("/tasks/:id", async (req, res) => {
  try {
    const { title, description, priority } = req.body;
    const task = await Task.findByIdAndUpdate(
      req.params.id,
      { title, description, priority },
      { new: true }
    );
    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete a task
app.delete("/tasks/:id", async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Task deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
