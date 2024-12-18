const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const Task = require("./models/Task"); // Import the Task model
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

// Test Route
app.get("/", (req, res) => {
  res.send("Backend is running!");
});

// Create a new task
app.post("/tasks", async (req, res) => {
  try {
    const { title, description } = req.body;
    const newTask = new Task({
      title,
      description,
    });

    await newTask.save();
    res.status(201).json(newTask);
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
