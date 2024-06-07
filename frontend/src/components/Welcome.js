import { React } from "react";
import Navbar from "./Navbar";
import { Link } from "react-router-dom";

const Welcome = () => {
  return (
    <div className="flex flex-col">
      <div>
        <Navbar />
      </div>
      <div className="ml-36 h-64 mt-64 container">
        <h1 data-testid="welcome-title" className="text-blue font-semibold text-5xl font-outfit">
          Uncluttered
        </h1>
        <h2 className="pb-20 my-5 text-blue bg-white font-semibold text-3xl font-outfit">
          Where calmness meets efficiency.
        </h2>
        <p className="pb-20 text-blue bg-white font-regular text-xl font-inter ">
          Manage and organize your tasks for a stress-free, highly productive
          experience.
        </p>
        <Link to="/login">
          <button className="bg-blue hover:bg-blue-dark p-4 text-white rounded-md font-inter font-regular">
            Get Started!
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Welcome;
