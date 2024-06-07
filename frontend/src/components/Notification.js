//Main Author: Arya Ramchander
import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";
function Notification() {
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  useEffect(() => {
    fetchAll().then((result) => {
      if (result) {
        setTasks(result.data.users);
      } else {
      }
    }, []);
  });
  useEffect(() => {
    if (tasks.length > 0) {
      const now = moment().startOf("day");
      const inTwoDays = moment().add(2, "days");
      const tasksDueSoon = tasks.filter((task) =>
        moment(task.dueDate).isBetween(now, inTwoDays, null, "[]")
      );
      setFilteredTasks(tasksDueSoon);
    }
  }, [tasks]);
  async function fetchAll() {
    try {
      const response = await axios.get(
        "http://localhost:8000/tasks/66105e818b0d26a8a1670626"
      );
      return response;
    } catch (error) {
      //We're not handling errors. Just logging into the console.
      console.log(error);
      return false;
    }
  }
  return (
    <div className="absolute right-40 z-10 mt-2 h-64 w-48 top-20 rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
      <h2 className="text-1xl font-outfit mx-2">
        Tasks Due in the Next 2 Days:
      </h2>
      <div className="max-h-48 overflow-y-auto px-2">
        {filteredTasks && filteredTasks.length > 0 ? (
          <ul>
            {filteredTasks.map((task) => (
              <li
                className="mb-1 text bg-sky font-outfit rounded-md mx-2 py-2 text-center"
                key={task.id}
              >
                {task.title}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-1xl font-outfit rounded-md px-2 py-2">None.</p>
        )}
      </div>
    </div>
  );
}
export default Notification;
