import { motion, useInView } from "framer-motion";
import React, { useRef } from "react";
import CustomButton from "../../components/CustomButton";
import { Link } from "react-router-dom";
import CustomHeading from "../../components/CustomHeading";

// ✅ Static Data
const data = {
  heading: "Start Learning with Our Online Classes",
  introText:
    "Explore our comprehensive classes tailored to CBSE, ICSE, and State Boards. Learn from expert tutors with live sessions and recorded content.",
  video: {
    url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    title: "Introduction to Online Classes",
  },
  classInfo: {
    className: "Class 10 - Science & Math",
    subjects: ["Physics", "Chemistry", "Biology", "Mathematics"],
    features: [
      "Live interactive sessions with subject experts",
      "Doubt clearing sessions and daily practice problems",
      "Access to recorded videos and downloadable notes",
      "Mock tests based on board patterns",
      "Affordable pricing with flexible payment",
    ],
  },
  buttons: {
    contact: {
      label: "Contact Us",
      link: "/contact",
    },
    payment: {
      label: "Pay Now",
      link: "https://paymentgateway.com/pay-link",
    },
  },
};

const OnlineClasses = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <div ref={ref} className="bg-white  text-gray-800 m-8">
      {/* Heading */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="text-center container mx-auto mb-10"
      >
        {" "}
        <div className="text-center mb-10">
          <CustomHeading
            text1={"Start Learning with"}
            text2={" Our Online Classes"}
          />
        </div>
        <p className="mt-2 px-2 text-xl text-left">{data.introText}</p>
      </motion.div>

      {/* Video + Class Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-12 items-start px-4 sm:px-6 lg:px-8 gradient-border">
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="aspect-video  rounded-md overflow-hidden"
        >
          <iframe
            className="w-full h-full"
            src={data.video.url}
            title={data.video.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          ></iframe>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 60 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="bg-secondary/5 px-6 py-10 sm:px-8 sm:py-12 rounded-md shadow-md"
        >
          <h2 className="text-xl sm:text-2xl font-semibold mb-4">
            {data.classInfo.className}
          </h2>
          <div className="flex flex-wrap gap-2 mb-4">
            {data.classInfo.subjects.map((subject, idx) => (
              <span
                key={idx}
                className="bg-secondary/20 px-3 py-1 rounded-full text-sm"
              >
                {subject}
              </span>
            ))}
          </div>
          <ul className="text-sm text-gray-700 list-disc pl-5 space-y-2 mb-6">
            {data.classInfo.features.map((feature, i) => (
              <li key={i}>{feature}</li>
            ))}
          </ul>
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-10 items-start sm:items-center">
            <Link to={data.buttons.contact.link} className="w-full sm:w-auto">
              <CustomButton
                label={data.buttons.contact.label}
                className="w-full "
              />
            </Link>
            {/* <a
              href={data.buttons.payment.link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 text-base font-medium rounded-lg px-6 py-3 text-center w-full sm:w-auto"
            >
              {data.buttons.payment.label}
            </a> */}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default OnlineClasses;
