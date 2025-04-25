// src/components/Footer.js
import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white   ">
      <div className="container mx-auto px-4 py-10 max-w-7xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        <div>
          <h2 className="text-lg font-semibold mb-4">Get in Touch</h2>
          <p>UT</p>
          <p>Fother</p>
        </div>

        <div>
          <h2 className="text-lg font-semibold mb-4">Tutoring</h2>
          <ul className="space-y-2">
            <li>
              <Link to="/hire" className="hover:text-secondary transition">
                Hire Online Tutor
              </Link>
            </li>
            <li>
              <Link to="/apply" className="hover:text-secondary transition">
                Apply as a Tutor
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h2 className="text-lg font-semibold mb-4">Resources</h2>
          <ul className="space-y-2">
            <li>
              <Link to="/che" className="hover:text-secondary transition">
                Che
              </Link>
            </li>
            <li>
              <Link to="/an41" className="hover:text-secondary transition">
                AN 41
              </Link>
            </li>
            <li>
              <Link to="/m" className="hover:text-secondary transition">
                M
              </Link>
            </li>
          </ul>
        </div>

        <div className="text-white">
          <h2 className="text-lg font-semibold mb-4">Newsletter</h2>
          <p className="mb-2">Stay updated with our latest news</p>
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full px-3 py-2 rounded text-black mb-2 bg-white"
          />
          <button className="bg-secondary text-white px-4 py-2 rounded hover:bg-primary transition">
            Subscribe
          </button>
        </div>
      </div>

      <div className="text-center py-4 border-t border-gray-700 text-sm text-gray-400">
        © {new Date().getFullYear()} Roots Classes. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
