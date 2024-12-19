import React, { useState } from "react";
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
        onChange={(e) => setDescription(e.target.value)}>
      </textarea>


      <select
        value={priority}
        onChange={(e) => setPriority(e.target.value)}
      >
        <option value="High">High</option>
        <option value="Medium">Medium</option>
        <option value="Low">Low</option>
      </select>

      <button type="submit">Add Task</button>
    </form>
  );
};

export default TaskForm;
