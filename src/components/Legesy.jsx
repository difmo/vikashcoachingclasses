import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import logo from "../assets/home.jpg";
import CustomHeading from "./CustomHeading";

// Animation variants
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

const Legacy = () => {
  const legacyStats = [
    {
      title: "BOARDS",
      description: [
        "11000+ Students Scored more than 90%",
        "CBSE,  IB, IGCSE,   ICSE, ISE",
      ],
    },
    {
      title: "NEET",
      description: [
        "7000+ Students Qualified.",
        "2100+ Students Scored 650+ Marks",
      ],
    },
    {
      title: "IIT-JEE",
      description: [
        "5000+ Students Qualified.",
        "3100+ Students Scored 150+ Marks",
      ],
    },
  ];

  return (
    <div>
      <div className="container mx-auto px-4 py-10">
        {/* Heading */}
        <div className="text-center mb-10 bg-[#dba577] py-3 rounded-lg">
          <h1 className="text-[#51087E] text-5xl font-bold">
            11 Years of Legacy
          </h1>
        </div>

        {/* Stats Section */}
        <div className="flex flex-wrap justify-center gap-6 mb-12">
          {legacyStats.map((item, index) => (
            <motion.div
              key={index}
              custom={index}
              variants={index % 2 === 0 ? fadeInLeft : fadeInRight}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-6 bg-[#dba577] border border-yellow-300/40 rounded-xl shadow-sm hover:shadow-amber-600 text-center"
            >
              <h2 className="text-xl font-semibold mb-2 text-[#51087E]">
                {item.title}
              </h2>
              {item.description.map((line, idx) => (
                <p key={idx} className="text-[#51087E]">
                  {line}
                </p>
              ))}
            </motion.div>
          ))}
        </div>

        {/* Testimonials Section */}
        <motion.div
          variants={fadeInRight}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          custom={0.5}
          className="w-full"
        >
          <div className="text-center mt-8">
            <div className="bg-[#dba577] w-full inline-block px-4 py-2 rounded-lg">
              <CustomHeading text1="Testimonials" />
            </div>

            <p className="text-center text-white text-2xl mt-4">
              At the Heart of our Success lies the Confidence that you Place in Us, Globly.
              Your Trust is our Greatest Asset.
              {/* <Link to="#" className="underline hover:text-yellow-300">
                more..
              </Link> */}
            </p>
          </div>

          <div className="flex flex-col lg:flex-row items-center justify-center mt-6 gap-6 lg:gap-12">
            {[...Array(4)].map((_, idx) => (
              <img
                key={idx}
                src={logo}
                alt={`Testimonial image ${idx + 1}`}
                className="h-44 pt-2 pb-2 rounded-lg object-cover"
                loading="lazy"
              />
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Legacy;
