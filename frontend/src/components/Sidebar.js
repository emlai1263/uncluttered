import React from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="fixed left-0 top-20 w-1/7 h-full bg-white">
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
      <div className="flex flex-col">
        <button className="py-5 px-14 border-b text-black hover:bg-gray-100 font-outfit">
          School
        </button>
      </div>
      <div className="flex flex-col">
        <button className="py-5 px-14 border-b text-black hover:bg-gray-100 font-outfit">
          Work
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
