import React, { useState, useEffect } from "react";
import axios from "../src/axios/api";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import "./App.css";

const App = () => {
  const [tasks, setTasks] = useState([]);

  // Fetch tasks from backend
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get("/tasks");
        setTasks(response.data);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };
    fetchTasks();
  }, []);

  // Add a new task
  const addTask = async (newTask) => {
    try {
      const response = await axios.post("/tasks", newTask);
      console.log("Task added:", response.data);  // Log the added task
      setTasks((prevTasks) => [response.data, ...prevTasks]); // Ensure we add the new task
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };
  
  

  // Delete a task
  const deleteTask = async (taskId) => {
    try {
      await axios.delete(`/tasks/${taskId}`);
      setTasks(tasks.filter((task) => task._id !== taskId));  // Update state after deleting task
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  return (
    <div className="app">
      <div className="app-container">
        <h2>Task Manager</h2>
        <TaskForm addTask={addTask} />
        {/* Pass tasks as a prop to TaskList */}
        <TaskList tasks={tasks} deleteTask={deleteTask} />
      </div>
    </div>
  );
};

export default App;
