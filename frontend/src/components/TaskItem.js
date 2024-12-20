import React, { useState } from "react";
import "./../styles/TaskItem.css";

const TaskItem = ({ task, deleteTask, editTask }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [updatedTitle, setUpdatedTitle] = useState(task.title);
  const [updatedDescription, setUpdatedDescription] = useState(task.description);
  const [updatedPriority, setUpdatedPriority] = useState(task.priority);

  const priorityColors = {
    High: "red",
    Medium: "orange",
    Low: "green",
  };

  const handleEditClick = () => {
    if (isEditing) {
      
      editTask(task._id, {
        title: updatedTitle,
        description: updatedDescription,
        priority: updatedPriority,  
      });
    }
    setIsEditing(!isEditing);
  };

  return (
    <div className="task-item">
      {isEditing ? (
        <>
          <input
            type="text"
            value={updatedTitle}
            onChange={(e) => setUpdatedTitle(e.target.value)}/>
          <textarea
            value={updatedDescription}
            onChange={(e) => setUpdatedDescription(e.target.value)}
          ></textarea>

          <select
            value={updatedPriority}
            onChange={(e) => setUpdatedPriority(e.target.value)}>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
        </>
      ) : (
        <>
          <h3>{task.title}</h3>
          <p>{task.description}</p>
          
          <span
            className="priority"
            style={{ backgroundColor: priorityColors[task.priority] }}
>
            {task.priority} 
          </span>
        </>
      )}

      <button className="delete-btn" onClick={() => deleteTask(task._id)}>
        Delete
      </button>
      <button onClick={handleEditClick}>
        {isEditing ? "Save" : "Edit"}
      </button>
    </div>
  );
};

export default TaskItem;
