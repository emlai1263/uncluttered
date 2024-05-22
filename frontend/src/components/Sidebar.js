import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";

const Sidebar = () => {
  const [categories, setCategories] = useState([]);

  // useEffect(() => {
  //   // Fetch user's categories from backend API
  //   fetchCategories();
  // }, []);

  // const fetchCategories = async () => {
  //   try {
  //     const response = await fetch(
  //       "http://localhost:8000/users/66105e818b0d26a8a1670626/categories"
  //     );
  //     if (response.ok) {
  //       const data = await response.json();
  //       setCategories(data.categories);
  //     } else {
  //       console.error("Failed to fetch categories");
  //     }
  //   } catch (error) {
  //     console.error("Error fetching categories:", error);
  //   }
  // };

  return (
    <div className="fixed drop-shadow-md left-0 top-20 w-1/7 h-full bg-white">
      <div className="flex flex-col">
        <Link
          className="py-5 px-14 text-center border-b text-black hover:bg-gray-100 font-outfit"
          to="/dashboard"
        >
          <button>Dashboard</button>
        </Link>
      </div>
      <div className="flex flex-col">
        <Link
          className="py-5 px-14 text-center border-b text-black hover:bg-gray-100 font-outfit"
          to="/calendar"
        >
          <button>Calendar</button>
        </Link>
      </div>
      {/* Render categories
      {categories.map((category, index) => (
        <div className="flex flex-col" key={index}>
          <button className="py-5 px-14 border-b text-black hover:bg-gray-100 font-outfit">
            {category}
          </button>
        </div>
      ))} */}
    </div>
  );
};

export default Sidebar;
