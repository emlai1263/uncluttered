import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Categories = ({ isOpen, onClose }) => {
    const [categories, setCategories] = useState([]);
    const [newCategory, setNewCategory] = useState('');

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        try {
            const response = await axios.get('http://localhost:8000/categories');
            setCategories(response.data);
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    };

    const handleAddCategory = async () => {
        if (!newCategory) return;
        try {
            await axios.post('http://localhost:8000/categories', { name: newCategory });
            setCategories([...categories, { name: newCategory }]);
            setNewCategory('');
        } catch (error) {
            console.error('Error adding category:', error);
        }
    };

    return (
        <div className={`fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center ${isOpen ? 'block' : 'hidden'}`}>
            <div className="relative w-2/3 bg-white p-5 rounded-lg shadow-lg">
                <div className="flex justify-start items-center space-x-4 mb-4">
                    <button onClick={onClose} className="p-1">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                    <button onClick={handleAddCategory} className="p-1">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                        </svg>
                    </button>
                    <input
                        type="text"
                        placeholder="Add new category"
                        value={newCategory}
                        onChange={(e) => setNewCategory(e.target.value)}
                        className="p-2 rounded-md border-gray-300"
                    />
                </div>
                <ul className="max-h-96 overflow-y-auto">
                    {categories.map((category, index) => (
                        <li key={index} className="p-2 border-b border-gray-300">
                            <p className="text-gray-800">{category.name}</p>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Categories;
