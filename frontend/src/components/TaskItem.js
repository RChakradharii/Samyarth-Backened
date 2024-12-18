import React from "react";
import "./../styles/TaskItem.css";

const TaskItem = ({ task, deleteTask }) => {
  const priorityColors = {
    High: "red",
    Medium: "orange",
    Low: "green",
  };

  return (
    <div className="task-item">
      <h3>{task.title}</h3>
      <p>{task.description}</p>
      <span
        className="priority"
        style={{ backgroundColor: priorityColors[task.priority] }}
      >
        {task.priority}
      </span>
      <button className="delete-btn" onClick={() => deleteTask(task._id)}>
        Delete
      </button>
    </div>
  );
};

export default TaskItem;
