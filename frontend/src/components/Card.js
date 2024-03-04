import { motion } from "framer-motion";
import { useState } from "react";
import React from "react";
import "./Card.css";
import triangle from "../assets/triangle.png";

function Card({ title, dueDate, category, timeEst, body }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="App">
      <motion.div
        transition={{ layout: { duration: 1, type: "spring" } }}
        layout
        onClick={() => setIsOpen(!isOpen)}
        className="card"
      >
        <div className="card-header">
          <motion.img
            src={triangle}
            alt="triangle"
            layout="position"
            animate={{ rotate: isOpen ? 180 : 0 }}
            className="triangle"
            transition={{ layout: { duration: 2, type: "spring" } }}
          ></motion.img>
          <motion.h2 layout="position" className="title">
            {title}
          </motion.h2>
          <motion.h2 layout="position" className="dueDate">
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
            <div className="extra-header">
              <h2 className="category">{category}</h2>
              <h2 className="timeEst">{timeEst} hours</h2>
            </div>
            <motion.div className="body">
              <p>{body}</p>
            </motion.div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}

export default Card;
