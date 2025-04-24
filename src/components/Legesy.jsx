import React from "react";
import { motion } from "framer-motion";

import { Link } from "react-router-dom";
import logo from "../assets/home.jpg";
import CustomHeading from "./CustomHeading";

// Variants for left and right entrance
const fadeInLeft = {
  hidden: { opacity: 0, x: -50 },
  visible: (i) => ({
    opacity: 1,
    x: 0,
    transition: {
      delay: i * 0.2,
      duration: 0.6,
      ease: "easeOut",
    },
  }),
};

const fadeInRight = {
  hidden: { opacity: 0, x: 50 },
  visible: (i) => ({
    opacity: 1,
    x: 0,
    transition: {
      delay: i * 0.2,
      duration: 0.6,
      ease: "easeOut",
    },
  }),
};

const Legesy = () => {
  const legacyStats = [
    {
      title: "Boards",
      description: "11000+ Students Quallified with or more then 90 %",
    },
    {
      title: "NEET",
      description: "7000+  Students Quallified 400+ Scores 650+ Marks",
    },
    {
      title: "IIT-JEE",
      description: "5000+ Students Quallified 100+ Scores 150+ Marks",
    },
  ];

  return (
    <div className="bg-white">
      <div className="container mx-auto px-4 md:px-28 py-10">
        {/* Heading Section */}
        <div className="text-center mb-10">
          <CustomHeading text1={"11 Years of"} text2={" Legacy"} />
        </div>

        {/* Legacy Stats with Animation */}
        <div className="flex flex-wrap justify-center gap-6 mb-12">
          {legacyStats.map((item, index) => (
            <motion.div
              key={index}
              custom={index}
              variants={index % 2 === 0 ? fadeInLeft : fadeInRight}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-6 border border-sky-300 rounded-xl shadow-sm text-center"
            >
              <h2 className="text-xl font-semibold mb-2 text-black">
                {item.title}
              </h2>
              <p className="text-gray-600">{item.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Forms Section with Scroll Animation */}
        <div className="flex flex-col lg:flex-row gap-6 justify-center items-stretch">
          {/* Logo Section (or Registration Button) */}
          <motion.div
            variants={fadeInRight}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            custom={0.5}
            className="w-full"
          >
            <div className="text-center lg:text-left mt-4">
              {/* Text Content */}
              <CustomHeading text1={"Tastmoinal"} />
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Laboriosam magnam ipsam nostrum reprehenderit.{" "}
                <Link to="#">more .. </Link>
              </p>
            </div>
            <div className="flex flex-col lg:flex-row items-center justify-center gap-6">
              {/* Adjusted Image Container */}
              <img
                src={logo}
                className="h-44 pt-4 pb-2 max-w-full"
                alt="Logo"
              />
              <img
                src={logo}
                className="h-44 pt-4 pb-2 max-w-full"
                alt="Logo"
              />
              <img
                src={logo}
                className="h-44 pt-4 pb-2 max-w-full"
                alt="Logo"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Legesy;
