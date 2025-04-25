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

const imageZoom = {
  initial: { scale: 1 },
  animate: { scale: 1.05 },
  exit: { scale: 1 },
  transition: { duration: 5, ease: "linear" },
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
    <div className="relative w-full h-[400px] md:h-[600px] xl:h-[700px] overflow-hidden">
      {/* Background Image & Overlay */}
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          variants={imageZoom}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={imageZoom.transition}
          className="absolute inset-0 w-full h-full"
        >
          <img
            src={slides[current].image}
            alt="Slide"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40" />
        </motion.div>
      </AnimatePresence>

      {/* Center Text Content */}
      <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-4 md:px-6">
        <motion.h1
          key={`heading-${current}`}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="text-white text-2xl md:text-4xl lg:text-5xl font-bold max-w-xl"
        >
          {slides[current].heading}
        </motion.h1>
        <motion.p
          key={`text-${current}`}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.2 }}
          className="text-white text-sm md:text-lg mt-4 max-w-xl"
        >
          {slides[current].text}
        </motion.p>
      </div>

      {/* Form Overlay (Right side) */}
      <div className="absolute hidden md:block right-4 top-1/2 transform -translate-y-1/2 w-full max-w-sm bg-white/40 backdrop-blur-md shadow-xl rounded-lg md:right-10">
        <Form />
      </div>

      {/* Dots */}
      <div className="absolute bottom-4 w-full flex justify-center gap-2 z-10">
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
  );
};

export default MainSlider;
