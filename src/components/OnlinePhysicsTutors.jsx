import React from "react";
const physics = [
  {
    mainHeadding: "Online Physics Tutors",
    mainTitle:
      "Online Physics Tutoring for Class 11th, 12th, CBSE, IB, IGCSE, ICSE, ISE Boards Students",
    welcomeMessage:
      "Welcome to Online Personal Physics Tutor @ Vikas Institute, your ultimate destination for top-quality online Physics tutoring. We specialize in Physics education for students following the CBSE, IB, IGCSE, ICSE, and ISE curricula across the UAE, Qatar, USA, UK, Canada, Australia, and India. With our team of highly skilled Physics tutors, customized learning plans, and student-focused online classes, we help students build confidence and excel in one of the most crucial academic subjects.",
    whyChooseUs: [
      "Qualified and Passionate Tutors: Our Physics tutors are highly qualified professionals with extensive teaching experience in various international and Indian boards. They bring energy and clarity to every lesson, making even the toughest physics problems easier to solve.",
      "Personalized Lesson Plans: Each student has a unique learning style. Our tutors assess the individual needs and tailor the lesson plans accordingly.",
      "Interactive One-on-One Sessions: Our online Physics tutoring is conducted through interactive, one-on-one classes that provide personalized attention and create a distraction-free environment for optimal learning.",
      "Flexible Scheduling Across Time Zones: We accommodate schedules from different time zones including Dubai, Doha, New York, London, Toronto, Sydney, and Mumbai to ensure maximum convenience for parents and students.",
      "Performance-Oriented Approach: Our focus is on improving academic performance. Regular assessments, instant feedback, error analysis, and exam-specific strategies help students achieve higher grades.",
      "Affordable and Transparent Pricing: We offer premium Physics tutoring services at affordable rates with no hidden costs.",
      "Safe and Secure Online Learning Platform: We use secure platforms like Zoom and Google Meet for classes, supported by digital whiteboards and real-time collaboration tools.",
    ],
    boardTutoring: {
      CBSE: "We follow the NCERT syllabus and help students from Classes 6 to 12 with topics like Mechanics, Thermodynamics, Waves, and Optics.",
      IB: "We assist IB students with SL and HL Physics, covering topics like Forces, Energy, and Quantum Theory.",
      IGCSE:
        "Our tutors help IGCSE students understand key areas like Forces, Energy, and Motion.",
      ICSE: "We provide detailed tutoring in Mechanics, Optics, and Thermodynamics for ICSE students.",
      ISE: "Our ISE tutoring includes advanced topics such as Fluid Mechanics and Nuclear Physics.",
    },
    globalCoverage: [
      "UAE (United Arab Emirates): Dubai, Abu Dhabi, Sharjah, Al Ain",
      "Qatar: Doha, Al Wakrah, Al Rayyan",
      "USA: New York, Texas, California, Florida, Illinois",
      "UK: London, Birmingham, Leeds, Manchester",
      "Canada: Toronto, Vancouver, Ottawa, Calgary",
      "Australia: Sydney, Melbourne, Perth, Brisbane",
      "India: Delhi, Mumbai, Hyderabad, Chennai, Bangalore, Pune, and more",
    ],
    howItWorks: [
      "Step 1: Free Initial Assessment",
      "Step 2: Tutor Matching",
      "Step 3: Personalized Online Classes",
      "Step 4: Regular Assignments & Feedback",
      "Step 5: Exam Preparation",
    ],
    testimonials: [
      {
        name: "Mrs. Iqbal",
        location: "Dubai",
        message:
          "Vikas Institute helped my son transition smoothly from ICSE to IGCSE Physics. The tutor was extremely knowledgeable and patient.",
      },
      {
        name: "Mr. Henry",
        location: "London",
        message:
          "The IB Physics support my daughter received was incredible. She scored a 7 in her finals!",
      },
      {
        name: "Mrs. Desai",
        location: "New York",
        message:
          "Highly recommended! Vikas Institute made the tutoring process stress-free and my son showed great improvement.",
      },
    ],
    competitiveExamPreparation: [
      "JEE Mains and Advanced",
      "NEET Physics",
      "SAT Physics",
      "AP Physics",
      "Physics Olympiads",
    ],
    benefits: [
      "Experienced and board-certified Physics tutors",
      "Flexible timings and rescheduling options",
      "One-on-one learning in a distraction-free environment",
      "Regular updates for parents and guardians",
      "Emphasis on core concepts and exam strategies",
      "Affordable rates and customized learning plans",
      "Safe, secure, and engaging learning experience",
    ],
    contact: {
      phone: "+91 8427373281",
      email: "info@vikasinstitute.in",
      website: "www.vikasinstitute.in",
    },
    closingLine:
      "Help your child fall in love with Physics and achieve academic success.",
    slogan: "VIKAS INSTITUTE — Unlocking Physics Brilliance Across the Globe",
  },
];
const OnlinePhysicsTutors = () => {
  return (
    <div>
      {/* <Helmet>
      <title>{capitalize(subject)} Tutoring | Vikas Institute</title>
      <meta
        name="description"
        content={rawData.welcomeMessage.slice(0, 150)}
      />
    </Helmet> */}

      <div className="">
        <div className="bg-[#f2f2f2] text-2xl text-blue-500 flex justify-center">
          <div className="text-headerbordertext font-bold text-2xl flex justify-center">
            Home / {rawData.mainHeadding}
          </div>
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
        <div className="flex flex-col md:flex-row justify-between flex-wrap pt-6">
          <div className="w-full md:w-1/2">
            <img src={phy} alt="" className="w-full h-80 md:h-[400px]" />
          </div>
          <div className="w-full md:w-1/2 mt-6 md:mt-0">
            <Form />
          </div>
        </div>
      </div>
    </div>
  );
};

export default OnlinePhysicsTutors;
