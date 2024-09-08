import React, { useState, useEffect } from 'react';
import { MdClose } from 'react-icons/md';

const Alert = ({ message, onClose, type = 'success'  }) => {
    const [show, setShow] = useState(false);
    const [progress, setProgress] = useState(100);

    useEffect(() => {
        if (message) {
            setShow(true);
            const duration = 1500; // Duration for the alert to be visible
            const step = 100 / (duration / 30); // Calculate step size for each interval

            const progressTimer = setInterval(() => {
                setProgress((prev) => Math.max(prev - step, 0)); // Decrease progress
            }, 30); // Update every 30ms

            const hideTimer = setTimeout(() => {
                setShow(false);
                onClose();
            }, duration);

            return () => {
                clearTimeout(hideTimer);
                clearInterval(progressTimer);
            };
        }
    }, [message, onClose]);

   // Determine the background color based on the type
   const bgColor = type === "success" ? "bg-green-500" : "bg-red-500";
    return (
        <div
            className={`fixed top-4 right-4 ${bgColor} text-white p-2 rounded-md shadow-md transition-transform transform ${show ? 'translate-x-0' : 'translate-x-full'} opacity-${show ? '100' : '0'} transition-opacity duration-300`}
            style={{ transition: 'transform 0.3s ease-in-out, opacity 0.3s ease-in-out', maxHeight: '50px' }}
        >
            <div className="relative">
                <div className="flex justify-between items-center">
                    <span className="text-sm">{message}</span>
                    <MdClose className="cursor-pointer text-xl" onClick={() => setShow(false)} />
                </div>
                <div
                    className="absolute bottom-0 left-0 h-1 bg-white"
                    style={{ width: `${progress}%`, transition: 'width 0.03s linear' }}
                />
            </div>
        </div>
    );
};

export default Alert;
