import {
  FaTwitter,
  FaFacebookF,
  FaLinkedinIn,
  FaInstagram,
} from "react-icons/fa";
import { Link } from "react-router-dom"; // or 'next/link' if you're using Next.js

const socialLinks = [
  { icon: <FaTwitter />, url: "#" },
  { icon: <FaFacebookF />, url: "#" },
  { icon: <FaLinkedinIn />, url: "#" },
  { icon: <FaInstagram />, url: "#" },
];

const courses = [
  "Online Physics Tutor",
  "Online Chemistry Tutor",
  "Online Maths Tutor",
  "Online Biology Tutor",
];

const footerLinks = [
  { url: "/subject/physics", name: "Online Physics Tutor" },
  { url: "/subject/chemistry", name: "Online Chemistry Tutor" },
  { url: "/subject/math", name: "Online Maths Tutor" },
  { url: "/subject/biology", name: "Online Biology Tutor" },
];

export default function Footer() {
  return (
    <div className=" bg-[#393951] text-white text-xl">
      <div className="container mx-auto">
        <footer className=" py-10 px-5">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Get In Touch */}
            <div>
              <h2 className="text-orange-500 text-lg font-semibold mb-4">
                GET IN TOUCH
              </h2>
              <p className="flex items-center mb-2">
                Main Market, Malviya Nagar, New Delhi 110017
              </p>
              <p className="flex items-center mb-2">vikasinstitute.in</p>
              <p className="flex items-center mb-4">vipndls@gmail.com</p>
              <div className="flex space-x-4">
                {socialLinks.map((item, index) => (
                  <Link
                    to={item.url}
                    key={index}
                    className="p-2 border rounded hover:bg-orange-500 transition"
                  >
                    {item.icon}
                  </Link>
                ))}
              </div>
            </div>

            {/* Our Courses */}
            <div>
              <h2 className="text-orange-500 text-xl font-semibold mb-4">
                OUR COURSES
              </h2>
              <ul className="space-y-2">
                {courses.map((course, index) => (
                  <li key={index}>➤ {course}</li>
                ))}
              </ul>
            </div>

            {/* Newsletter */}
            <div>
              <h2 className="text-orange-500 text-xl font-semibold mb-4">
                NEWSLETTER
              </h2>
              <p className="mb-4">
                Rebum labore lorem dolores kasd est, et ipsum amet et at kasd,
                ipsum sea tempor magna tempor. Accu kasd sed ea duo ipsum. Dolor
                duo eirmod sea justo no lorem est diam
              </p>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Your Email Address"
                  className="w-full p-2 rounded-l bg-white text-black outline-none"
                />
                <button className="bg-orange-500 px-4 rounded-r">
                  Sign Up
                </button>
              </div>
            </div>
          </div>

          {/* Bottom Footer */}
          <div className="border-t border-gray-700  mt-10 pt-5 flex flex-col md:flex-row justify-between items-center text-sm">
            <p>
              <span className="text-orange-500">Urban Tutor</span>. All Rights
              Reserved. Designed by{" "}
              <span className="text-orange-500">Nita Infotech</span>
            </p>
            <div className="flex space-x-4 mt-3 md:mt-0">
              {footerLinks.map((link, index) => (
                <Link
                  to={link.url}
                  key={index}
                  className="hover:text-orange-500"
                >
                  {link.name}
                </Link>
              ))}
            </div>
            <div className="fixed ">
              <button className="bg-orange-500 p-3 rounded-full shadow-lg hover:bg-orange-600">
                <span className="text-white">⬆️</span>
              </button>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
