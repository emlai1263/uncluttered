import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TrashBin = ({ isOpen, onClose }) => {
    const initialTrash = [
        { id: 1, name: "School" },
        { id: 2, name: "Work" }
    ];
    const [deletedTasks, setDeletedTasks] = useState(initialTrash);

    useEffect(() => {
        fetchDeletedTasks();
    }, []);

    const fetchDeletedTasks = async () => {
        try {
            const response = await axios.get('http://localhost:8000/deletedTasks');
            setDeletedTasks(response.data);
        } catch (error) {
            console.error('Error fetching deleted tasks:', error);
        }
    };

    const handleEmpty = () => {
        // Implement functionality to permanently delete tasks
        console.log('Empty the trash bin');
    };

    const handleSelect = () => {
        // Implement functionality to select tasks for recovery or permanent deletion
        console.log('Select tasks');
    };

    return (
        <div className={`fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center ${isOpen ? 'block' : 'hidden'}`}>
            <div className="relative w-5/12 bg-white p-5 rounded-lg shadow-lg">
                <div className="flex justify-end space-x-2 mb-4">
                    <button onClick={handleEmpty} className="bg-red-500 text-black py-2 px-4 rounded">Empty</button>
                    <button onClick={handleSelect} className="bg-blue-500 text-black py-2 px-4 rounded">Select</button>
                    <button onClick={onClose} className="bg-green-500 text-black py-2 px-4 rounded">Done</button>
                </div>
                <ul className="max-h-96 overflow-y-auto">
                    {deletedTasks.map((task, index) => (
                        <li key={index} className="p-2 border-b border-gray-300">
                            <p className="text-gray-800">{task.title}</p>
                            <p className="text-sm text-gray-600">Deleted on: {task.deletedDate}</p>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default TrashBin;
