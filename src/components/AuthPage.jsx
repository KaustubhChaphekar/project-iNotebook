import React, { useState, useEffect, useContext } from 'react'; 
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form'; 
import { FaEnvelope, FaLock } from 'react-icons/fa'; 
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai'; 
import Alert from './Alert';
import ThreeDotsSpinner from './Spinner';
import { ThemeContext } from '../context/notes/ThemeContext'; // Import Theme Context

const AuthPage = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [alertMessage, setAlertMessage] = useState("");
    const [alertType, setAlertType] = useState("success");
    const [showPassword, setShowPassword] = useState(false); 
    const [showConfirmPassword, setShowConfirmPassword] = useState(false); 
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    // Access theme context
    const { theme } = useContext(ThemeContext);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            navigate('/home');
        }
    }, [navigate]);

    const { register, handleSubmit, formState: { errors }, watch } = useForm();

    const onSubmit = async (data) => {
        setLoading(true); 
        const { name, email, password } = data;
        let url = isLogin ? '/api/auth/login' : '/api/auth/createuser';

        try {
            const response = await fetch(`https://inotebook-vya3.onrender.com${url}`, {
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
                }, 1000);
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
    };

    const handleAuthToggle = () => {
        setIsLogin(!isLogin);
        navigate(isLogin ? '/signup' : '/login');
    };

    // Theme-based styles
    const inputThemeClass = theme === 'dark' 
        ? 'bg-gray-700 text-white border-gray-600 focus:ring-blue-500 focus:border-blue-500'
        : 'bg-gray-100 text-black border-gray-300 focus:ring-blue-500 focus:border-blue-500';

    return (
        <div className={`flex min-h-screen ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-100 text-black'}`}>
            {alertMessage && (
                <div className="fixed w-full top-12 left-0 flex justify-center z-50">
                    <Alert message={alertMessage} type={alertType} onClose={() => setAlertMessage("")} />
                </div>
            )}
            <div className="flex flex-col md:flex-row w-full">
                <div className={`w-full mt-44 md:mt-1 md:w-1/2 ${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-100'} flex items-center justify-center p-6`}>
                    <div className="w-full max-w-md">
                        <h2 className={`text-3xl font-bold mb-6 text-center ${theme === 'dark' ? 'text-white' : 'text-blue-700'}`}>
                            {isLogin ? 'Login' : 'Signup'}
                        </h2>
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                            {!isLogin && (
                                <div>
                                    <label className="block">Name</label>
                                    <input
                                        type="text"
                                        {...register("name", { required: "Name is required" })}
                                        className={`w-full px-3 py-2 border rounded-md ${inputThemeClass}`}
                                    />
                                    {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
                                </div>
                            )}
                            <div>
                                <label className="block">Email</label>
                                <div className="relative min-h-[60px]">
                                    <span className="absolute bottom-[18px] top-0 left-0 flex items-center pl-3">
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
                                        className={`w-full pl-10 px-3 py-2 border rounded-md ${inputThemeClass}`}
                                    />
                                    {errors.email && (
                                        <p className="text-red-500 text-sm absolute top-11 -bottom-5 left-0">
                                            {errors.email.message}
                                        </p>
                                    )}
                                </div>
                            </div>

                            <div>
                                <label className="block">Password</label>
                                <div className="mb-4 flex items-center relative">
                                    <FaLock className="mr-2" />
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
                                        className={`w-full pl-10 px-3 py-2 border rounded-md ${inputThemeClass}`}
                                    />
                                    <span onClick={() => setShowPassword(!showPassword)} className="cursor-pointer ml-2">
                                        {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
                                    </span>
                                    {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
                                </div>
                            </div>

                            <button
                                type="submit"
                                className={`w-full py-2 px-4 rounded-md transition ease-in-out duration-300 ${
                                    theme === 'dark' ? 'bg-blue-700 hover:bg-blue-600 text-white' : 'bg-blue-500 hover:bg-blue-700 text-white'
                                }`}
                                disabled={loading}
                            >
                                {loading ? <ThreeDotsSpinner /> : isLogin ? 'Login' : 'Signup'}
                            </button>
                        </form>
                        <div className="text-center mt-4">
                            <button
                                onClick={handleAuthToggle}
                                className={`hover:underline ${theme === 'dark' ? 'text-blue-400' : 'text-blue-500'}`}
                            >
                                {isLogin ? 'Create an account' : 'Already have an account? Login'}
                            </button>
                        </div>
                    </div>
                </div>
                <div className={`hidden md:flex pt-16 w-1/2 ${theme === 'dark' ? 'bg-gray-900' : 'bg-blue-500'} text-white justify-center items-center p-6`}>
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
