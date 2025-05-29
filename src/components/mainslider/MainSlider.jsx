import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import Form from "../allform/Form";
import vikas0 from "../../assets/homeslider/vikas0.png";
import vikas1 from "../../assets/homeslider/vikas.png";
import vikas2 from "../../assets/homeslider/vikas1.png";
import vikas3 from "../../assets/homeslider/vikas3.png";
import vikas4 from "../../assets/homeslider/vikas4.png";

const slides = [
  {
    image: vikas0,
    heading: "Hi, Looking for Online Science Tutor ",
    text: "You are at the Right Place, Kindly fill the Form to Get in Touch or Whatsapp us ... ",
  },
  {
    image: vikas1,
    heading: "Hi, Looking for Online Physics Tutor ",
    text: "You are at the Right Place, Kindly fill the Form to Get in Touch or Whatsapp us ... ",
  },
  {
    image: vikas2,
    heading: "Hi, Looking for Online Chemistry Tutor ",
    text: "You are at the Right Place, Kindly fill the Form to Get in Touch or Whatsapp us ... ",
  },
  {
    image: vikas4,
    heading: "Hi, Looking for Online Maths Tutor ",
    text: "You are at the Right Place, Kindly fill the Form to Get in Touch or Whatsapp us ... ",
  },
  {
    image: vikas3,
    heading: "Hi, Looking for Online Biology Tutor ",
    text: "You are at the Right Place, Kindly fill the Form to Get in Touch or Whatsapp us ... ",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const MainSlider = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(interval);
  }, [current]);

  const nextSlide = () => {
    setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const goToSlide = (index) => {
    setCurrent(index);
  };

  return (
    <div className="w-full">
      {/* Top Section */}
      <div className="bg-[#f2f2f2] text-[#51087E] flex justify-center font-extrabold text-md md:text-md overflow-hidden">
        <motion.div
          className="whitespace-nowrap"
          animate={{ x: ["100%", "-100%"] }}
          transition={{
            repeat: Infinity,
            repeatType: "loop",
            duration: 20,
            ease: "linear",
          }}
        >
          A Most Trusted Website to Hire, Best Online Private Tutors for the
          Students of &nbsp; USA - CANADA - UK - QATAR - UAE - AUSTRALIA -
          INDIA.
        </motion.div>
      </div>

      {/* Main Container */}
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row gap-6 mt-4">
          {/* Left: Slider */}
          <div className="relative  w-full md:w-1/2 xl:w-2/3 h-[213px] sm:h-[392px] md:h-[523px] lg:h-[491px] xl:h-[490px] overflow-hidden rounded-lg">
            <div className="relative w-full h-full rounded-2xl border-3 border-white overflow-hidden">
              <img
                src={slides[current].image}
                alt="vikasinstitute.in"
                className="w-full h-full bg-cover transition-opacity duration-500"
              />
              <div className="absolute inset-0 bg-black/15" />
            </div>

            {/* Text on Slide */}
            <div className="absolute inset-0 flex flex-col justify-end items-center text-center px-4 pb-10">
              <motion.h1
                key={`heading-${current}`}
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                className="text-white text-xl sm:text-3xl md:text-7xl lg:text-7xl font-bold max-w-2xl"
              >
                {slides[current].heading}
              </motion.h1>
              <motion.p
                key={`text-${current}`}
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                transition={{ delay: 0.2 }}
                className="text-white text-sm sm:text-lg md:text-xl mt-4 max-w-2xl"
              >
                {slides[current].text}
              </motion.p>
            </div>

            {/* Dots */}
            <div className="absolute bottom-4 w-full flex justify-center items-center gap-2 z-10">
              {slides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`h-2.5 w-2.5 rounded-full transition-all duration-300 ${
                    index === current ? "bg-sky-500 scale-125" : "bg-gray-300"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Right: Form */}
          <div className="w-full md:w-1/2 xl:w-1/3">
            <div className="">
              <Form />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainSlider;
