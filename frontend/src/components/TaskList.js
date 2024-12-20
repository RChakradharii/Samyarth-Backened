import React from "react";
import TaskItem from "./TaskItem"; // TaskItem ko import karte hain
import "./../styles/TaskList.css";

const TaskList = ({ tasks, deleteTask, editTask }) => {
  return (
    <div className="task-list">
      {tasks.map((task) => (
        <TaskItem
          key={task._id}
          task={task}
          deleteTask={deleteTask}
          editTask={editTask}  // Pass editTask to TaskItem
        />
      ))}
    </div>
  );
};


export default TaskList;
