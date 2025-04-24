import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  return (
    <header className="bg-white shadow sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-blue-600">
          Vikash Institute
        </Link>

        {/* Mobile Menu Toggle Button */}
        <div className="md:hidden">
          <button onClick={toggleMenu} aria-label="Toggle Menu">
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Navigation Links */}
        <div
          className={`md:flex md:items-center absolute md:static top-full left-0 w-full md:w-auto bg-white md:bg-transparent shadow md:shadow-none transition-all duration-300 ease-in-out z-40 ${
            isOpen ? "block" : "hidden"
          }`}
        >
          <ul className="flex flex-col md:flex-row gap-4 p-4 md:p-0 text-gray-700 font-medium">
            {/* <li>
              <Link to="/" onClick={closeMenu} className="hover:text-blue-500">
                Home
              </Link>
            </li> */}
            <li>
              <Link
                to="/online-classes"
                onClick={closeMenu}
                className="hover:text-blue-500"
              >
                Online Physics Tutor
              </Link>
            </li>
            <li>
              <Link
                to="/chemistry"
                onClick={closeMenu}
                className="hover:text-blue-500"
              >
                Online Chemistry Tutor
              </Link>
            </li>
            <li>
              <Link
                to="/maths"
                onClick={closeMenu}
                className="hover:text-blue-500"
              >
                Online Maths Tutor
              </Link>
            </li>
            <li>
              <Link
                to="/biology"
                onClick={closeMenu}
                className="hover:text-blue-500"
              >
                Online Biology Tutor
              </Link>
            </li>
            <li>
              <Link
                to="/courses"
                onClick={closeMenu}
                className="hover:text-blue-500"
              >
                Online Courses
              </Link>
            </li>
            <li>
              <Link
                to="/taup"
                onClick={closeMenu}
                className="hover:text-blue-500"
              >
                Taup (Urban Tutma)
              </Link>
            </li>
            <li className="block md:hidden">
              <Link
                to="/join-form"
                onClick={closeMenu}
                className="bg-blue-600 text-white px-8 py-2 rounded-lg hover:bg-blue-700 transition"
              >
                Join as a Tutor
              </Link>
            </li>
          </ul>
        </div>

        {/* "Join as a Tutor" Button for Desktop */}
        <div className="hidden md:block">
          <Link
            to="/join-form"
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Join as a Tutor
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
