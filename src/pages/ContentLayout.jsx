import React from "react";
import { useParams } from "react-router-dom";
import { physics, chemistry, math, biology } from "../data/AllData";
import { motion } from "framer-motion";

const dataMap = {
  physics,
  chemistry,
  math,
  biology,
};

// Dynamic slide variant based on direction
const getSlideVariant = (direction = "left") => ({
  hidden: {
    opacity: 0,
    x: direction === "left" ? -100 : 100,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.6,
    },
  },
});
const getSlideVariants = (direction = "rigbt") => ({
  hidden: {
    opacity: 0,
    x: direction === "right" ? 100 : -100,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.6,
    },
  },
});
const ContentLayout = () => {
  const { subject } = useParams();
  const selectedData = dataMap[subject];

  if (!selectedData) {
    return (
      <div className="text-center text-red-500 mt-10">Subject not found</div>
    );
  }

  return (
    <div className="container bg-primary-gradient text-text mx-auto px-4 py-8">
      <div className="max-w-7xl mx-auto space-y-12">
        {selectedData.map((item, index) => {
          const isEven = index % 2 === 0;
          const direction = isEven ? "left" : "right";

          return (
            <motion.div
              key={index}
              className={`flex flex-col ${
                isEven ? "md:flex-row" : "md:flex-row-reverse"
              } items-center gap-8`}
              variants={getSlideVariant(direction)}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
            >
              <motion.div
                className="flex-1"
                variants={getSlideVariants(direction)}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
              >
                <h2 className="text-xl font-bold mb-4">{item.title}</h2>
                {item.descraption.map((text, idx) => (
                  <p
                    key={idx}
                    className="text-gray-700 text-base md:text-lg mb-2"
                  >
                    {text}
                  </p>
                ))}
              </motion.div>
              <div className="w-full md:w-1/3">
                <div className="flex items-center justify-center rounded-xl overflow-hidden">
                  <img
                    src={item.src}
                    alt={item.title}
                    className="w-full h-auto max-w-full rounded-xl"
                  />
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default ContentLayout;
