import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";

const AddTask = ({ isOpen, onClose, updateDashboard }) => {
  const [task, setTask] = useState({
    title: "",
    dueDate: new Date(),
    category: "",
    timeEst: "",
    body: "",
  });

  const initialCategories = [
    { id: 1, name: "School" },
    { id: 2, name: "Work" },
  ];

  const [categories, setCategories] = useState(initialCategories);

  // useEffect(() => {
  //   const fetchCategories = async () => {
  //     try {
  //       const res = await axios.get("http://localhost:8000/users/66105e818b0d26a8a1670626/categories");
  //       setCategories(res.data);
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   };

  //   fetchCategories();
  // }, []);
  
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get("http://localhost:8000/categories");
        setCategories(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchCategories();
  }, []);

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

  const handleSubmit = async () => {
    try {
      // Hardcoded user ID for testing add task funtion
      // const userId = "UserId1234";
      const userId = "66105e818b0d26a8a1670626";
      // Include the userId with rest of the task data
      const taskData = {
        ...task,
        userId: userId,
      };

      // Make a POST request to submit the task data
      await axios.post("http://localhost:8000/tasks", taskData);
      console.log("Task submitted successfully:", taskData);
      onClose(); // Close the modal after submission
    } catch (error) {
      console.error("Error submitting task:", error);
    }
  };


  return (
    <div
      className={`fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center ${
        isOpen ? "block" : "hidden"
      }`}
    >
      <div className="bg-white p-4 rounded-lg drop-shadow-md">
        <h2 className="text-lg font-semibold mb-4 bg-white">Add New Task</h2>
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
            onChange={(date) => handleDateChange(date)}
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
            name="body"
            placeholder="Note"
            value={task.body}
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
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddTask;
