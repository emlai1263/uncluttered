import { motion } from "framer-motion";
import React from "react";
import "./Card.css";
import triangle from "../assets/triangle.png";
// front/back end connection
import axios from "axios";
import {useState, useEffect} from 'react';

function Card({ title, dueDate, category, timeEst, body }) {
  const [isOpen, setIsOpen] = useState(false);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetchAll().then( result => {
      if (result) {
        // console.log("TESTINGgg: " + JSON.stringify(result));
        setTasks(result.data.users);
        console.log("single task: " + JSON.stringify(tasks));
    } else {
        // console.log("ERROR: " + JSON.stringify(result));
    }
     });
  }, [] );

  async function fetchAll(){
    try {
       const response = await axios.get('http://localhost:8000/tasks/65e6328a68059ab797224e0f');
       return response;     
    }
    catch (error){
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
            {JSON.stringify(title)}
          </motion.h2>
          <motion.h2 layout="position" className="dueDate">
            {JSON.stringify(dueDate)}
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
              <h2 className="category">{JSON.stringify(category)}</h2>
              <h2 className="timeEst">{JSON.stringify(timeEst)} hours</h2>
            </div>
            <motion.div className="body">
              <p>{JSON.stringify(body)}</p>
            </motion.div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}


export default Card;