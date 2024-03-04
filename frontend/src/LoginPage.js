import React, { useState } from "react";
import Card from './components/Card';

export const LoginPage = (props) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(username);
    }
    return (
        <div className="forms">
            <form className="login-form" onSubmit={handleSubmit}>
                <h2 className="header">Login</h2>
                <p>Log in to your account</p>
                <input value={username} onChange={(e) => setUsername(e.target.value)} type="username" placeholder="Username" id="username" name="username"/>
                <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Password" id="password" name="password"/>
                <button className="button" type="submit">Login</button>
                <br></br>
                {/* <p>Forgot my password. Click <button>here</button> to reset</p> */}
                <button className="button" onClick={() => props.onFormSwitch('register  ')}>Register a new account</button>
            </form>
            <Card
                title = 'Task  vijiojgiojeroigj iojiojreioj jiovjrieo ijiojio'
                dueDate = '--/--/----'
                category = 'Category'
                timeEst= '0'
                body = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut et dolore magna aliqua. Sapien eget mi proin sed libero enim. Egestas erat imperdiet sed euismod nisi porta lorem. Ante in nibh mauris cursus'
            />
        </div>
    )
}
