import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaEnvelope, FaLock } from 'react-icons/fa'; // Import icons
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai'; // Import eye icons
import Alert from './Alert';

const AuthPage = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [credentials, setCredentials] = useState({ email: '', password: '', name: '', Cpassword: '' });
    const [alertMessage, setAlertMessage] = useState("");
    const [alertType, setAlertType] = useState("success");
    const [showPassword, setShowPassword] = useState(false); // State for showing password
    const [showConfirmPassword, setShowConfirmPassword] = useState(false); // State for showing confirm password

    let navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { name, email, password, Cpassword } = credentials;

        let url = isLogin ? '/api/auth/login' : '/api/auth/createuser';
        if (!isLogin && password !== Cpassword) {
            setAlertMessage("Passwords do not match");
            setAlertType("error");
            return;
        }

        const response = await fetch(`http://localhost:3000${url}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ name, email, password })
        });

        const json = await response.json();
        if (json.success) {
            localStorage.setItem('token', json.authToken);
            setAlertMessage(isLogin ? "Login successful!" : "Account created successfully!");
            setAlertType("success");
            setTimeout(() => {
                navigate('/home');
            }, 1000);
        } else {
            setAlertMessage(json.error || "Something went wrong");
            setAlertType("error");
        }
    }

    const handleChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    const handleAuthToggle = () => {
        setIsLogin(!isLogin);
        navigate(isLogin ? '/signup' : '/login'); // Update URL based on the current state
    };

    return (
        <div className="flex min-h-screen">
            {alertMessage && (
                <div className="fixed w-full top-12 left-0 flex justify-center z-50">
                    <Alert message={alertMessage} type={alertType} onClose={() => setAlertMessage("")} />
                </div>
            )}
            <div className="flex flex-col md:flex-row w-full">
                <div className="w-full mt-44 md:mt-1  md:w-1/2 bg-gray-100 flex items-center justify-center p-6">
                    <div className="w-full max-w-md">
                        <h2 className="text-3xl text-blue-700 font-bold mb-6 text-center">{isLogin ? 'Login' : 'Signup'}</h2>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {!isLogin && (
                                <div>
                                    <label className="block text-gray-700">Name</label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={credentials.name}
                                        onChange={handleChange}
                                        className="w-full px-3 py-2 border rounded-md"
                                        required
                                    />
                                </div>
                            )}
                            <div>
                                <label className="block text-gray-700">Email</label>
                                <div className="relative">
                                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
                                        <FaEnvelope />
                                    </span>
                                    <input
                                        type="email"
                                        name="email"
                                        value={credentials.email}
                                        onChange={handleChange}
                                        className="w-full pl-10 px-3 py-2 border rounded-md"
                                        required
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-gray-700">Password</label>
                                <div className="relative">
                                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
                                        <FaLock />
                                    </span>
                                    <input
                                        type={showPassword ? "text" : "password"} // Toggle input type
                                        name="password"
                                        value={credentials.password}
                                        onChange={handleChange}
                                        className="w-full pl-10 px-3 py-2 border rounded-md"
                                        required
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 focus:outline-none"
                                    >
                                        {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
                                    </button>
                                </div>
                            </div>
                            {!isLogin && (
                                <div>
                                    <label className="block text-gray-700">Confirm Password</label>
                                    <div className="relative">
                                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
                                            <FaLock />
                                        </span>
                                        <input
                                            type={showConfirmPassword ? "text" : "password"} // Toggle input type for confirm password
                                            name="Cpassword"
                                            value={credentials.Cpassword}
                                            onChange={handleChange}
                                            className="w-full pl-10 px-3 py-2 border rounded-md"
                                            required
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                            className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 focus:outline-none"
                                        >
                                            {showConfirmPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
                                        </button>
                                    </div>
                                </div>
                            )}
                            <button
                                type="submit"
                                className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition ease-in-out duration-300"
                            >
                                {isLogin ? 'Login' : 'Signup'}
                            </button>
                        </form>
                        <div className="text-center mt-4">
                            <button
                                onClick={handleAuthToggle}
                                className="text-blue-500 hover:underline"
                            >
                                {isLogin ? 'Create an account' : 'Already have an account? Login'}
                            </button>
                        </div>
                    </div>
                </div>
                <div className="hidden md:flex pt-16 w-1/2 bg-blue-500 text-white justify-center items-center p-6">
                    <div className="text-center">
                        <h1 className="text-4xl font-bold mb-5">Welcome to the iNotebook</h1>
                        <div>
                            <h2 className="text-2xl font-bold">{!isLogin ? "Join the Note-Taking Revolution!" : "Log In to Unleash Your Productivity"}</h2>
                            <p className="mt-4">
                                {!isLogin ? "Your thoughts deserve a safe home. Sign up to get started!" : "Ready to conquer the day? Your notes are just a click away."}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AuthPage;
