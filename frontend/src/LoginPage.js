import React, { useState } from "react";
import { Link } from "react-router-dom";
import Card from "./components/Card";

export const LoginPage = (props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(username);
  };
  return (
    <div className="container forms">
      <div className="mx-auto mt-36 text-center">
        <h1 className="text-blue mt-20 font-semibold text-5xl font-outfit">
          Uncluttered
        </h1>
      </div>
      <div className="flex justify-center">
        <form
          className="login-form rounded-lg drop-shadow-md h-auto w-auto m-16 p-10 bg-white"
          onSubmit={handleSubmit}
        >
          <h2 className="font-inter font-semibold text-center m-5 bg-white text-blue text-xl">
            Login To Your Account
          </h2>
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            type="username"
            placeholder="Username"
            id="username"
            name="username"
            className="rounded-t-md border mt-5 p-2 w-full max-w-md"
          />
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Password"
            id="password"
            name="password"
            className="rounded-b-md border p-2 mb-5 w-full max-w-md"
          />
          <p className="justify-right text-blue mb-5">Forgot your password?</p>
          <Link to="/dashboard">
            <button
              className="button w-full max-w-md bg-blue hover:bg-blue-dark mb-2 px-6 py-2 text-white rounded-md font-inter font-regular"
              type="submit"
            >
              Login
            </button>
          </Link>
          <Link to="/register">
            <button className="button w-full max-w-md bg-blue hover:bg-blue-dark mb-24 px-6 py-2 text-white rounded-md font-inter font-regular">
              Register a new account
            </button>
          </Link>
        </form>
      </div>
    </div>
  );
};
