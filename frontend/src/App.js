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
      setTasks((prevTasks) => [response.data, ...prevTasks]); // Update the tasks list
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  // Delete a task
  const deleteTask = async (taskId) => {
    try {
      await axios.delete(`/tasks/${taskId}`);
      setTasks(tasks.filter((task) => task._id !== taskId)); // Remove the deleted task from list
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };


  //Edit a task
  const editTask = async (taskId, updatedTask) => {
    try {
      const response = await axios.put(`/tasks/${taskId}`, updatedTask);
      setTasks(tasks.map((task) => (task._id === taskId ? response.data : task)));
    } catch (error) {
      console.error("Error editing task:", error);
    }
  };
  

  return (
    <div className="app">
      <div className="app-container">
        <h2>Task Manager</h2>
        {/* TaskForm component for adding task */}
        <TaskForm addTask={addTask} />
      </div>
      {/* TaskList component to display tasks outside app-container */}
      <TaskList
        tasks={tasks}
        deleteTask={deleteTask}
        editTask={editTask} 
      />
    </div>
  );
  
};
export default App;
