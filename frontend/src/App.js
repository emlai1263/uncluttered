import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { RegisterPage } from "./RegisterPage";
import { LoginPage } from "./LoginPage";
import Welcome from "./components/Welcome";
import Home from "./components/Home";
import LoginSuccess from "./components/LoginSuccess";

function App() {
  const [currentForm, setCurrentForm] = useState("login");
  const toggleForm = (formName) => {
    setCurrentForm(formName);
  };

  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Welcome />} />
        <Route exact path="/dashboard" element={<Home />} />
        <Route exact path="/login" element={<LoginPage />} />
        <Route exact path="/register" element={<RegisterPage />} />
        <Route exact path="/success" element={<LoginSuccess />} />
      </Routes>
    </Router>
  );
}

export default App;
