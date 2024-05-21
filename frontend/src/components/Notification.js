import React, { useState } from "react";
import bellIcon from "./bell_icon.svg";

const Notification = ({ tasks }) => {
  const [isModalOpen, setIsModalOpen] = useState(false); // State to manage the visibility of the modal window

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <div className="relative">
      <div
        id="notification-icon"
        alt=""
        onClick={toggleModal}
        className="cursor-pointer"
      >
        <img src={bellIcon} alt="" style={{ width: "32px", height: "32px" }} />
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
    </div>
  );
};

export default Notification;
