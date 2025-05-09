import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import logo from "../../assets/logo1.jpeg";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  const navLinks = [
    { path: "/about-us", label: "About Us" },
    { path: "/online-physics-tutors", label: "Online Physics Tutors" },
    {
      path: "/online-chemistry-tutors",
      label: "Online Chemistry Tutors",
    },
    { path: "/online-maths-tutors", label: "Online Maths Tutors" },
    { path: "/online-biology-tutors", label: "Online Biology Tutors" },
    { path: "/join-form", label: "Contact Us" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        isScrolled ? "bg-white shadow-md" : "bg-transparent md:bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-3 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <img src={logo} alt="Logo" className="h-11 border-2" />
        </Link>

        {/* Mobile Menu Button */}
        <button
          onClick={toggleMenu}
          className={`md:hidden ${
            isOpen ? " text-black" : isScrolled ? "text-black" : "text-black"
          }`}
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
          <ul
            className={`flex flex-col md:flex-row md:space-x-6 p-4 md:p-0 text-base font-medium text-black`}
          >
            {navLinks.map((link, index) => (
              <li key={index}>
                <Link
                  to={link.path}
                  onClick={closeMenu}
                  className="block py-2 md:py-0 hover:text-[#dba577] transition-colors text-xl"
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
