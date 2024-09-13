import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form'; // Import React Hook Form
import { FaEnvelope, FaLock } from 'react-icons/fa'; // Import icons
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai'; // Import eye icons
import Alert from './Alert';

const AuthPage = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [alertMessage, setAlertMessage] = useState("");
    const [alertType, setAlertType] = useState("success");
    const [showPassword, setShowPassword] = useState(false); // State for showing password
    const [showConfirmPassword, setShowConfirmPassword] = useState(false); // State for showing confirm password

    const navigate = useNavigate();
    
    // Initialize React Hook Form
    const { register, handleSubmit, formState: { errors }, watch } = useForm();

    const onSubmit = async (data) => {
        const { name, email, password } = data;

        let url = isLogin ? '/api/auth/login' : '/api/auth/createuser';

        const response = await fetch(`https://inotebook-vya3.onrender.com/${url}`, {
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
                <div className="w-full mt-44 md:mt-1 md:w-1/2 bg-gray-100 flex items-center justify-center p-6">
                    <div className="w-full max-w-md">
                        <h2 className="text-3xl text-blue-700 font-bold mb-6 text-center">{isLogin ? 'Login' : 'Signup'}</h2>
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                            {!isLogin && (
                                <div>
                                    <label className="block text-gray-700">Name</label>
                                    <input
                                        type="text"
                                        {...register("name", { required: "Name is required" })}
                                        className="w-full px-3 py-2 border rounded-md"
                                    />
                                    {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
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
                                        {...register("email", { 
                                            required: "Email is required", 
                                            pattern: { value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/, message: "Invalid email address" }
                                        })}
                                        className="w-full pl-10 px-3 py-2 border rounded-md"
                                    />
                                    {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
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
                                        {...register("password", { required: "Password is required", minLength: { value: 6, message: "Password must be at least 6 characters long" } })}
                                        className="w-full pl-10 px-3 py-2 border rounded-md"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 focus:outline-none"
                                    >
                                        {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
                                    </button>
                                    {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
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
                                            {...register("Cpassword", { 
                                                required: "Confirm password is required", 
                                                validate: value => value === watch('password') || "Passwords do not match" 
                                            })}
                                            className="w-full pl-10 px-3 py-2 border rounded-md"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                            className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 focus:outline-none"
                                        >
                                            {showConfirmPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
                                        </button>
                                        {errors.Cpassword && <p className="text-red-500 text-sm">{errors.Cpassword.message}</p>}
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
