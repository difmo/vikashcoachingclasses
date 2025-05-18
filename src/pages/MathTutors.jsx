import React from "react";
import { onlineMathsTutors } from "../data/AllData";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet";
import Form from "../components/allform/Form";

import chem from "../assets/math.jpeg";

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

const MathTutors = () => {
  const rawData = onlineMathsTutors[0];

  const selectedData = [
    { mainHeading: rawData.mainHeadding },
    {
      title: rawData.mainTitle,
      subtitle: "",
      description: [rawData.welcomeMessage],
    },
    {
      title: "Why Choose Us :",
      description: rawData.whyChooseUs,
    },
    {
      title: "Board Wise Tutoring :",
      description: [
        `CBSE: ${rawData.boardTutoring?.CBSE || ""}`,
        `IB: ${rawData.boardTutoring?.IB || ""}`,
        `IGCSE: ${rawData.boardTutoring?.IGCSE || ""}`,
        `ICSE: ${rawData.boardTutoring?.ICSE || ""}`,
        `ISE: ${rawData.boardTutoring?.ISE || ""}`,
      ],
    },
    {
      title: "Global Coverage :",
      description: rawData.globalCoverage,
    },
    {
      title: "How It Works :",
      description: rawData.howItWorks,
    },
    {
      title: "Testimonials :",
      description: Array.isArray(rawData.testimonials)
        ? rawData.testimonials.map((item) =>
            typeof item === "string"
              ? item
              : `${item.name} (${item.location}): ${item.message}`
          )
        : ["No testimonials available."],
    },
    {
      title: "Competitive Exam Preparation :",
      description: rawData.competitiveExamPreparation,
    },
    {
      title: "Benefits of Learning with Us :",
      description: rawData.benefits,
    },
    {
      title: "Contact Us :",
      description: [
        `Phone: ${rawData.contact?.phone || ""}`,
        `Email: ${rawData.contact?.email || ""}`,
        `Website: ${rawData.contact?.website || ""}`,
      ],
    },
    {
      title: "Closing Note :",
      description: [rawData.closingLine],
    },
    {
      title: "Our Slogan :",
      description: [rawData.slogan],
    },
  ];

  return (
    <div>
      <Helmet>
        <title>{rawData.mainHeadding}</title>
      </Helmet>

      <div className="bg-[#f2f2f2] text-md text-blue-500 flex justify-center">
        <div className="text-headerbordertext font-extrabold text-md">
          Home / {rawData.mainHeadding}
        </div>
      </div>

      <div className="container bg-primary-gradient text-text mx-auto px-4 py-4">
        <div className="max-w-7xl mx-auto md:px-16">
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
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-primary mb-4">
                    {item.title}
                  </h2>
                  {item.subtitle && (
                    <h3 className="text-lg font-semibold text-gray-700 mb-4">
                      {item.subtitle}
                    </h3>
                  )}
                  {item.description?.map((text, idx) => (
                    <p
                      key={idx}
                      className="text-colorcontent text-base md:text-lg mb-4 leading-relaxed"
                    >
                      {text}
                    </p>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom Section: Image & Form */}
        <div className="flex flex-col-reverse lg:flex-row items-center justify-between gap-6 p-4 md:p-8">
          <div className="w-full lg:w-1/2 flex justify-center">
            <div className="w-full rounded-xl border-2 border-white overflow-hidden shadow-lg transition-transform duration-300 hover:scale-105">
              <img
                src={chem}
                alt="Online Chemistry Tutors"
                className="w-full h-[300px] sm:h-[400px] md:h-[460px] lg:h-[480px] xl:h-[480px] bg-cover rounded-xl"
              />
            </div>
          </div>

          <div className="w-full lg:w-1/2 mt-6 lg:mt-0">
            <Form />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MathTutors;
