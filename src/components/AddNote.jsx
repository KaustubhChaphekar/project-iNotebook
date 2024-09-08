import React, { useState, useContext } from "react";
import { NoteContext } from "../context/notes/NoteContext";

const AddNote = ({ onAdd }) => {
  const context = useContext(NoteContext);
  const { addNote } = context;

  // State to store form inputs
  const [note, setNote] = useState({ title: "", description: "", tag: "" });

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent page reload

    // Call the context function to add a new note
    onAdd(note.title, note.description, note.tag);

    // Reset form fields after submission
    setNote({ title: "", description: "", tag: "" });
  };

  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  return (
    <>
      <div className="flex justify-center items-center m-6  bg-gray-750">
        <form
          onSubmit={handleSubmit} // Use form's onSubmit handler
          className="bg-white p-6 rounded-lg shadow-md w-full max-w-sm"
        >
          <h2 className="text-2xl text-black font-bold mb-4">Add Note</h2>

          <div className="mb-4">
            <label className="block text-gray-700" htmlFor="title">
              Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={note.title} // Bind value to state
              onChange={onChange}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700" htmlFor="description">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={note.description} // Bind value to state
              onChange={onChange}
              className="w-full px-3 py-2 overflow-auto border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700" htmlFor="tag">
              Tag
            </label>
            <input
              type="text"
              id="tag"
              name="tag"
              value={note.tag} // Bind value to state
              onChange={onChange}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <button
            type="submit"
            disabled={note.title.length < 5 || note.description.length < 5}
            className={`w-full bg-blue-500 text-white py-2 px-4 rounded-md ${note.title.length < 5 || note.description.length < 5
                ? "cursor-not-allowed bg-blue-300" // Disabled state styles
                : "hover:bg-blue-700"
              } transition ease-in-out duration-300`}
          >
            Add Note
          </button>

        </form>
      </div>
    </>
  );
};

export default AddNote;
