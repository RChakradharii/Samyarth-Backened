import React from "react";
import TaskItem from "./TaskItem"; // TaskItem ko import karte hain
import "./../styles/TaskList.css";

const TaskList = ({ tasks, deleteTask }) => {
  return (
    <div className="task-container">
      <div className="task-card">
        <div className="task-list">
          {/* Loop through tasks and pass to TaskItem */}
          {tasks.map((task) => (
            <TaskItem key={task._id} task={task} deleteTask={deleteTask} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TaskList;
