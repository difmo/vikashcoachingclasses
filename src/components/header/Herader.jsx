import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import CustomButton from "../CustomButton";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  const navLinks = [
    { path: "/subject/physics", label: "Online Physics Tutor" },
    { path: "/subject/chemistry", label: "Online Chemistry Tutor" },
    { path: "/subject/math", label: "Online Maths Tutor" },
    { path: "/subject/biology", label: "Online Biology Tutor" },
    { path: "/online-classes", label: "Online Courses" },
    { path: "/join-form", label: "Join as a Tutor" },
  ];

  return (
    <div className=" shadow ">
      <div className="container mx-auto">
        <header className="sticky top-0 z-50 w-full items-center h-20">
          <div className=" mx-auto px-4 sm:px-6 lg:px-8 pt-6 flex justify-between items-center">
            {/* Logo */}
            <Link to="/" className="text-2xl font-bold text-gradient-primary">
              Vikas Institute
            </Link>

            {/* Mobile Menu Toggle */}
            <div className="md:hidden ">
              <button onClick={toggleMenu} aria-label="Toggle Menu">
                {isOpen ? <X size={28} /> : <Menu size={28} />}
              </button>
            </div>

            {/* Navigation */}
            <nav
              className={`${
                isOpen ? "block" : "hidden"
              } absolute md:static top-full left-0 w-full md:w-auto bg-white md:bg-transparent shadow md:shadow-none transition-all duration-300 ease-in-out z-40 md:flex md:items-center`}
            >
              <ul className="flex flex-col md:flex-row gap-4 p-4 md:p-0 text-lg  text-[#f2f2f2] font-medium">
                {navLinks.map((link, index) => (
                  <li key={index}>
                    <Link
                      to={link.path}
                      onClick={closeMenu}
                      className="hover:text-secondary hover:underline transition-colors duration-200"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </header>
      </div>
    </div>
  );
};

export default Header;
