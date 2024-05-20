import { motion } from "framer-motion";
import React from "react";
import "./Card.css";
import triangle from "../assets/triangle.png";
// front/back end connection
import axios from "axios";
import { useState, useEffect } from "react";

function Card({ setActiveCard, taskId, title, dueDate, category, timeEst, body, onDelete, onEdit }) {
  const [isOpen, setIsOpen] = useState(false);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetchAll().then((result) => {
      if (result) {
        // console.log("TESTINGgg: " + JSON.stringify(result));
        setTasks(result.data.users);
        // console.log("single task: " + JSON.stringify(tasks));
      } else {
        // console.log("ERROR: " + JSON.stringify(result));
      }
    });
  }, []);

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
    <div className="App">
      <motion.div
        transition={{ layout: { duration: 1, type: "spring" } }}
        layout
        draggable
        style={{ userSelect: 'none' }}
        onDragStart={() => setActiveCard(taskId)}
        onDragEnd={() => setActiveCard(null)}
        // onDragEnd={() => setTimeout(() => setActiveCard(null), 5000)}
        className="card flex text-gray-600 flex-col p-4 pt-2 rounded-2xl drop-shadow-lg bg-white  font-inter w-80 text-left"
      >
        <div className="card-header flex justify-between items-center mb-2">
          <motion.img
            src={triangle}
            alt="triangle"
            layout="position"
            onClick={() => setIsOpen(!isOpen)}
            animate={{ rotate: isOpen ? 180 : 0 }}
            className="triangle"
            transition={{ layout: { duration: 2, type: "spring" } }}
          ></motion.img>
          <motion.h2
            layout="position"
            className="title text-left font-semibold w-1/2 flex items-start text-ellipsis overflow-hidden"
          >
            {title}
          </motion.h2>
          <motion.h2
            layout="position"
            className="dueDate rounded-full p-2 bg-gray-100"
          >
            {dueDate}
          </motion.h2>
        </div>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="card-body"
          >
            <div className="extra-header mb-2 text-center flex justify-between">
              <h2 className="category p-2.5 rounded-full bg-gray-100">
                {category}
              </h2>
              <h2 className="timeEst p-2.5 rounded-full bg-gray-100">
                {timeEst} hours
              </h2>
            </div>
            <motion.div className="body">
              <p>{body}</p>
            </motion.div>
            <div className="flex justify-between mt-4">
              <button
                onClick={() => onDelete(taskId)}
                className="text-red-500 hover:bg-gray-100 font-semibold py-2 px-4 rounded"
              >
                Delete
              </button>
              <button
                onClick={() => onEdit(taskId)}
                className="text-blue-500 hover:bg-gray-100 font-semibold py-2 px-4 rounded"
              >
                Edit
              </button>
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}

export default Card;

