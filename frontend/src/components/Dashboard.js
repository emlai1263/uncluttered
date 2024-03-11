import React from "react";
import { Link } from "react-router-dom";

const progress_states = ["To Do", "In Progress", "Complete"];

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
            className="bg-white rounded-[12px] h-screen mb-20 w-1/4 h-5/6 mx-5"
          >
            <div className="flex flex-col">
              <div className="flex items-center justify-between py-4 px-10 mb-2 border-b text-black font-outfit">
                <p>{state}</p>
                {/* Conditional rendering of SVG */}
                {state === "To Do" && (
                  <button>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 4.5v15m7.5-7.5h-15"
                      />
                    </svg>
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
