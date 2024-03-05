import React from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="fixed mt-20 left-0 top-0 h-full">
      <div className="flex flex-col">
        <Link className="py-4 px-14 mb-2 border-b text-black hover:bg-gray-100 font-outfit">
          Dashboard
        </Link>
      </div>
      <div className="flex flex-col">
        <button className="py-4 px-14 mb-2 border-b text-black hover:bg-gray-100 font-outfit">
          Calendar
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
