import React, { useState, useEffect } from "react";
import UserContext from "./UserContext";
// import "./App.css"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { RegisterPage } from "./RegisterPage";
import { LoginPage } from "./LoginPage";
import Welcome from "./components/Welcome";
import Home from "./components/Home";
import LoginSuccess from "./components/LoginSuccess";
import Calendar from "./Calendar";
import axios from "axios";

function App() {
  // const INVALID_TOKEN = "INVALID_TOKEN";
  // const [token, setToken] = useState(INVALID_TOKEN);
  // const [message, setMessage] = useState("");
  async function fetchAll() {
    console.log("in fetchall");
    try {
      const response = await axios.get(
        "http://localhost:8000/tasks/65e6328a68059ab797224e0f"
      );
      return response;
    } catch (error) {
      //We're not handling errors. Just logging into the console.
      console.log(error);
      return false;
    }
  }
  const [user, setUser] = useState(null);

  const login = (userData) => {
    setUser(userData);
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, login, logout }}>
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
    </UserContext.Provider>
  );
}
export default App;