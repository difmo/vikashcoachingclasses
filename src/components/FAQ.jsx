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
    question: "What is Vikash Classes?",
    answer:
      "Vikash Classes is an educational institute providing coaching for competitive exams like JEE and NEET, with both online and offline options.",
  },
  {
    question: "Are the courses at Vikash Classes available online?",
    answer:
      "Yes, Vikash Classes offers both online and offline classes, so students can choose based on their convenience.",
  },
  {
    question: "How can I enroll in a course at Vikash Classes?",
    answer:
      "You can enroll by visiting the Vikash Classes website, filling out the registration form, or directly contacting the support team for further assistance.",
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
          <span className="text-gradient-primary"> - Vikash Classes</span>
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
