import React from "react";
import { Link } from "react-router-dom";

const progress_states = ["To", "In Progress", "Complete"];

const Dashboard = () => {
  return (
    <div className="container ml-64 mt-36 h-screen w-screen">
      <h1 className="mb-6 ml-6 text-4xl text-blue font-semibold font-outfit">
        Good morning, John
      </h1>

      <div className="col-container flex flex-wrap">
        {progress_states.map((state, index) => (
          <div
            key={index}
            className="bg-white rounded-[12px] h-screen mb-20 w-96 h-5/6 mx-5"
          >
            <div className="flex flex-col">
              <p className="py-4 px-10 text-left mb-2 border-b text-black font-outfit">
                {state}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
