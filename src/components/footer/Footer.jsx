import {
  FaTwitter,
  FaFacebookF,
  FaLinkedinIn,
  FaInstagram,
  FaWhatsapp,
  FaYoutube,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import React, { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../../Firebase";

const socialLinks = [
  {
    icon: <FaYoutube />,
    url: "https://youtube.com/@viptutors?si=5RXybw4w1k_a_lyX",
    label: "YouTube",
  },
  {
    icon: <FaTwitter />,
    url: "https://x.com/vikaskashyapsir?s=11",
    label: "Twitter",
  },
  {
    icon: <FaFacebookF />,
    url: "https://www.facebook.com/share/167YKPPfKp/?mibextid=wwXIfr",
    label: "Facebook",
  },
  {
    icon: <FaInstagram />,
    url: "https://www.instagram.com/onlinephysicsguru?igsh=cWwzY3ptMXluaGps&utm_source=qr",
    label: "Instagram",
  },
  {
    icon: <FaWhatsapp />,
    url: "https://wa.me/918750919571",
    label: "WhatsApp",
  },
];

const footerLinks = [
  { url: "/", name: "Online Science Tutors" },
  { url: "/online-physics-tutors", name: "Online Physics Tutors" },
  { url: "/online-chemistry-tutors", name: "Online Chemistry Tutors" },
  { url: "/online-maths-tutors", name: "Online Maths Tutors" },
  { url: "/online-biology-tutors", name: "Online Biology Tutors" },
  { url: "/contact-us", name: "Contact Us" },
];

export default function Footer() {
  const [formData, setFormData] = useState({ email: "" });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateForm = () => {
    const { email } = formData;
    const newErrors = {};
    if (!email) newErrors.email = "Please enter your email.";
    else if (!/^\S+@\S+\.\S+$/.test(email))
      newErrors.email = "Enter a valid email.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      // Save to Firebase
      await addDoc(collection(db, "subscriptions"), {
        email: formData.email,
        createdAt: new Date(),
      });

      // Send email to Mailer API
      const response = await fetch(
        "https://us-central1-vip-home-tutors.cloudfunctions.net/sendNewsletterSubscription",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email: formData.email }),
        }
      );

      if (!response.ok) {
        throw new Error("Mailer API request failed");
      }

      setShowPopup(true);
      setFormData({ email: "" });
      setErrors({});
    } catch (error) {
      console.error("Subscription error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
<div className="bg-[#393951] text-white text-xl sticky-b-0 mb-0">
      <div className="container mx-auto">
        <footer className="pt-10 px-5">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 pb-5">
            {/* Get In Touch */}
            <div>
              <h2 className="text-orange-500 text-lg font-semibold mb-4">
                GET IN TOUCH :
              </h2>
              <p className="mb-2">Malviya Nagar, New Delhi 110017</p>
              <p className="mb-2">Contact No : +91 8750919571</p>
              <p className="mb-7 text-2xl">info@pcmbtutors.com</p>

              <div className="flex space-x-4 mb-4">
                {socialLinks.map((item, index) => (
                  <a
                    href={item.url}
                    key={index}
                    target="_blank"
                    rel="noopener noreferrer"
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
              <ul>
                {footerLinks.map((link, index) => (
                  <li key={index}>
                    <a href={link.url} className="hover:text-orange-500">
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Newsletter */}
            <div>
              <h2 className="text-orange-500 text-xl font-semibold mb-4">
                NEWSLETTER :
              </h2>
              <p className="mb-4 text-left">
                We specialize in providing personalized One to One tutors,
                across the students of the USA, CANADA, UK, QATAR, UAE, INDIA
                and AUSTRALIA.
              </p>
              <div className="flex w-full">
                <form
                  onSubmit={handleSubmit}
                  className="flex items-center w-full"
                >
                  <input
                    type="email"
                    name="email"
                    placeholder="Your Email Address"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full p-2 rounded-l bg-white text-black outline-none"
                  />
                  <button
                    disabled={isLoading}
                    className="bg-orange-500 rounded-r px-6 py-2 text-white font-semibold whitespace-nowrap"
                  >
                    {isLoading ? "Processing ..." : "Sign Up"}
                  </button>
                </form>
              </div>
              {errors.email && (
                <p className="text-sm text-red-500">{errors.email}</p>
              )}
              {showPopup && (
                <p className="text-sm text-green-400 mt-2">
                  Thank you for subscribing!
                </p>
              )}
            </div>
          </div>

          {/* Bottom Footer */}
          <div className="border-t border-blue-500"></div>
          <div className="flex flex-col md:flex-row justify-between text-sm items-center py-5">
            <p>
              <span className="text-orange-500">
                P.C.M.B. Tutors @ SYBRA CORPORATION. &nbsp;
              </span>
              All Rights Reserved.
            </p>
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
