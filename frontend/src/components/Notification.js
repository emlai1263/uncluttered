import React from "react";

const Notification = ({ tasks }) => {
  return (
    <div className="absolute right-40 z-10 mt-2 h-64 w-48 top-20 rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
      <h2 className="text-1xl font-outfit">Tasks Due in the Next 2 Days:</h2>
      {tasks && tasks.length > 0 ? (
        <ul>
          {tasks.map((task) => (
            <li key={task.id}>
              {task.title} - {task.dueDate}
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-1xl font-outfit rounded-md py-2">None.</p>
      )}
    </div>
  );
};
export default Notification;
