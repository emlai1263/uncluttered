import React from "react";

const CategoryCard = ({ category, onDelete }) => {
  return (
    <div className="flex items-center justify-between bg-white px-4 py-2 rounded shadow border">
      <p className="text-gray-800">{category.name}</p>
      <button 
        onClick={() => onDelete(category._id)}
        className="text-red-500 hover:text-red-700"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
    </div>
  );
};

export default CategoryCard;