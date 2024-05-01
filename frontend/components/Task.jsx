import React from "react";

const Task = ({ task }) => {

  return (
    <div key={task.id} className="task">
      <p>{task.title}</p>
      <p>{task.description}</p>
      <p>{task.date}</p>
      <p>{task.duration}</p>
      <p className="category">({task.category})</p>
      {/* <input type="checkbox" checked={task.isCompleted} /> */}
      <div>
        <button className="done">Done</button>
        <button className="remove">X</button>
      </div>
    </div>
  );
};

export default Task;
