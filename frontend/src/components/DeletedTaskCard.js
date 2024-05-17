import React from "react";
import "./Card.css";

function DeletedTaskCard({ taskId, title, dueDate, category, timeEst, body, onRecover, onPermanentDelete }) {
    return (
        <div className="card flex text-gray-600 flex-col p-4 rounded-2xl drop-shadow-lg bg-white font-inter w-full">
            <div className="card-header mb-2">
                <h2 className="title font-semibold">{title}</h2>
                <h2 className="dueDate p-2 bg-gray-100 rounded-full">{dueDate}</h2>
            </div>
            <div className="card-body">
                <h2 className="category p-2.5 bg-gray-100 rounded-full">{category}</h2>
                <h2 className="timeEst p-2.5 bg-gray-100 rounded-full">{timeEst} hours</h2>
                <p>{body}</p>
                <div className="flex justify-between mt-4">
                    <button
                        onClick={() => onRecover(taskId)}
                        className="bg-green-500 hover:bg-green-700 text-black py-2 px-4 rounded"
                    >
                        Recover
                    </button>
                    <button
                        onClick={() => onPermanentDelete(taskId)}
                        className="bg-red-500 hover:bg-red-700 text-black py-2 px-4 rounded"
                    >
                        Delete Permanently
                    </button>
                </div>
            </div>
        </div>
    );
}

export default DeletedTaskCard;
