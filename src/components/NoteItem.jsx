import React, { useState } from 'react';
import { MdDeleteForever } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { AiOutlineClose } from "react-icons/ai"; // Import close icon

const NoteItem = (props) => {
  const { note, onEdit, onDelete } = props;
  const [isModalOpen, setIsModalOpen] = useState(false); // State for modal


  // Toggle modal state
  const handleModalToggle = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <div className="relative max-w-xl w-full flex flex-col border border-gray-400 bg-white rounded-lg shadow-lg p-4 mb-4">
      <div className="flex justify-between items-center">
        <h1
          className="text-gray-900 font-bold text-lg md:text-xl mb-2 cursor-pointer overflow-hidden"
          onClick={handleModalToggle}
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
        className={`transition-max-height duration-300 ease-in-out overflow-hidden`}
      >
        <p className="text-gray-700 text-sm md:text-base mb-2">
          {note.description}
        </p>
      </div>
      {/* 'Read More' Button */}
      {(note.description.length > 40 || note.title.length > 40) && (
        <button
          className="text-blue-500 hover:underline text-sm mt-2"
          onClick={handleModalToggle} // Open modal on 'Read More' click
        >
          Read More
        </button>
      )}

      {/* Modal Component */}
      {isModalOpen && (
        <div
        className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50"
        onClick={handleModalToggle} // Close modal on overlay click
      >
        <div
          className="bg-white rounded-lg shadow-lg w-11/12 md:w-2/3 lg:w-1/2 p-6 relative max-h-[80vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the modal
        >
          <button
            className="absolute top-4 right-4 text-gray-600 hover:text-gray-900"
            onClick={handleModalToggle}
          >
            <AiOutlineClose size={24} />
          </button>
          <h2 className="text-2xl font-bold text-gray-800 mb-4 break-words">{note.title}</h2>
          <p className="text-gray-700 text-base break-words">{note.description}</p>
        </div>
      </div>
      )}
    </div>
  );
};

export default NoteItem;
