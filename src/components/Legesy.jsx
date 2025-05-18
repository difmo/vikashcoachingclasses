import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

import CustomHeading from "./CustomHeading";
import TestimonialSlider from "./TestimonialSlider";
import CategoryContent from "./CategoryContent";
import StripeHeading from "./frontend_helpers/Heading";
import { tutordata } from "../data/AllData";
import { desc } from "framer-motion/client";
import img from "../assets/tutorcat/vikasinstitute.jpeg";


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
      <div className="container mx-auto px-4 py-10 ">
        {/* Heading */}
        {/* <div className="text-center mb-10 bg-[#ffffff] py-3 rounded-lg border-2 border-[#f5eee0e7]"> */}
        {/* <h1 className="text-[#51087E] text-5xl font-bold">
           
          </h1> */}
        <StripeHeading fontSize="text-4xl" text={" Our 11 Years of Legacy in Edutech Industries."} />
        {/* </div> */}

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
              className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-6 bg-[#ffffff] border-[#f5eee0e7] rounded-xl border-2  shadow-sm hover:shadow-amber-600 text-center"
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
        <StripeHeading text={"Online Tutoring Availble for CBSE, IGCSE, IB, ICSE, ISC Boards for Global Students."} />
        <CategoryContent heading={tutordata[0].title} desc={tutordata[0].description} imageLeft={false} image={tutordata[0].image} />
        <CategoryContent heading={tutordata[1].title} desc={tutordata[1].description} imageLeft={true} image={tutordata[1].image} />
        <CategoryContent heading={tutordata[2].title} desc={tutordata[2].description} imageLeft={false} image={tutordata[2].image} />
        <CategoryContent heading={tutordata[3].title} desc={tutordata[3].description} imageLeft={true} image={tutordata[3].image} />


        <div>
          <div className="mt-4">

          <StripeHeading fontSize="text-[21px]" text={"Online Science Tutoring (Physics, Chemistry, Maths & Biology) in 1-to-1 Personalized Mode | Vikas Institute"} />

          </div>
          <TutoringSection img={img} />
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

            <StripeHeading text="Testimonials..." />

            <p className="text-center  text-2xl mt-4 text-[#000000]">
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

const TutoringSection = ({ img }) => {
  return (
    <div className=" py-b max-w-7xl mx-auto">
      <div className="flex flex-col justify-center  gap-8 items-start">



        {/* Image */}
        <div className=" w-full">

          <img
            src={img}
            alt="Online Science Tutoring"
            className="w-full h-auto rounded-lg object-cover"
          />
        </div>

        {/* Text Content */}
        <div className=" w-full text-xl space-y-4 text-justify">

          <p>
            In today’s fast-paced academic environment, students need more than just traditional classroom teaching to truly master core science subjects like Physics, Chemistry, Maths, and Biology. At Vikas Institute, we bring the power of personalized 1-to-1 online tutoring into your home, helping students from Class 6 to Class 12 – across all major curriculums (CBSE, ICSE, IGCSE, IB & ISC Boards) – achieve academic excellence in science.
          </p>

          <p>
            Whether you're struggling with Newton’s laws in Physics, balancing chemical equations, solving calculus problems, or understanding human physiology, our personalized tutoring approach is tailored to unlock each student’s true potential.
          </p>

          <h3 className="font-semibold text-lg">Why Choose 1-to-1 Online Tutoring with Vikas Institute?</h3>

          <ul className="list-disc pl-6 space-y-2">
            <li>
              <strong>Customized Learning Plans for Every Student:</strong> Our expert tutors first assess the student’s current knowledge, strengths, and areas that need improvement. A customized plan is created for optimal learning.
            </li>
            <li>
              <strong>Expert Tutors:</strong> Highly qualified tutors, including IITians, NITians, PhDs, and professionals, ensure students gain conceptual clarity and score better.
            </li>
            <li>
              <strong>Flexible Scheduling:</strong> Sessions are scheduled around your convenience — be it daily or on weekends.
            </li>
            <li>
              <strong>Interactive & Engaging:</strong> Digital tools like whiteboards, simulations, and quizzes make learning fun and effective.
            </li>
            <li>
              <strong>Guaranteed Results:</strong> Our entire model is results-driven, helping students measurably improve their academic performance.
            </li>
          </ul>

          <p>
            We understand that when parents invest in personalized tutoring, they expect clear improvement in understanding, marks, and performance. Our framework is designed to help students reach their full potential with confidence.
          </p>
        </div>
      </div>
    </div>
  );
};

