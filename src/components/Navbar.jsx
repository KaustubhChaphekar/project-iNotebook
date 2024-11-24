import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import Alert from "./Alert";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState("success");

  let navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem("token");
    setAlertType("success");
    setAlertMessage("Logged out successfully!");
    setTimeout(() => {
      navigate("/login");
    }, 1000);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <nav className="fixed w-full bg-slate-800 text-white py-2 shadow-lg z-50">
        {alertMessage && (
          <Alert
            message={alertMessage}
            type={alertType}
            onClose={() => setAlertMessage("")}
          />
        )}
        <div className="container mx-auto flex justify-between items-center px-4 md:px-8">
          {/* Logo */}
          <div className="logo font-bold text-xl mx-2 hover:text-blue-500 transition-colors">
            <Link to="/">iNotebook</Link>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden">
            <button onClick={toggleMenu} className="text-white focus:outline-none">
              {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>
          </div>

          {/* Menu Items */}
          <ul
            className={`flex flex-col md:flex-row gap-4 md:gap-8 fixed md:static top-16 right-0 w-full md:w-auto bg-slate-800 md:bg-transparent z-40 md:z-auto transition-transform transform ${
              isMenuOpen ? "translate-x-0" : "translate-x-full"
            } md:translate-x-0`}
          >
            <li
              className={`px-4 py-2 ease-out duration-300 ${
                location.pathname === "/home"
                  ? "text-blue-500"
                  : "hover:text-blue-500"
              }`}
            >
              <Link to="/home" onClick={() => setIsMenuOpen(false)}>
                Home
              </Link>
            </li>
            <li
              className={`px-4 py-2 ease-out duration-300 ${
                location.pathname === "/about"
                  ? "text-blue-500"
                  : "hover:text-blue-500"
              }`}
            >
              <Link to="/about" onClick={() => setIsMenuOpen(false)}>
                About
              </Link>
            </li>
            <li
              className={`px-4 py-2 ease-out duration-300 ${
                location.pathname === "/contact"
                  ? "text-blue-500"
                  : "hover:text-blue-500"
              }`}
            >
              <Link to="/contact" onClick={() => setIsMenuOpen(false)}>
                Contact
              </Link>
            </li>
            
            {localStorage.getItem("token") && (
              <li className="md:hidden px-4">
                <button
                  onClick={handleLogout}
                  className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 transition ease-in-out duration-300 w-full"
                >
                  Logout
                </button>
              </li>
            )}
          </ul>

          {/* Logout Button for Larger Screens */}
          {localStorage.getItem("token") && (
            <button
              onClick={handleLogout}
              className="hidden md:block bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 transition ease-in-out duration-300"
            >
              Logout
            </button>
          )}
        </div>

        {/* Backdrop for Mobile Menu */}
        {isMenuOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-30"
            onClick={toggleMenu}
          ></div>
        )}
      </nav>
    </>
  );
};

export default Navbar;
