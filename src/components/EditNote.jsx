import React, { useContext, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { NoteContext } from "../context/notes/NoteContext";

const EditNote = ({ note, closeEdit, onEdit }) => {
  const context = useContext(NoteContext);
  const { editNote } = context;

  // Initialize React Hook Form
  const { handleSubmit, control, reset } = useForm({
    defaultValues: {
      title: note.title,
      description: note.description,
      tag: note.tag,
    },
  });

  // Update form fields if the note prop changes
  useEffect(() => {
    reset({
      title: note.title,
      description: note.description,
      tag: note.tag,
    });
  }, [note, reset]);

  // Handle form submission
  const onSubmit = (data) => {
    // Call the context function to update the note
    onEdit(note._id, data.title, data.description, data.tag);

    // Close the edit form after submission
    closeEdit();
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-gray-800 bg-opacity-50">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white text-white p-6 rounded-lg shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-4">Edit Note</h2>

        {/* Title Field */}
        <div className="mb-4">
          <label className="block text-gray-700" htmlFor="title">
            Title
          </label>
          <Controller
            name="title"
            control={control}
            rules={{ required: true, minLength: 5 }}
            render={({ field }) => (
              <input
                {...field}
                id="title"
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 bg-black"
              />
            )}
          />
        </div>

        {/* Description Field */}
        <div className="mb-4">
          <label className="block text-gray-700" htmlFor="description">
            Description
          </label>
          <Controller
            name="description"
            control={control}
            rules={{ required: true, minLength: 5 }}
            render={({ field }) => (
              <textarea
                {...field}
                id="description"
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 bg-black"
              />
            )}
          />
        </div>

        {/* Tag Field */}
        <div className="mb-4">
          <label className="block text-gray-700" htmlFor="tag">
            Tag
          </label>
          <Controller
            name="tag"
            control={control}
            render={({ field }) => (
              <input
                {...field}
                id="tag"
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 bg-black"
              />
            )}
          />
        </div>

        <button
          type="submit"
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
  );
};

export default EditNote;
