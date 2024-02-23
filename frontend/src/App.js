import React, { useState } from "react";
import logo from './logo.svg';
import './App.css';
import { RegisterPage } from './RegisterPage';
import { LoginPage } from './LoginPage';

function App() {
  const [currentForm, setCurrentForm] = useState('login');
  const toggleForm = (formName) => {
    setCurrentForm(formName);
  }
  
  return (
    <div className="App">
      {
        currentForm === "login" ? <LoginPage onFormSwitch={toggleForm}/> : <RegisterPage onFormSwitch={toggleForm}/>
        <Card
      title = 'Task  vijiojgiojeroigj iojiojreioj jiovjrieo ijiojio'
      dueDate = '--/--/----'
      category = 'Category'
      timeEst= '0'
      body = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut et dolore magna aliqua. Sapien eget mi proin sed libero enim. Egestas erat imperdiet sed euismod nisi porta lorem. Ante in nibh mauris cursus'
      />
      }
    </div>
  );
}

export default App;
