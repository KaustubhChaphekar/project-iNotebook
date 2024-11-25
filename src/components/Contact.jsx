import React, { useState } from "react";


const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [formStatus, setFormStatus] = useState("");

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your form submission logic here (e.g., send data to backend or email)
    setFormStatus("Thank you for reaching out! We'll get back to you soon.");
    setFormData({ name: "", email: "", message: "" }); // Clear form
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex items-center justify-center">
      <div className="container mx-auto p-4">
        <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6 max-w-lg mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4 text-center">
            Contact Us
          </h1>
          <p className="text-gray-700 dark:text-gray-300 mb-6 text-center">
            We’d love to hear from you! Fill out the form below, and we’ll get
            in touch as soon as possible.
          </p>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name Input */}
            <div>
              <label
                htmlFor="name"
                className="block text-gray-800 dark:text-gray-300 font-medium mb-1"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:outline-none bg-white text-black dark:bg-gray-700 dark:text-white dark:border-gray-600"
                placeholder="Enter your name"
                required
              />
            </div>

            {/* Email Input */}
            <div>
              <label
                htmlFor="email"
                className="block text-gray-800 dark:text-gray-300 font-medium mb-1"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:outline-none  bg-white text-black dark:bg-gray-700 dark:text-white dark:border-gray-600"
                placeholder="Enter your email"
                required
              />
            </div>

            {/* Message Input */}
            <div>
              <label
                htmlFor="message"
                className="block text-gray-800 dark:text-gray-300 font-medium mb-1"
              >
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows="4"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:outline-none  bg-white text-black dark:bg-gray-700 dark:text-white dark:border-gray-600"
                placeholder="Enter your message"
                required
              ></textarea>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-2 rounded-lg transition duration-300"
            >
              Submit
            </button>
          </form>

          {/* Form Status Message */}
          {formStatus && (
            <p className="mt-4 text-green-600 dark:text-green-400 font-medium text-center">
              {formStatus}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Contact;
