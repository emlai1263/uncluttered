import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DeletedTaskCard from './DeletedTaskCard';
import ConfirmDeleteModal from './ConfirmDeleteModal';

const TrashBin = ({ isOpen, onClose }) => {
    const [deletedTasks, setDeletedTasks] = useState([]);
    const [showConfirmModal, setShowConfirmModal] = useState(false);

    useEffect(() => {
        if (isOpen) {
            fetchDeletedTasks();
        }
    }, [isOpen]);


    const fetchDeletedTasks = async () => {
        const userId = "66105e818b0d26a8a1670626"; // Hardcoded user ID
        try {
            const response = await axios.get(`http://localhost:8000/users/${userId}/tasks/deleted`);
            if (Array.isArray(response.data)) {
                setDeletedTasks(response.data);
            } else {
                console.log('Unexpected data structure:', response.data);
                setDeletedTasks([]);
            }
        } catch (error) {
            console.error('Error fetching deleted tasks:', error);
        }
    };

    const handleEmptyTrash = async () => {
        try {
            const userId = "66105e818b0d26a8a1670626"; // temp hardcoded userID
            const response = await axios.delete(`http://localhost:8000/users/${userId}/tasks/delete-all`);
            if (response.status === 204) {
                setDeletedTasks([]); // Clear the local state to reflect the empty trash
                console.log("All tasks permanently deleted.");
            } else {
                console.error("Failed to permanently delete all tasks.");
            }
        } catch (error) {
            console.error("Error permanently deleting all tasks:", error);
        }
        setShowConfirmModal(false); // Close the modal after processing
    };

    const handleSelect = () => {
        // Implement functionality to select tasks for recovery or permanent deletion
        console.log('Select tasks');
    };

    // permanent delete single task
    const handlePermanentlyDeleteTask = async (taskId) => {
        try {
            const response = await axios.delete(`http://localhost:8000/tasks/${taskId}/permanent-delete`);
            if (response.status === 204) {
                const updatedDeletedTasks = deletedTasks.filter((task) => task._id !== taskId);
                setDeletedTasks(updatedDeletedTasks);
                console.log("Task deleted successfully.");
            } else {
                console.error("Failed to permanently delete task");
            }
        } catch (error) {
            console.error("Error permanently deleting task:", error);
        }
    };
    
    // recover single task
    const handleRecoverTask = async (taskId) => {
        try {
          const response = await axios.patch(`http://localhost:8000/tasks/${taskId}/recover`);
          if (response.status === 200) {
            const updatedDeletedTasks = deletedTasks.filter((task) => task._id !== taskId);
            setDeletedTasks(updatedDeletedTasks);
            console.log("Task recovered successfully.");
          }
        } catch (error) {
          console.error("Error recovering task:", error);
        }
    };
      

    return (
        <div className={`fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center ${isOpen ? 'block' : 'hidden'}`}>
            <div className="relative w-5/12 bg-white p-5 rounded-lg shadow-lg">
                <div className="flex justify-between items-center mb-4 w-full">
                    <header className="bg-red-500 text-black py-2 pl-2 rounded">Trash Bin</header>
                    <div className="flex space-x-2">
                        <button onClick={() => setShowConfirmModal(true)} className="bg-red-500 text-black py-2 px-4 rounded">Empty</button>
                        <button onClick={handleSelect} className="bg-blue-500 text-black py-2 pr-4 rounded">Select</button>
                        <button onClick={onClose} className="bg-green-500 text-black py-2 pr-4 rounded">Done</button>
                    </div>
                </div>
                <ul className="max-h-96 overflow-y-auto">
                    {deletedTasks.map((task) => (
                        <DeletedTaskCard
                            key={task._id}
                            taskId={task._id}
                            title={task.title}
                            dueDate={task.dueDate}
                            category={task.category}
                            timeEst={task.timeEst}
                            body={task.body}
                            onRecover={handleRecoverTask}
                            onPermanentDelete={handlePermanentlyDeleteTask}
                        />
                    ))}
                </ul>
            </div>
            <ConfirmDeleteModal
                isOpen={showConfirmModal}
                onClose={() => setShowConfirmModal(false)}
                onConfirm={handleEmptyTrash}
            />
        </div>
    );
};

export default TrashBin;
