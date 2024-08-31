import React, { useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

function Navbar() {
  const token = localStorage.getItem("token");
  let navigate = useNavigate();
  const location = useLocation();

  const handleClick = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  useEffect(() => {
    console.log(location.pathname);
  }, [location]);

  return (
    <nav className="bg-gray-900 text-white shadow-lg">
      <div className="container mx-auto flex justify-between items-center p-4">
        <Link className="text-2xl font-bold text-purple-400 hover:text-purple-300 transition-colors" to="/">
          NoteKeeper
        </Link>
        <button
          className="text-white lg:hidden focus:outline-none"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="hidden lg:flex lg:items-center lg:space-x-6" id="navbarSupportedContent">
          <ul className="flex space-x-6">
            <li>
              <Link
                className={`nav-link text-lg ${location.pathname === "/" ? "font-semibold text-purple-500 border-b-2 border-purple-500" : "hover:text-purple-300 transition-colors"}`}
                to="/"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                className={`nav-link text-lg ${location.pathname === "/about" ? "font-semibold text-purple-500 border-b-2 border-purple-500" : "hover:text-purple-300 transition-colors"}`}
                to="/about"
              >
                About
              </Link>
            </li>
          </ul>
          {token ? (
            <button
              className="bg-purple-500 hover:bg-purple-600 text-white font-semibold py-2 px-4 rounded-full focus:outline-none transition-colors"
              onClick={handleClick}
            >
              Logout
            </button>
          ) : (
            <div className="flex space-x-4">
              <Link
                className="bg-purple-500 hover:bg-purple-600 text-white font-semibold py-2 px-4 rounded-full focus:outline-none transition-colors"
                to="/login"
              >
                Login
              </Link>
              <Link
                className="bg-purple-500 hover:bg-purple-600 text-white font-semibold py-2 px-4 rounded-full focus:outline-none transition-colors"
                to="/signup"
              >
                Sign Up
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
