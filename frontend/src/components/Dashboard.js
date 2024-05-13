import React from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import Card from "./Card";
import AddTask from "./AddTask";
import EditTask from "./EditTask";
// front/back end connection
import axios from "axios";
import { useState, useEffect } from "react";
import moment from "moment";
import TrashBin from './TrashBin';

const progress_states = ["To Do", "In Progress", "Complete"];

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const location = useLocation();
  const [isAddTaskOpen, setIsAddTaskOpen] = useState(false);
  const [isEditTaskOpen, setIsEditTaskOpen] = useState(false);
  const [editTaskId, setEditTaskId] = useState(null);

  const handleAddTaskClick = () => {
    console.log("Add Task button clicked");
    setIsAddTaskOpen(true);
  };

  // const handleDeleteTask = async (taskId) => {
  //   // Implement delete task functionality
  //   try {
  //     await axios.delete(`http://localhost:8000/tasks/${taskId}`);
  //     const updatedTasks = tasks.filter((task) => task.id !== taskId);
  //     setTasks(updatedTasks);
  //   } catch (error) {
  //     console.error("Error deleting task:", error);
  //   }
  // };
  const handleDeleteTask = async (taskId) => {
    try {
      // Change from DELETE to PATCH and update the endpoint
      const response = await axios.patch(`http://localhost:8000/tasks/${taskId}/mark-deleted`);
      if (response.status === 200) {
        const updatedTasks = tasks.filter((task) => task.id !== taskId);
        setTasks(updatedTasks);  
      } else {
        console.error("Failed to mark task as deleted");
      }
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };
  
  const [deletedTasks, setDeletedTasks] = useState([]);

  const fetchDeletedTasks = async () => {
    try {
      const response = await axios.get('http://localhost:8000/tasks/deleted');
      if (response.data) {
        setDeletedTasks(response.data); 
      }
    } catch (error) {
      console.error('Error fetching deleted tasks:', error);
    }
  };

  useEffect(() => {
    fetchDeletedTasks();
  }, []); 

  const updateDashboard = async () => {
    try {
      const response = await axios.get("http://localhost:8000/tasks");
      if (response.data && Array.isArray(response.data.tasks)) {
        setTasks(response.data.tasks); // Ensure that tasks is an array
      } else {
        setTasks([]); // Set to empty array if no tasks or not in expected format
      }
    } catch (error) {
      console.error("Failed to fetch tasks:", error);
      setTasks([]); // Set to empty array on error
    }
  };
  
  const [isTrashBinOpen, setIsTrashBinOpen] = useState(false);


  const handleEditTask = (taskId) => {
    setEditTaskId(taskId);
    setIsEditTaskOpen(true);
  };

  // functions to pull tasks from database
  useEffect(() => {
    fetchAll().then((result) => {
      if (result) {
        setTasks(result.data.users);
        //console.log("tasks: " + tasks);
      } else {
      }
    });
  });

  async function fetchAll() {
    try {
      const response = await axios.get(
        // CHANGE USER HERE
        "http://localhost:8000/tasks/66105e818b0d26a8a1670626"
      );
      //console.log("TASKS HERE: " + response);
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
        Good morning, {/* location.state.name */}
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
                  <div className="flex space-x-4">
                    <button onClick={() => setIsTrashBinOpen(true)}>
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 9l-1.035 10.447A2 2 0 0116.472 21.5H7.528a2 2 0 01-1.993-1.947L4.5 9m13.5 0V6a2 2 0 00-2-2h-5a2 2 0 00-2 2v3m12 0H4.5m12 0a1.5 1.5 0 011.5 1.5v0a1.5 1.5 0 01-1.5 1.5h-9a1.5 1.5 0 01-1.5-1.5v0a1.5 1.5 0 011.5-1.5h9zM10.5 6v-.75a.75.75 0 00-.75-.75h-1.5a.75.75 0 00-.75.75V6" />
                      </svg>
                    </button>

                    <button onClick={handleAddTaskClick}>
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                      </svg>
                    </button>
                    
                  </div>
                )}
              </div>
              <div className="container">
                {/* Map over tasks and render Card component for each task */}
                {tasks.map((task) => (
                  (task.status === state) &&
                  <Card
                    taskId={task._id}
                    title={task.title}
                    dueDate={moment(task.dueDate).format("MM/DD/YY")}
                    category={task.category}
                    timeEst={task.timeEst}
                    body={task.body}
                    onDelete={handleDeleteTask}
                    onEdit={handleEditTask}
                  />
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
      <AddTask isOpen={isAddTaskOpen} onClose={() => setIsAddTaskOpen(false)} />
      <EditTask
        isOpen={isEditTaskOpen}
        onClose={() => setIsEditTaskOpen(false)}
        taskId={editTaskId}
        updateDashboard={updateDashboard}
      />
      <TrashBin isOpen={isTrashBinOpen} onClose={() => setIsTrashBinOpen(false)} />
    </div>
  );
};

export default Dashboard;


