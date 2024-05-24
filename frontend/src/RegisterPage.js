import React, { useState } from "react";
import { Link } from "react-router-dom";
export const RegisterPage = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [confirmPass, setConfirmPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(email);
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
          className="justify-center login-form rounded-lg drop-shadow-md h-auto w-1/3 m-16 p-10 bg-white"
          onSubmit={handleSubmit}
        >
          <h2 className="font-inter font-semibold text-center m-5 bg-white text-blue text-xl">
            Create A New Account
          </h2>
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            type="username"
            placeholder="Username"
            id="username"
            name="username"
            className="justify-center rounded-t-md border mt-5 p-2 w-full max-w-md"
          />
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="Email"
            id="email"
            name="email"
            className="justify-center border p-2 w-full max-w-md"
          />
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Password"
            id="password"
            name="password"
            className="justify-center border p-2  w-full max-w-md"
          />
          <input
            value={confirmPass}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Confirm Password"
            id="password"
            name="password"
            className="rounded-b-md border mb-5 p-2 w-full max-w-md"
          />
          <Link to="/success">
            <button
              className="button w-full max-w-md bg-blue hover:bg-blue-dark  mb-24 px-6 py-2 text-white rounded-md font-inter font-regular"
              type="submit"
            >
              Create Account
            </button>
          </Link>
        </form>
      </div>
    </div>

    // <div className="container forms">
    //   <div className="mx-auto mt-36 text-center">
    //     <h1 className="text-blue mt-20 font-semibold text-5xl font-outfit">
    //       Uncluttered
    //     </h1>
    //   </div>
    //   <div className="flex justify-center">
    //     <form
    //       className="register-form rounded-lg drop-shadow-md h-auto w-auto m-16 p-10 bg-white"
    //       onSubmit={handleSubmit}
    //     >
    //       <h2 className="font-inter font-semibold text-center m-5 bg-white text-blue text-xl">
    //         Create A New Account
    //       </h2>
    //       <input
    //         value={username}
    //         onChange={(e) => setUsername(e.target.value)}
    //         type="username"
    //         placeholder="Username"
    //         id="username"
    //         name="username"
    //         className="rounded-t-md border mt-5 p-2 w-full max-w-md"
    //       />
    //       <input
    //         value={email}
    //         onChange={(e) => setEmail(e.target.value)}
    //         type="email"
    //         placeholder="Email"
    //         id="email"
    //         name="email"
    //         className="border p-2 w-full max-w-md"
    //       />
    //       <input
    //         value={password}
    //         onChange={(e) => setPassword(e.target.value)}
    //         type="password"
    //         placeholder="Password"
    //         id="password"
    //         name="password"
    //         className="border p-2 w-full max-w-md"
    //       />
    //       <input
    //         value={confirmPass}
    //         onChange={(e) => setPassword(e.target.value)}
    //         type="password"
    //         placeholder="Confirm Password"
    //         id="password"
    //         name="password"
    //         className="rounded-b-md border p-2 w-full max-w-md"
    //       />
    //       <br></br>
    //       <Link to="/success">
    //         <button
    //           className="button w-full max-w-md bg-blue hover:bg-blue-dark mt-5 mb-2 px-6 py-2 text-white rounded-md font-inter font-regular"
    //           type="submit"
    //         >
    //           Register
    //         </button>
    //       </Link>
    //     </form>
    //   </div>
    // </div>
  );
};
