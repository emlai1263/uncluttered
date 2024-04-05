import React from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import Card from './Card';
import AddTask from "./AddTask";
// front/back end connection
import axios from "axios";
import { useState, useEffect } from "react";
import moment from "moment";

const progress_states = ["To Do", "In Progress", "Complete"];

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const location = useLocation();
  const [isAddTaskOpen, setIsAddTaskOpen] = useState(false);

  const handleAddTaskClick = () => {
    console.log("Add Task button clicked");
    setIsAddTaskOpen(true);
  };

  // functions to pull tasks from database
  useEffect(() => {
    fetchAll().then((result) => {
      if (result) {
        setTasks(result.data.users);
        console.log("tasks: " + tasks);
      } else {
      }
    });
  });

  async function fetchAll() {
    try {
      const response = await axios.get(
        "http://localhost:8000/tasks/65e6328a68059ab797224e0f"
      );
      return response;
    } catch (error) {
      //We're not handling errors. Just logging into the console.
      console.log(error);
      return false;
    }
  }

  //const name 

  return (
    <div className="container ml-64 mt-36 h-screen w-screen">
      <h1 className="mb-6 ml-6 text-4xl text-blue font-semibold font-outfit">
        Good morning, {location.state.name}
      </h1>

      <div className="col-container flex flex-wrap">
        {progress_states.map((state, index) => (
          <div
            key={index}
            className="bg-white rounded-[12px] min-h-screen pb-20 mb-20 w-1/4 h-5/6 mx-5"
          >
            <div className="flex flex-col">
              <div className="flex items-center justify-between py-4 px-10 mb-2 border-b text-black font-outfit">
                <p>{state}</p>
                {/* Conditional rendering of SVG */}
                {state === "To Do" && (
                  <button onClick={handleAddTaskClick}>
                    {" "}
                    {/* Attach the click handler to the button */}
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
              <div className="container">
                {/* Map over tasks and render Card component for each task */}
                {tasks.map((task) => (
                  <Card
                    title={task.title}
                    dueDate={moment(task.dueDate).format("MM/DD/YY")}
                    category={task.category}
                    timeEst={task.timeEst}
                    body={task.body}
                  />
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
      <AddTask isOpen={isAddTaskOpen} onClose={() => setIsAddTaskOpen(false)} />
    </div>
  );
};

export default Dashboard;
