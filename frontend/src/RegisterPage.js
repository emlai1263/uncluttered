import React, { useState } from "react";
export const RegisterPage = (props) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(email);
    }
    return (
        <div className="forms">
            <form className="register-form" onSubmit={handleSubmit}>
                <p><b>Create a new account</b></p>
                <input value={username} onChange={(e) => setUsername(e.target.value)} type="username" placeholder="Username" id="username" name="username"/>
                <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="youremail@gmail.com" id="email" name="email"/>
                <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Password" id="password" name="password"/>
                <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Confirm Password" id="password" name="password"/>
                <br></br>
                <button className="button" onClick={() => props.onFormSwitch('login')} type="submit">Register</button>
            </form>
        </div>
    )
}