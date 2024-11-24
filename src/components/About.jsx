import React from "react";
import { Link } from "react-router-dom";

const About = () => {
    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
            <div className="container mx-auto py-10 px-4">
                <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6 mt-16">
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                        About iNotebook
                    </h1>
                    <p className="text-gray-700 dark:text-gray-300 text-lg mb-4">
                        Welcome to{" "}
                        <span className="font-semibold text-blue-600">
                            iNotebook
                        </span>
                        , your go-to application for managing and organizing your notes
                        efficiently. Whether you're a student, a professional, or just
                        someone who loves to jot down ideas, iNotebook offers a
                        user-friendly interface to help you stay organized.
                    </p>

                    <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-3">
                        Features
                    </h2>
                    <ul className="list-disc list-inside mb-4">
                        <li className="text-gray-700 dark:text-gray-300 mb-2">
                            Create, edit, and delete notes with ease.
                        </li>
                        <li className="text-gray-700 dark:text-gray-300 mb-2">
                            Organize notes with tags for better categorization.
                        </li>
                        <li className="text-gray-700 dark:text-gray-300 mb-2">
                            Search through your notes quickly using a powerful search feature.
                        </li>
                        <li className="text-gray-700 dark:text-gray-300 mb-2">
                            Responsive design that works seamlessly across devices.
                        </li>
                    </ul>

                    <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-3">
                        Our Mission
                    </h2>
                    <p className="text-gray-700 dark:text-gray-300 text-lg mb-4">
                        Our mission at iNotebook is to provide a simple, intuitive, and
                        reliable tool to help users keep track of their thoughts and ideas.
                        We believe that organization leads to productivity, and our goal is
                        to make managing your notes as effortless as possible.
                    </p>

                    <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-3">
                        Contact Us
                    </h2>
                    <p className="text-gray-700 dark:text-gray-300 text-lg mb-6">
                        If you have any questions, feedback, or suggestions, feel free to
                        reach out to us. We are always happy to hear from our users and are
                        committed to making iNotebook better for everyone.
                    </p>
                    <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-2 rounded-lg transition duration-300">
                        <Link to="/contact" >
                            Reach out
                        </Link>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default About;
