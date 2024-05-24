import React from 'react';

const ConfirmDeleteModal = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-5 rounded-lg shadow-lg w-1/3">
        <h2 className="text-lg font-semibold mb-4">Delete All Tasks?</h2>
        <p className="mb-6">Deleting all tasks from the trash is permanent and cannot be undone.</p>
        <div className="flex justify-end space-x-3">
          <button onClick={onClose} className="bg-gray-300 hover:bg-gray-400 text-black font-bold py-2 px-4 rounded">
            Cancel
          </button>
          <button onClick={onConfirm} className="bg-gray-100 hover:bg-gray-400 text-black font-bold py-2 px-4 rounded">
            Empty Trash
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDeleteModal;

