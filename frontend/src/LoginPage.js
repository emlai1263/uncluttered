import React, { useState } from "react";

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
                <h2>Login</h2>
                <p>Log in to your account</p>
                <input value={username} onChange={(e) => setUsername(e.target.value)} type="username" placeholder="Username" id="username" name="username"/>
                <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Password" id="password" name="password"/>
                <button className="button" type="submit">Login</button>
                <p>Forgot my password. Click <button>here</button> to reset</p>
                <button className="button" onClick={() => props.onFormSwitch('register  ')}>Register a new account</button>
            </form>
        </div>
    )
}
