import React, { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

// Animation Variants
const fadeInLeft = {
  hidden: { opacity: 0, x: -50 },
  visible: (i) => ({
    opacity: 1,
    x: 0,
    transition: {
      delay: i * 0.15,
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
      delay: i * 0.15,
      duration: 0.6,
      ease: "easeOut",
    },
  }),
};

const faqs = [
  {
    question: "Is Trial Class Free or Paid?",
    answer:
      "Trial Class can be a free or paid depending on tutor. In most cases, Trial Class is free of cost However in some cases experienced tutor might demand paid Trial Class.",
  },
  {
    question: "What is the cost of hiring a home tutor / online tutor?",
    answer:
      "The tutor fees depend upon various factors such as your location, the tutor's experience, the specific exam (Neet/IIT JEE etc.), the duration of the sessions, and number of subjects. All the tutors listed on our website set their own fees. Just contact us here or call us to know the fees of hiring a home tutor.",
  },
  {
    question: "Will I have to pay in advance or Can I pay Session Wise?",
    answer:
      "Its depends upon the mutual Interest. In monthly charge, payment is usually done in advance (Recommended payment on our website) and in session wise class payment is usually done session wise.",
  },
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="">
      <div ref={ref} className="px-4 py-16 mx-auto sm:px-6 container">
        <h2 className="mb-10 text-4xl font-bold text-center text-secondaryblue text-black">
          Frequently Asked Questions{" "}
          <span className="text-gradient-primary"></span>
        </h2>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              custom={index}
              variants={index % 2 === 0 ? fadeInLeft : fadeInRight}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              className="overflow-hidden bg-white border-2 border-gray-200 rounded-lg shadow-lg"
            >
              <div
                className="flex items-center justify-between px-5 py-4 transition duration-300 cursor-pointer hover:bg-gray-100"
                onClick={() => toggleFAQ(index)}
              >
                <h3 className="text-md font-semibold text-gray-800">
                  {faq.question}
                </h3>
                <span className="text-3xl font-bold text-gradient-primary">
                  {openIndex === index ? "-" : "+"}
                </span>
              </div>
              {openIndex === index && (
                <div className="p-5 text-gray-700 bg-gray-50">
                  <p>{faq.answer}</p>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FAQ;
