import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import img3 from "../../assets/home.jpg";

const slides = [
  {
    image: img3,
    heading: "Hi, Looking for Online Physics Tutor",
    text: "7th, 8th, 9th, 10th, 11th, 12th, JEE, NEET, NDA, must join roots classes.",
  },
  {
    image: img3,
    heading: "Hi, Looking for Online Chemistry Tutor",
    text: "7th, 8th, 9th, 10th, 11th, 12th, JEE, NEET, NDA, must join roots classes.",
  },
  {
    image: img3,
    heading: "Hi, Looking for Online Maths Tutor",
    text: "7th, 8th, 9th, 10th, 11th, 12th, JEE, NEET, NDA, must join roots classes.",
  },
  {
    image: img3,
    heading: "Hi, Looking for Online Biology Tutor",
    text: "7th, 8th, 9th, 10th, 11th, 12th, JEE, NEET, NDA, must join roots classes.",
  },
  {
    image: img3,
    heading: "You are at night ",
    text: "7th, 8th, 9th, 10th, 11th, 12th, JEE, NEET, NDA, must join roots classes.",
  },
];

// Animation for fade-in text
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

// Animation for background image zoom
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
    <div className="relative w-full h-[400px] md:h-[600px] overflow-hidden">
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
            alt="Slider"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40" />
        </motion.div>
      </AnimatePresence>

      {/* Content */}
      <div className="absolute inset-0 bg-black/40 flex flex-col justify-center items-center text-center px-6">
        <motion.h1
          key={`heading-${current}`}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="text-white mt-4 max-w-2xl text-3xl md:text-5xl lg:text-6xl font-bold"
        >
          {slides[current].heading}
        </motion.h1>
        <motion.p
          key={`text-${current}`}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.2 }}
          className="text-white text-base md:text-lg mt-4 max-w-2xl"
        >
          {slides[current].text}
        </motion.p>
      </div>

      {/* Dots Navigation */}
      <div className="absolute bottom-6 w-full flex justify-center gap-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`h-2.5 w-2.5 rounded-full transition-all ${
              index === current ? "bg-sky-500 scale-125" : "bg-gray-300"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default MainSlider;
