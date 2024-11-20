import React, { useState, useContext, useEffect } from "react";
import { NoteContext } from "../context/notes/NoteContext";



const EditNote = ({ note, closeEdit, onEdit }) => {
  const context = useContext(NoteContext);
  const { editNote } = context;

  // Initialize state with note details
  const [editedNote, setEditedNote] = useState({
    title: note.title,
    description: note.description,
    tag: note.tag,
  });

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent page reload

    // Call the context function to update the note
    onEdit(note._id, editedNote.title, editedNote.description, editedNote.tag);

    // Close the edit form after submission
    closeEdit();

  };

  const onChange = (e) => {
    setEditedNote({ ...editedNote, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    // Reset form fields if the note prop changes
    setEditedNote({
      title: note.title,
      description: note.description,
      tag: note.tag,
    });
  }, [note]);

  return (
    <>
      <div className="fixed inset-0 flex justify-center items-center bg-gray-800 bg-opacity-50">
        <form
          onSubmit={handleSubmit}
          className="bg-white text-blue-700 p-6 rounded-lg shadow-md w-full max-w-md"
        >
          <h2 className="text-2xl font-bold mb-4">Edit Note</h2>

          <div className="mb-4">
            <label className="block text-gray-700" htmlFor="title">
              Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={editedNote.title}
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
              value={editedNote.description}
              onChange={onChange}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
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
              value={editedNote.tag}
              onChange={onChange}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <button
            type="submit"
            disabled={editedNote.title.length < 5 || editedNote.description.length < 5}
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition ease-in-out duration-300"
          >
            Update Note
          </button>
          <button
            type="button"
            onClick={closeEdit}
            className="mt-2 w-full bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 transition ease-in-out duration-300"
          >
            Cancel
          </button>
        </form>
      </div>
    </>
  );
};

export default EditNote;
