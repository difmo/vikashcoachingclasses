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
      title: "BOARDS",
      description: "11000+ Students Scored more than 90%",
    },
    {
      title: "NEET",
      description: [
        "7000+ Students Qualified .",
        "2100+ Students Scored 650+ Marks",
      ],
    },
    {
      title: "IIT-JEE",
      description: [
        "5000+ Students Qualified .",
        " 3100+ Students Scored 150+ Marks",
      ],
    },
  ];

  return (
    <div className="">
      <div className="container mx-auto px-4 py-10">
        {/* Heading Section */}
        <div className="text-center mb-10 bg-[#dba577] py-3">
          <h1 className="text-[#51087E] text-5xl font-bold">
            11 Years of Legacy
          </h1>
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
              className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-6 border bg-[#dba577] border-yellow-300/40 hover:shadow-amber-600 rounded-xl shadow-sm text-center"
            >
              <h2 className="text-xl font-semibold mb-2 text-[#51087E] ">
                {item.title}
              </h2>

              {/* Description */}
              {Array.isArray(item.description) ? (
                item.description.map((line, idx) => (
                  <p key={idx} className="text-[#51087E] ">
                    {line}
                  </p>
                ))
              ) : (
                <p className="text-[#51087E] ">{item.description}</p>
              )}
            </motion.div>
          ))}

          {/* Logo Section (or Registration Button) */}
          <motion.div
            variants={fadeInRight}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            custom={0.5}
            className="w-full"
          >
            <div className="text-center mt-4">
              {/* Text Content */}
              <CustomHeading text1="Testimonial" />
              <p className="text-center text-white text-2xl ">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Laboriosam magnam ipsam nostrum reprehenderit.{" "}
                <Link to="#">more..</Link>
              </p>
            </div>

            {/* Images */}
            <div className="flex flex-col lg:flex-row items-center justify-center gap-4 mt-4">
              {[...Array(4)].map((_, idx) => (
                <img
                  key={idx}
                  src={logo}
                  className="h-44 pt-2 pb-2 gap-6"
                  alt="Logo"
                />
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Legesy;
