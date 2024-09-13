import React, { useContext } from "react";
import { NoteContext } from "../context/notes/NoteContext";
import { useForm } from "react-hook-form"; // Import useForm from react-hook-form

const AddNote = ({ onAdd }) => {
  const { addNote } = useContext(NoteContext);

  // Initialize React Hook Form
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm({
    mode: "onChange", // Enables validation on change
    defaultValues: {
      title: "",
      description: "",
      tag: "",
    },
  });

  // Handle form submission
  const onSubmit = (data) => {
    // Call the context function to add a new note
    onAdd(data.title, data.description, data.tag);

    // Reset form fields after submission
    reset();
  };

  return (
    <div className="flex justify-center items-center m-6 bg-gray-750">
      <form
        onSubmit={handleSubmit(onSubmit)} // Use handleSubmit from react-hook-form
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
            {...register("title", {
              required: "Title is required",
              minLength: {
                value: 3,
                message: "Title must be at least 3 characters long",
              },
            })} // Register input for validation
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 ${
              errors.title ? "border-red-500" : ""
            }`}
          />
          {errors.title && (
            <p className="text-red-500 text-sm">{errors.title.message}</p>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700" htmlFor="description">
            Description
          </label>
          <textarea
            id="description"
            {...register("description", {
              required: "Description is required",
              minLength: {
                value: 5,
                message: "Description must be at least 5 characters long",
              },
            })} // Register textarea for validation
            className={`w-full px-3 py-2 overflow-auto border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 ${
              errors.description ? "border-red-500" : ""
            }`}
          />
          {errors.description && (
            <p className="text-red-500 text-sm">{errors.description.message}</p>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700" htmlFor="tag">
            Tag
          </label>
          <input
            type="text"
            id="tag"
            {...register("tag")} // Register input without validation (optional field)
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <button
          type="submit"
          disabled={!isValid} // Disable button if form is invalid
          className={`w-full bg-blue-500 text-white py-2 px-4 rounded-md ${
            !isValid
              ? "cursor-not-allowed bg-blue-300" // Disabled state styles
              : "hover:bg-blue-700"
          } transition ease-in-out duration-300`}
        >
          Add Note
        </button>
      </form>
    </div>
  );
};

export default AddNote;
