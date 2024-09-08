import React, { useState } from 'react';
import { MdDeleteForever } from "react-icons/md";
import { FaEdit } from "react-icons/fa";

const NoteItem = (props) => {
  const { note, onEdit, onDelete } = props;
  const [isExpanded, setIsExpanded] = useState(false); 

  // Toggle expand/collapse state
  const handleToggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="max-w-xl w-full flex flex-col border border-gray-400 bg-white rounded-md shadow-md p-4 mb-4">
      <div className="flex justify-between items-center">
        <h1
          className="text-gray-900 font-bold text-lg md:text-xl mb-2 cursor-pointer"
          onClick={handleToggleExpand}
        >
          {note.title}
        </h1>
        <div className="flex gap-4 md:gap-6">
          <button
            className="text-black cursor-pointer text-2xl md:text-3xl"
            onClick={() => { onDelete(note._id); }}
          >
            <MdDeleteForever />
          </button>
          <button
            className="text-black cursor-pointer text-xl md:text-2xl"
            onClick={() => { onEdit(note); }}
          >
            <FaEdit />
          </button>
        </div>
      </div>
      <div
        className={`transition-max-height duration-300 ease-in-out overflow-hidden ${isExpanded ? 'max-h-96' : 'max-h-16'}`}
      >
        <p className="text-gray-700 text-sm md:text-base mb-2">
          {note.description}
        </p>
      </div>
      {/* 'Read More' or 'Read Less' Button */}
      {(note.description.length > 50) && ( // Adjusted condition to 50 characters
        <button
          className="text-blue-500 hover:underline text-sm mt-2"
          onClick={handleToggleExpand}
        >
          {isExpanded ? 'Read Less' : 'Read More'}
        </button>
      )}
    </div>
  );
};

export default NoteItem;
