import {
  FaTwitter,
  FaFacebookF,
  FaLinkedinIn,
  FaInstagram,
  FaWhatsapp,
  FaYoutube,
} from "react-icons/fa";
import { Link } from "react-router-dom"; // or 'next/link' if you're using Next.js

const socialLinks = [
  {
    icon: <FaYoutube />,
    url: "https://youtube.com/@viptutors?si=5RXybw4w1k_a_lyX",
  },
  { icon: <FaTwitter />, url: "https://x.com/vikaskashyapsir?s=11" },
  {
    icon: <FaFacebookF />,
    url: "https://www.facebook.com/share/167YKPPfKp/?mibextid=wwXIfr",
  },
  {
    icon: <FaInstagram />,
    url: "https://www.instagram.com/onlinephysicsguru?igsh=cWwzY3ptMXluaGps&utm_source=qr",
  },
  { icon: <FaWhatsapp />, url: "https://wa.me/919582699555" },
];

const courses = [
  "Online Science Tutors",
  "Online Physics Tutors",
  "Online Chemistry Tutors",
  "Online Maths Tutors",
  "Online Biology Tutors",
];

const footerLinks = [
  { url: "/", name: "Online Science Tutors" },
  { url: "/subject/online-physics-tutors", name: "Online Physics Tutors" },
  { url: "/subject/online-chemistry-tutors", name: "Online Chemistry Tutors" },
  { url: "/subject/online-maths-tutors", name: "Online Maths Tutors" },
  { url: "/subject/online-biology-tutors", name: "Online Biology Tutors" },
  { url: "/join-form", name: "Contact Us" },
];

export default function Footer() {
  return (
    <div className=" bg-[#393951] text-white text-xl">
      <div className="container mx-auto">
        <footer className=" pt-10 px-5">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 pb-5">
            {/* Get In Touch */}
            <div>
              <h2 className="text-orange-500 text-lg font-semibold mb-4">
                GET IN TOUCH :
              </h2>
              <p className="flex items-center mb-2">
                Malviya Nagar, New Delhi 110017
              </p>
              <p className="flex items-center mb-2">
                {" "}
                Contact No : +91 84273 73281
              </p>
              <p className="flex items-center mb-7 text-2xl ">
                info@vikasinstitute.in
              </p>

              <div className="flex space-x-4 mb-4">
                {socialLinks.map((item, index) => (
                  <a
                    href={item.url}
                    key={index}
                    className="p-2 border rounded hover:bg-orange-500 transition"
                  >
                    {item.icon}
                  </a>
                ))}
              </div>
            </div>

            {/* Our Courses */}
            <div>
              <h2 className="text-orange-500 text-xl font-semibold mb-4">
                Hire Online Private Tutors :
              </h2>
              {footerLinks.map((link, index) => (
                <li>
                  <a
                    href={link.url}
                    key={index}
                    className="hover:text-orange-500"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
              {/* <ul className="space-y-2">
                {courses.map((course, index) => (
                  <li key={index}>➤ {course}</li>
                ))}
              </ul> */}
            </div>

            {/* Newsletter */}
            <div>
              <h2 className="text-orange-500 text-xl font-semibold mb-4">
                NEWSLETTER :
              </h2>
              <p className="mb-4 flex text-left">
                We specialize in providing personalized One to One tutors,
                across the students of the USA, CANADA, UK, QATAR, UAE, INDIA
                and AUSTRALIA.
              </p>
              <div className="flex w-full ">
                <input
                  type="email"
                  placeholder="Your Email Address"
                  className="w-full p-2 rounded-l bg-white text-black outline-none"
                />
                <button className="bg-orange-500 rounded-r px-6 py-2 text-white font-semibold whitespace-nowrap">
                  Sign Up
                </button>
              </div>
            </div>
          </div>

          {/* Bottom Footer */}
          <div className="border-t border-blue-500  "></div>
          <div className=" flex flex-col md:flex-row justify-between text-sm items-center py-5 ">
            <div>
              <p>
                <span className="text-orange-500">
                  Vikas Institute @ SYBRA CORPORATION. &nbsp;
                </span>
                All Rights Reserved.{"  "}
              </p>
            </div>
            <div className="flex space-x-4 mt-3 md:mt-0">
              {footerLinks.map((link, index) => (
                <a
                  href={link.url}
                  key={index}
                  className="hover:text-orange-500"
                >
                  {link.name}
                </a>
              ))}
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
