import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

import CustomHeading from "./CustomHeading";
import TestimonialSlider from "./TestimonialSlider";

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
        <div className="text-center mb-10 bg-[#dba577] py-3 rounded-lg border-2 border-white">
          <h1 className="text-[#51087E] text-5xl font-bold">
            Our 11 Years of Legacy in Edutech Industres.
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
              className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-6 bg-[#dba577] border-white rounded-xl border-2  shadow-sm hover:shadow-amber-600 text-center"
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
            <div className="bg-[#dba577] w-full inline-block px-4 text-5xl font-bold py-2 rounded-lg border-2 border-white">
              <CustomHeading text1="Testimonials..." />
            </div>

            <p className="text-center text-white text-2xl mt-4">
              "At the Heart of our Success lies the Confidence that you Place in
              us, Globly. Your Trust is our Greatest Asset"
              {/* <Link to="#" className="underline hover:text-yellow-300">
                more..
              </Link> */}
            </p>
          </div>
          <TestimonialSlider />
          {/* <div className="flex flex-wrap justify-center gap-4 sm:gap-6 lg:gap-8 xl:gap-10 mt-6 px-4">
            {testimonials.map((testimonial, idx) => (
              <div
                key={idx}
                className="relative w-full sm:w-[45%] lg:w-[30%] xl:w-[22%] h-52 sm:h-56 md:h-60 lg:h-64 rounded-lg overflow-hidden shadow-lg"
              >
                <img
                  src={logo}
                  alt={`Testimonial image ${idx + 1}`}
                  className="absolute inset-0 h-full w-full object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-[#dba577]/60 text-headerbordertext p-4 flex flex-col justify-center text-sm">
                  <p className="italic py-2 line-clamp-4">
                    "{testimonial.text}"
                  </p>
                  <span className="text-lg py-2 text-right font-semibold">
                    – {testimonial.author}
                  </span>
                  <p className="flex justify-center pt-4">{testimonial.star}</p>
                </div>
              </div>
            ))}
          </div> */}
        </motion.div>
      </div>
    </div>
  );
};

export default Legacy;
