import React from "react";
import { Link } from "react-router-dom";

const LoginSuccess = () => {
  return (
    <div className="h-64 mt-80 pl-36 container">
      <h1 className="text-blue mb-3 font-semibold text-4xl font-inter">
        Account successfully created 🎉
      </h1>
      <h1 className="text-blue mb-20 font-semibold text-4xl font-inter">
        Let's get started!
      </h1>
      <Link to="/login">
        <button className="bg-blue hover:bg-blue-dark py-4 px-6 text-white rounded-md font-inter font-regular">
          Back to Login
        </button>
      </Link>
    </div>
  );
};

export default LoginSuccess;
