import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import img3 from "../../assets/home.jpg";
import Form from "../allform/Form";

const slides = [
  {
    image: img3,
    heading: "Hi, Looking for Online Physics Tutor",
    text: "7th to 12th, JEE, NEET, NDA — Join Vikash Classes.",
  },
  {
    image: img3,
    heading: "Hi, Looking for Online Chemistry Tutor",
    text: "7th to 12th, JEE, NEET, NDA — Join Vikash Classes.",
  },
  {
    image: img3,
    heading: "Hi, Looking for Online Maths Tutor",
    text: "7th to 12th, JEE, NEET, NDA — Join Vikash Classes.",
  },
  {
    image: img3,
    heading: "Hi, Looking for Online Biology Tutor",
    text: "7th to 12th, JEE, NEET, NDA — Join Vikash Classes.",
  },
  {
    image: img3,
    heading: "You are at night",
    text: "Join Vikash Classes to brighten your future.",
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
      <div className="py-4 bg-[#f2f2f2] text-blue-500 flex justify-center text-lg md:text-2xl">
        {/* Optional Top Bar */}
      </div>

      {/* Main Container */}
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Left: Slider */}
          <div className="relative mt-8  w-full md:w-1/2 xl:w-2/3 h-[300px] sm:h-[400px] md:h-[500px] lg:h-[550px] xl:h-[600px] overflow-hidden rounded-lg">
            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                className="absolute inset-0 w-full h-full"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8 }}
              >
                <img
                  src={slides[current].image}
                  alt="Slide"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/40" />
              </motion.div>
            </AnimatePresence>

            {/* Text on Slide */}
            <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-4">
              <motion.h1
                key={`heading-${current}`}
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                className="text-white text-xl sm:text-3xl md:text-4xl lg:text-5xl font-bold max-w-2xl"
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
            <div className="mt-9 ">
              <Form />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainSlider;
