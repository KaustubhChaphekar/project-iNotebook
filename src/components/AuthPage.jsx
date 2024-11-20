import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { FaEnvelope, FaLock } from 'react-icons/fa';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import Alert from './Alert';
import Spinner from './Spinner';
import { ThemeContext } from '../context/ThemeContext'; // Import Theme Context
import { FaPen, FaBook, FaLightbulb } from "react-icons/fa";

const messages = [
    "Conquer your day with organized notes!",
    "Transform your ideas into actions.",
    "Your thoughts deserve a home.",
];


const AuthPage = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [alertMessage, setAlertMessage] = useState("");
    const [alertType, setAlertType] = useState("success");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [currentMessage, setCurrentMessage] = useState(messages[0]);

    const navigate = useNavigate();
    const { theme } = useContext(ThemeContext); // Use theme context


    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            navigate('/home');
        }
    }, [navigate]);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentMessage((prev) => {
                const nextIndex = (messages.indexOf(prev) + 1) % messages.length;
                return messages[nextIndex];
            });
        }, 3000);

        return () => clearInterval(interval);
    }, []);

    const { register, handleSubmit, formState: { errors }, watch } = useForm();

    const onSubmit = async (data) => {
        setLoading(true);
        setTimeout(async () => {
            const { name, email, password } = data;
            let url = isLogin ? '/api/auth/login' : '/api/auth/createuser';

            try {
                const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000';
                const response = await fetch(`${backendUrl}${url}`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ name, email, password })
                });

                const json = await response.json();

                if (response.ok && json.success) {
                    localStorage.setItem('token', json.authToken);
                    setAlertMessage(isLogin ? "Login successful!" : "Account created successfully!");
                    setAlertType("success");
                    setTimeout(() => {
                        navigate('/home');
                    }, 1500);
                } else {
                    setAlertMessage(json.error || "Something went wrong");
                    setAlertType("error");
                }
            } catch (error) {
                setAlertMessage("Network error, please try again later.");
                setAlertType("error");
            } finally {
                setLoading(false);
            }
        }, 1000);
    };

    const handleAuthToggle = () => {
        setIsLogin(!isLogin);
        navigate(isLogin ? '/signup' : '/login');
    };

    return (
        <div className={`flex min-h-screen ${theme === 'light' ? 'bg-gray-800 text-white' : 'bg-gray-100 text-gray-900'}`}>
            {alertMessage && (
                <div className="fixed w-full top-12 left-0 flex justify-center z-50">
                    <Alert message={alertMessage} type={alertType} onClose={() => setAlertMessage("")} />
                </div>
            )}
            <div className="flex flex-col md:flex-row w-full">
                {/* Left Side - Form */}
                <div className="w-full mt-44 md:mt-1 md:w-1/2 bg-gradient-to-br from-yellow-300 to-blue-800 text-white flex items-center justify-center p-6 transition-transform transform duration-500 ease-in-out">
                    <div className="w-full max-w-md">
                        <h2 className="text-3xl font-bold mb-6 text-center animate__animated animate__fadeIn">{isLogin ? 'Login' : 'Signup'}</h2>
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                            {/* Name Field */}
                            {!isLogin && (
                                <div className="transition-all duration-500 ease-in-out transform hover:scale-105">
                                    <label className="block">Name</label>
                                    <div className="mb-2">
                                        <input
                                            type="text"
                                            {...register("name", { required: "Name is required" })}
                                            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 ease-in-out"
                                        />
                                    </div>
                                    <div className="min-h-[20px]">
                                        {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
                                    </div>
                                </div>
                            )}

                            {/* Email Field */}
                            <div className="transition-all duration-500 ease-in-out transform hover:scale-105">
                                <label className="block">Email</label>
                                <div className="relative mb-2">
                                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                                        <FaEnvelope />
                                    </span>
                                    <input
                                        type="email"
                                        {...register("email", {
                                            required: "Email is required",
                                            pattern: {
                                                value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                                                message: "Invalid email address"
                                            }
                                        })}
                                        className="w-full pl-10 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 ease-in-out"
                                    />
                                </div>
                                <div className="min-h-[20px]">
                                    {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
                                </div>
                            </div>

                            {/* Password Field */}
                            <div className="transition-all duration-500 ease-in-out transform hover:scale-105">
                                <label className="block">Password</label>
                                <div className="relative mb-2">
                                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                                        <FaLock />
                                    </span>
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        {...register("password", {
                                            required: "Password is required",
                                            minLength: { value: 6, message: "Password must be at least 6 characters long" },
                                            pattern: {
                                                value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{6,}$/,
                                                message: "Password must include at least 1 uppercase, 1 lowercase, 1 number, and 1 special character."
                                            }
                                        })}
                                        className="w-full pl-10 pr-10 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 ease-in-out"
                                    />
                                    <span
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer"
                                    >
                                        {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
                                    </span>
                                </div>
                                <div className="min-h-[20px]">
                                    {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
                                </div>
                            </div>

                            {/* Confirm Password Field */}
                            {!isLogin && (
                                <div className="transition-all duration-500 ease-in-out transform hover:scale-105">
                                    <label className="block">Confirm Password</label>
                                    <div className="relative mb-2">
                                        <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                                            <FaLock />
                                        </span>
                                        <input
                                            type={showConfirmPassword ? "text" : "password"}
                                            {...register("Cpassword", {
                                                required: "Confirm password is required",
                                                validate: value => value === watch('password') || "Passwords do not match"
                                            })}
                                            className="w-full pl-10 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 ease-in-out"
                                        />
                                        <span
                                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer"
                                        >
                                            {showConfirmPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
                                        </span>
                                    </div>
                                    <div className="min-h-[20px]">
                                        {errors.Cpassword && <p className="text-red-500 text-sm">{errors.Cpassword.message}</p>}
                                    </div>
                                </div>
                            )}

                            {/* Submit Button */}
                            <div className=" transition-all duration-500 ease-in-out transform hover:scale-105">
                                <button
                                    type="submit"
                                    className={`w-full flex justify-center items-center py-2 rounded-md bg-blue-500 text-white font-semibold focus:outline-none focus:ring-2 focus:ring-blue-600 hover:bg-blue-600 transition duration-300`}
                                    disabled={loading}
                                >
                                    {loading ? <Spinner /> : isLogin ? "Login" : "Signup"}
                                </button>
                            </div>
                        </form>

                        {/* Toggle Between Login and Signup */}
                        <div className="mt-6 text-center">
                            <button
                                onClick={handleAuthToggle}
                                className="text-white hover:text-blue-700"
                            >
                                {isLogin ? "Don't have an account? Sign up" : "Already have an account? Login"}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Right Side - Text/Content */}
                <div className="hidden md:flex w-1/2 bg-cover bg-center bg-no-repeat items-center justify-center" style={{ backgroundImage: "url('/assets/Bg-rightSide.jpg')" }}>

                    <div className="relative text-white text-center p-6">
                        <h1 className="text-4xl font-bold mb-5 animate-pulse">Welcome to the iNotebook</h1>
                        <p className="mt-4 text-lg">
                           {currentMessage}
                        </p>


                        <div className="flex justify-center mt-6 space-x-4">
                            <div className="text-blue-500 text-4xl animate-bounce">
                                <FaPen />
                            </div>
                            <div className="text-blue-500 text-4xl animate-bounce delay-150">
                                <FaBook />
                            </div>
                            <div className="text-blue-500 text-4xl animate-bounce delay-300">
                                <fa-lightbulb />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AuthPage;
