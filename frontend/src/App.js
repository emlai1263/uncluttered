// frontend/backend connecting stuff
import React, {useState, useEffect} from 'react';
// import React, { useState } from "react";
import logo from "./logo.svg";
// import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { RegisterPage } from "./RegisterPage";
import { LoginPage } from "./LoginPage";
import Welcome from "./components/Welcome";
import Home from "./components/Home";
import LoginSuccess from "./components/LoginSuccess";
import Calendar from "./Calendar";
import Card from './components/Card';

// front/back end connection
import axios from "axios";

function App() {
  //  front/backend test
  const [tasks, setTasks] = useState([]);

  const [currentForm, setCurrentForm] = useState("login");
  const toggleForm = (formName) => {
    setCurrentForm(formName);
  };

  useEffect(() => {
    fetchAll().then( result => {
      if (result) {
        console.log("TESTING: " + JSON.stringify(result));
        setTasks(result);
        console.log("single task: " + JSON.stringify(tasks.data.users[0]));
    } else {
        console.log("ERROR: " + JSON.stringify(result));
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

  // return (
  //   <div className="container">
  //     <Card
  //       title = {JSON.stringify(tasks.data.users[0].title)}
  //       dueDate={JSON.stringify(tasks.data.users[0].dueDate)}
  //       category={JSON.stringify(tasks.data.users[0].category)}
  //       timeEst={JSON.stringify(tasks.data.users[0].timeEst)}
  //       body={JSON.stringify(tasks.data.users[0].body)}
  //     />
  //   </div>
  //   );

  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Welcome />} />
        <Route exact path="/dashboard" element={<Home />} />
        <Route exact path="/login" element={<LoginPage />} />
        <Route exact path="/register" element={<RegisterPage />} />
        <Route exact path="/success" element={<LoginSuccess />} />
        <Route exact path="/calendar" element={<Calendar />} />
      </Routes>
    </Router>
  );
}

export default App;