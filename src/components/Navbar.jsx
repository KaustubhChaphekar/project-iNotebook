import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaBars, FaTimes  } from "react-icons/fa"; // Import icons for mobile menu
import Alert from "./Alert";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State for mobile menu
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState("success");

  let navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem("token");
    setAlertType("success");
    setAlertMessage("Logged out successfully!");

    // Redirect to login after showing alert
    setTimeout(() => {
      navigate("/login");
    }, 1000); // Delay to allow alert to show up
  };

  // Toggle menu for mobile view
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <nav className="fixed w-full bg-slate-800 text-white py-2 z-50">
        {alertMessage && (
          <Alert
            message={alertMessage}
            type={alertType}
            onClose={() => setAlertMessage("")}
          />
        )}
        <div className="container mx-auto flex justify-around items-center px-4 md:px-8">
          <div className="logo font-bold text-xl mx-2">iNotebook</div>
          
          {/* Mobile Menu Icon */}
          <div className="md:hidden">
            <button onClick={toggleMenu} className="text-white focus:outline-none">
              {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>
          </div>

          {/* Menu Items */}
          <ul className={`flex flex-col md:flex-row gap-4 md:gap-8 fixed md:static top-16 right-0 w-full md:w-auto bg-slate-800 md:bg-transparent z-40 md:z-auto transition-transform transform ${isMenuOpen ? "translate-x-0" : "translate-x-full"} md:translate-x-0`}>
            <li
              className={`px-4 py-2 cursor-pointer ease-out duration-300 ${location.pathname === "/home"
                  ? "text-blue-500"
                  : "hover:text-blue-500"
                }`}
            >
              <Link to="/home" onClick={() => setIsMenuOpen(false)}>Home</Link>
            </li>
            <li
              className={`px-4 py-2 cursor-pointer ease-out duration-300 ${location.pathname === "/about"
                  ? "text-blue-500"
                  : "hover:text-blue-500"
                }`}
            >
              <Link to="/about" onClick={() => setIsMenuOpen(false)}>About</Link>
            </li>
            <li className="relative cursor-pointer ease-out duration-300 hover:text-blue-500 group px-4 py-2">
              Contact
              <div className="absolute left-0 top-full mt-2 p-4 w-64 bg-white text-black border border-gray-200 rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <p>Email: sample@example.com</p>
                <p>Phone: +123 456 7890</p>
              </div>
            </li>
            {localStorage.getItem("token")  && (
            <li>
          <div className="flex md:hidden justify-end mt-[-160px] mx-4">
            <button
              onClick={handleLogout}
              className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 transition ease-in-out duration-300"
            >
              Logout
            </button>
          </div>
            </li>)}
          </ul>
          {/* Logout Button for larger screens */}
          {localStorage.getItem("token") && (
            <button
              onClick={handleLogout}
              className="hidden md:block bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 transition ease-in-out duration-300"
            >
              Logout
            </button>
          )}
        </div>
       
      </nav>
    </>
  );
};

export default Navbar;
