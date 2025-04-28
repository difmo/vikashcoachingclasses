import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import logo from "../../assets/logo1.jpeg";
import CustomButton from "../CustomButton";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  const navLinks = [
    { path: "/about-us", label: "About Us" },
    { path: "/subject/physics", label: "Online Physics Tutor" },
    { path: "/subject/chemistry", label: "Online Chemistry Tutor" },
    { path: "/subject/math", label: "Online Maths Tutor" },
    { path: "/subject/biology", label: "Online Biology Tutor" },
    { path: "/join-form", label: "Contact Us" },
  ];

  return (
    <header className="sticky top-0 z-50 w-ful">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-3 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <img src={logo} alt="Logo" className="h-11 border-2 rounded" />
        </Link>

        {/* Mobile Menu Button */}
        <button
          onClick={toggleMenu}
          className="md:hidden text-gray-700"
          aria-label="Toggle Menu"
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>

        {/* Navigation Links */}
        <nav
          className={`${
            isOpen ? "block" : "hidden"
          } absolute top-full left-0 w-full bg-white md:bg-transparent md:static md:w-auto md:flex md:items-center z-40 transition-all duration-300 ease-in-out`}
        >
          <ul className="flex flex-col md:flex-row md:space-x-6 p-4 md:p-0 text-base font-medium text-gray-800">
            {navLinks.map((link, index) => (
              <li key={index}>
                <Link
                  to={link.path}
                  onClick={closeMenu}
                  className="block py-2 md:py-0 hover:text-blue-600 transition-colors"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
