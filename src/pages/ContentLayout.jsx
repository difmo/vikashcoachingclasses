import React from "react";
import { useParams } from "react-router-dom";
import { physics, chemistry, math, biology } from "../data/AllData";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet";
import Form from "../components/allform/Form";

import phy from "../assets/a.jpg";
// import chem from "../assets/home.jpg";
// import mathImg from "../assets/a1.jpg";
// import bio from "../assets/career.jpg"; // ✅ fixed filename here

const dataMap = {
  physics,
  chemistry,
  math,
  biology,
};

// const imageMap = {
//   physics: phy,
//   chemistry: chem,
//   math: mathImg,
//   biology: bio,
// };

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

const capitalize = (word) =>
  word ? word.replace(/\b\w/g, (char) => char.toUpperCase()) : "";

const ContentLayout = () => {
  const { subject } = useParams();
  const rawData = dataMap[subject]?.[0];
  // const image = imageMap[subject];

  if (!rawData) {
    return (
      <div className="text-center text-red-500 mt-10">Subject not found</div>
    );
  }

  const selectedData = [
    {
      title: rawData.mainTitle,
      subtitle: "Welcome Message",
      description: [rawData.welcomeMessage],
    },
    {
      title: "Why Choose Us",
      description: rawData.whyChooseUs,
    },
    {
      title: `Board Wise ${capitalize(subject)} Tutoring`,
      description: [
        `CBSE: ${rawData.boardTutoring?.CBSE || ""}`,
        `IB: ${rawData.boardTutoring?.IB || ""}`,
        `IGCSE: ${rawData.boardTutoring?.IGCSE || ""}`,
        `ICSE: ${rawData.boardTutoring?.ICSE || ""}`,
        `ISE: ${rawData.boardTutoring?.ISE || ""}`,
      ],
    },
    {
      title: "Global Coverage",
      description: rawData.globalCoverage,
    },
    {
      title: "How It Works",
      description: rawData.howItWorks,
    },
    {
      title: "Testimonials",
      description: Array.isArray(rawData.testimonials)
        ? rawData.testimonials.map((item) =>
            typeof item === "string"
              ? item
              : `${item.name} (${item.location}): ${item.message}`
          )
        : ["No testimonials available."],
    },
    {
      title: "Competitive Exam Preparation",
      description: rawData.competitiveExamPreparation,
    },
    {
      title: "Benefits of Learning with Us",
      description: rawData.benefits,
    },
    {
      title: "Contact Us",
      description: [
        `Phone: ${rawData.contact?.phone || ""}`,
        `Email: ${rawData.contact?.email || ""}`,
        `Website: ${rawData.contact?.website || ""}`,
      ],
    },
    {
      title: "Closing Note",
      description: [rawData.closingLine],
    },
    {
      title: "Our Slogan",
      description: [rawData.slogan],
    },
  ];

  return (
    <div>
      {/* <Helmet>
        <title>{capitalize(subject)} Tutoring | Vikas Institute</title>
        <meta
          name="description"
          content={rawData.welcomeMessage.slice(0, 150)}
        />
      </Helmet> */}

      <div className="py-6">
        <div className="bg-[#f2f2f2] text-2xl text-blue-500 flex justify-center">
          Home / Vikas Institute
        </div>
      </div>

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
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-primary mb-2">
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
                      className="text-gray-100 text-base md:text-lg mb-2 leading-relaxed"
                    >
                      {text}
                    </p>
                  ))}
                </div>

                {/* {index === 0 && image && (
                  <div className="w-full md:w-1/3">
                    <div className="flex items-center justify-center rounded-xl overflow-hidden shadow-md">
                      <img
                        src={image}
                        alt={`${subject} tutoring`}
                        className="w-full h-auto max-w-full rounded-xl"
                      />
                    </div>
                  </div>
                )} */}
              </motion.div>
            );
          })}
        </div>
        <div className="flex justify-between flex-wrap pt-6">
          <div className="w-1/2">
            <img src={phy} alt="" />
          </div>
          <div className="w-1/2">
            <Form />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContentLayout;
