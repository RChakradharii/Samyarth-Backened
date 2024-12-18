const Task = require('../models/Task');

// Get all tasks
const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find().sort({ createdAt: -1 });
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Add a new task
const createTask = async (req, res) => {
  const { title, description } = req.body;

  // Determine priority based on description
  let priority = 'Low';
  if (description.toLowerCase().includes('urgent') || description.toLowerCase().includes('deadline')) {
    priority = 'High';
  } else if (description.toLowerCase().includes('important')) {
    priority = 'Medium';
  }

  try {
    const task = await Task.create({ title, description, priority });
    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a task
const updateTask = async (req, res) => {
  const { id } = req.params;
  const { title, description, priority } = req.body;

  try {
    const updatedTask = await Task.findByIdAndUpdate(
      id,
      { title, description, priority },
      { new: true }
    );
    res.status(200).json(updatedTask);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a task
const deleteTask = async (req, res) => {
  const { id } = req.params;

  try {
    await Task.findByIdAndDelete(id);
    res.status(200).json({ message: 'Task deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getTasks, createTask, updateTask, deleteTask };
