import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import Alert from '../Alert';

const Signup = () => {
    const [Credentials, setCredentials] = useState({ name: "", email: "", password: "", Cpassword: "" });
    const [alertMessage, setAlertMessage] = useState("");
    const [alertType, setAlertType] = useState("success");
    let navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { name, email, password, Cpassword } = Credentials;

        // Ensure password and confirm password match
        if (password !== Cpassword) {
            setAlertType("error");
            setAlertMessage("Passwords do not match");
            return;
        }

        const response = await fetch(`http://localhost:3000/api/auth/createuser`, {
            method: "POST",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify({ name, email, password })
        });

        const json = await response.json();
        console.log(json);

        if (json.success) {
            // Save the auth token and redirect
            localStorage.setItem('token', json.authToken);
            setAlertType("success");
            setAlertMessage("Account created successfully!");
            setTimeout(() => {
                navigate('/');
            }, 1000);// Add delay before redirecting to allow alert to show up
        } else {
            setAlertType("error");
            setAlertMessage("Invalid credentials or account already exists");
        }
    }

    const onChange = (e) => {
        setCredentials({ ...Credentials, [e.target.name]: e.target.value });
    };

    return (
        <>
            {/* Alert Component for showing success or error messages */}
            {alertMessage && <Alert message={alertMessage} type={alertType} onClose={() => setAlertMessage("")} />}
                <h2 className='text-center mt-6 text-2xl'>Create an account to use iNotebook </h2>
            <div className="fixed inset-16 flex justify-center items-center bg-gray-750 bg-opacity-100">
                <form
                    onSubmit={handleSubmit}
                    className="bg-white p-6 rounded-lg shadow-md w-full max-w-md"
                >

                    <div className="mb-4">
                        <label className="block text-gray-700" htmlFor="name">
                            Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={Credentials.name}
                            onChange={onChange}
                            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                            required
                            minLength={3}
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700" htmlFor="email">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={Credentials.email}
                            onChange={onChange}
                            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700" htmlFor="password">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={Credentials.password}
                            onChange={onChange}
                            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                            required
                            minLength={5}
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700" htmlFor="Cpassword">
                            Confirm Password
                        </label>
                        <input
                            type="password"
                            id="Cpassword"
                            name="Cpassword"
                            value={Credentials.Cpassword}
                            onChange={onChange}
                            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                            required
                            minLength={5}
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition ease-in-out duration-300"
                    >
                        Sign up
                    </button>

                </form>
            </div>
        </>
    );
}

export default Signup;
