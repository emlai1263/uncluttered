import React, { useState, useEffect } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


const EditTask = ({ isOpen, onClose, taskId, updateDashboard }) => {
    const [task, setTask] = useState({
      title: "",
      dueDate: new Date(),
      category: "",
      timeEst: "",
      note: "",
    });

  
    const initialCategories = [
        { id: 1, name: "School" },
        { id: 2, name: "Work" },
      ];
    
    const [categories, setCategories] = useState(initialCategories);

    useEffect(() => {
        const fetchTaskById = async (taskId) => {
          try {
            const response = await axios.get(`http://localhost:8000/task/${taskId}`);
            const taskData = response.data.result;
            setTask(taskData);

          } catch (error) {
            console.error("Error fetching task by ID:", error);
          }
        };
        
    
        const fetchCategories = async () => {
          try {
            const response = await axios.get("http://localhost:8000/categories");
            setCategories(response.data);
          } catch (error) {
            console.error("Error fetching categories:", error);
          }
          
        };
    
          // const fetchCategories = async () => {
          //     try {
          //         const response = await axios.get(`http://localhost:8000/users/66105e818b0d26a8a1670626/categories`);
          //         if (response.data) {
          //             setCategories(response.data.categories); // assuming the API returns an array
          //         }
          //     } catch (error) {
          //         console.error("Error fetching categories:", error);
          //         setCategories([]); // Fallback to empty array on error
          //     }
          // };

        fetchTaskById(taskId);
        fetchCategories();
    }, [taskId]);
  
    const handleSave = async () => {
      try {
        await axios.patch(`http://localhost:8000/tasks/${taskId}`, task);
        onClose();
        updateDashboard();
      } catch (error) {
        console.error("Error saving task:", error);
      }
    };
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setTask((prevTask) => ({
        ...prevTask,
        [name]: value,
      }));
    };
  
    const handleDateChange = (date) => {
      setTask((prevTask) => ({
        ...prevTask,
        dueDate: date,
      }));
    };
  
    return (
      <div
        className={`fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center ${
          isOpen ? "block" : "hidden"
        }`}
      >
        <div className="bg-white p-4 rounded-lg drop-shadow-md">
          <h2 className="text-lg font-semibold mb-4 bg-white">Edit Task</h2>
          <label htmlFor="taskName" className="text-lg font-semibold mb-2">
            Task Name:{" "}
          </label>
          <input
            id="taskName"
            type="text"
            name="title"
            placeholder="Enter task name"
            value={task.title}
            onChange={handleChange}
            className="p-2 border border-gray-300 rounded-md w-full mb-4"
          />
          <div className="mb-4">
            <label className="text-sm block">Due Date: </label>
            <DatePicker
              selected={task.dueDate}
              onChange={handleDateChange}
              onKeyDown={(e) => {
                // Allow only numbers and specific control keys (e.g., backspace, delete)
                if (
                  !/[0-9]/.test(e.key) &&
                  ![
                    "Backspace",
                    "Delete",
                    "ArrowLeft",
                    "ArrowRight",
                    "Tab",
                  ].includes(e.key)
                ) {
                  e.preventDefault();
                }
              }}
              className="p-2 border border-gray-300 rounded-md w-full"
            />
          </div>
  
          <div className="mb-4">
            <label className="text-sm block">Category: </label>
            <div className="flex">
              <select
                name="category"
                value={task.category}
                onChange={handleChange}
                className="p-2 border border-gray-300 rounded-md flex-1 mr-1 h-11"
              >
                <option value="">Select Category</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.name}>
                    {category.name}
                  </option>
                ))}
              </select>
              <input
                type="text"
                name="category"
                placeholder="Enter new category"
                value={task.category}
                onChange={handleChange}
                className="p-2 border border-gray-300 rounded-md flex-1 ml-1"
              />
            </div>
          </div>
          <div className="mb-4">
            <label className="text-sm block">Time Estimate: </label>
            <input
              type="text"
              name="timeEst"
              placeholder="Time Estimate"
              value={task.timeEst}
              onChange={handleChange}
              onKeyDown={(e) => {
                // Allow only numbers and specific control keys (e.g., backspace, delete)
                if (
                  !/[0-9]/.test(e.key) &&
                  ![
                    "Backspace",
                    "Delete",
                    "ArrowLeft",
                    "ArrowRight",
                    "Tab",
                  ].includes(e.key)
                ) {
                  e.preventDefault();
                }
              }}
              className="p-2 border border-gray-300 rounded-md w-full"
            />
          </div>
          <div className="mb-4">
            <label className="text-sm block">Note: </label>
            <input
              type="text"
              name="note"
              placeholder="Note"
              value={task.note}
              onChange={handleChange}
              className="p-2 border border-gray-300 rounded-md w-full"
            />
          </div>
          <div className="flex justify-end mt-4">
            <button
              className="bg-blue-500 hover:bg-gray-100 hover:bg-blue-700 text-black font-semibold py-2 px-4 rounded"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              className="text-blue-500 hover:bg-gray-100 font-semibold py-2 px-4 rounded"
              onClick={handleSave}
            >
              Save
            </button>
          </div>
        </div>
      </div>
    );
  };
  
  export default EditTask;
  
