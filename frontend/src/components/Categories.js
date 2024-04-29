import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Category from './Category';

const Categories = ({ isOpen, onClose }) => {
    const initialCategories = [
        { id: 1, name: "School" },
        { id: 2, name: "Work" },
        { id: 3, name: "Personal" }
    ];
    const [categories, setCategories] = useState(initialCategories);
    const [newCategory, setNewCategory] = useState('');

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        try {
            const response = await axios.get('http://localhost:8000/users/66105e818b0d26a8a1670626/categories');
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

    const handleDeleteCategory = async (categoryName) => {
        try {
            await axios.delete(`http://localhost:8000/categories/${categoryName}`);
            setCategories(categories.filter(category => category.name !== categoryName));
        } catch (error) {
            console.error('Error deleting category:', error);
        }
    };

    return (
        <div className={`fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center ${isOpen ? 'block' : 'hidden'}`}>
            <div className="relative w-1/3 bg-white p-5 rounded-lg shadow-lg">
                <div className="flex justify-between items-center mb-4 w-full">
                    <button onClick={onClose} className="p-1">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                    <div className="flex items-center space-x-4">
                        <input
                            type="text"
                            placeholder="Add new category"
                            value={newCategory}
                            onChange={(e) => setNewCategory(e.target.value)}
                            className="p-2 rounded-md border border-gray-300"
                        />
                        <button onClick={handleAddCategory} className="pr-2">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                        </svg>
                    </button>
                    </div>
                </div>
                <ul className="max-h-96 overflow-y-auto">
                    {categories.map((category, index) => (
                        <Category key={index} categoryName={category.name} onDelete={handleDeleteCategory} />
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Categories;
