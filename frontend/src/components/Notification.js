import React from "react";

const Notification = ({ tasks }) => {
  return (
<<<<<<< HEAD
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
=======
    <div className="relative">
      <div
        id="notification-icon"
        onClick={toggleModal}
        className="cursor-pointer"
      >
        <img
          src="bell_icon.png"
          alt="Notification Bell"
          style={{ width: "22px", height: "22px" }}
        />
      </div>
      {
        <div className="absolute right-0 z-10 mt-2 h-64 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div>
            <h2 className="text-1xl font-outfit">
              Tasks Due in the Next 2 Days:
            </h2>
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
        </div>
      }
>>>>>>> c47e1af7b04a71bf0ece78360fab75abc3714329
    </div>
  );
};
export default Notification;
