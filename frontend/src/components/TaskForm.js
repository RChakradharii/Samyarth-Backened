import React, { useState } from "react";
import axios from "axios"; // Axios for API requests
import "./../styles/TaskForm.css";

const TaskForm = ({ addTask }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("Medium");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !description) return alert("Both fields are required!");
    addTask({ title, description, priority });
    setTitle("");
    setDescription("");
    setPriority("Medium");
  };

  const fetchAISuggestion = async () => {
    if (!description) return alert("Please add a description first!");
    try {
      const res = await axios.post("http://localhost:5000/suggest-priority", {
        description,
      });
      setPriority(res.data.priority); // Set suggested priority
    } catch (err) {
      console.error("Error fetching AI suggestion:", err);
      alert("AI suggestion failed!");
    }
  };

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Task Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        placeholder="Task Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      ></textarea>
      <select value={priority} onChange={(e) => setPriority(e.target.value)}>
        <option value="High">High</option>
        <option value="Medium">Medium</option>
        <option value="Low">Low</option>
      </select>
      <button type="button" onClick={fetchAISuggestion}>
        Suggest Priority
      </button>
      <button type="submit">Add Task</button>
    </form>
  );
};

export default TaskForm;
