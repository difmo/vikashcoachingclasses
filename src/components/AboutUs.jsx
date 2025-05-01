import React, { useEffect } from "react";
import md from "../assets/md.jpeg";
import md1 from "../assets/md1.jpeg";
import AOS from "aos";
import "aos/dist/aos.css";

const AboutUs = () => {
  const topFeatures = [
    { icon: "👨‍🏫", title: " QUALIFIED FACULTY" },
    { icon: "📚", title: "STUDY MATERIAL" },

    { icon: "📋", title: "DOUBT SESSION" },

    { icon: "🕒", title: "PERIODIC TEST" },
    { icon: "📈", title: "RESULT" },
  ];

  const courses = [
    "VII",
    "VIII",
    "IX",
    "X",
    "XI",
    "XII",

    "BOARDS",
    "CUET",
    "NEET",
    "IIT-JEE",
  ];

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  return (
    <>
      <div className="">
        <div className=" bg-[#f2f2f2] text-2xl font-bold text-headerbordertext flex justify-center">
          Home / About Us
        </div>
      </div>
      <div className="w-full max-w-7xl mx-auto px-4 py-8">
        {/* Top Section */}

        <div
          className="flex flex-col md:flex-row justify-between gap-6"
          data-aos="fade-up"
        >
          <div className="md:w-1/2 px-12">
            <h1 className="text-3xl  font-bold mb-4 text-primary">
              About Vikas Sir,
            </h1>
            <p className="text-xl  text-primary text-justify">
              Vikas Sir is a Gold Medalist in IIT Delhi, M.Tech Programs for
              their outstanding academic performance and having more than 11
              years of experience. He has become a synonym for training Physics
              toppers among the top Schools in Delhi and some National
              Institutes. Throughout the years with continued success in
              teaching, guidance & Motivation he made more than 1000's of
              IITIANS ,NITIANS & Doctors till yet. More than 90% of his students
              had scored more than 90% Marks in PHYSICS in Boards, NEET &
              IIT-JEE continuously under his guidance, since many past years.
              <br />
              <br />
              <span className="py-6">
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Vikas
                Sir and his Team also likes to teach students online, across the
                Globe. So if you want to Score Good grades in competitive exams
                like NEET or IIT-JEE along with Boards then connect us for a
                guaranteed result & Get One to One Online PHYSICS, CHEMISTRY,
                MATHS & BIOLOGY classes with Vikas Instutite Teachers team and make your
                Concepts sharp & fair by clearing yours doubts.
              </span>
            </p>
            <p className="text-2xl text-primary">Thanks.</p>
          </div>
          <div className="md:w-1/2 flex justify-center" data-aos="zoom-in">
            <img
              src={md}
              alt="Vikas Sir"
              className="h-96 md:h-[500px] w-full  object-contain rounded-lg pt-1.5 "
            />
          </div>
        </div>

        {/* Banner Section */}
        <div className="my-10 flex justify-center" data-aos="fade-up">
          <img
            src={md1}
            alt="Banner"
            className="w-full rounded-lg object-cover"
          />
        </div>

        {/* Why Choose Us */}
        <div className="mb-8" data-aos="fade-up">
          <h2 className="text-2xl font-bold mb-4 text-center">
            Why Choose Us?
          </h2>
          <p className="text-lg mb-4 text-justify text-primary">
            Our team of Qualified, Passionate and subject experts combines
            innovative teaching methodologies with hands-on problem-solving
            techniques to ensure that each student not only grasps the concepts
            but excels in their academic pursuits. We believe in creating a
            supportive environment where students are encouraged to explore,
            question, and build a solid foundation in physics, Chemistry, Maths
            & Biology for Class 7th, 8th, 9th, 10th, 11th, 12th, BOARDS, NTSE,
            OLAMPIAD, CUET, NEET & IIT-JEE Preparation.
          </p>

          <h3 className="text-xl font-bold mb-2">Assurance:</h3>
          <p className="list-disc list-inside mb-4 text-lg text-primary">
            We evaluate tutors only on their own merits. We exclusively hire
            Full-Time Tutors and run background checks (qualification and
            experience) on all of our tutors so you can make an informed
            decision.
          </p>

          <h3 className="text-xl font-bold mb-2">Personalized Instruction:</h3>
          <p className="text-lg mb-4 text-primary">
            A tutor can personalize lessons and deliver information in a fun,
            easy-to-understand manner.
          </p>

          <h3 className="text-xl font-bold mb-2">Increased Efficiency:</h3>
          <p className="text-lg mb-4 text-primary">
            A tutor can personalize lessons and deliver information in a fun,
            easy-to-understand manner.
          </p>

          <h3 className="text-xl font-bold mb-2">
            Competitive Exams Preparation:
          </h3>
          <p className="text-lg mb-4 text-primary">
            We guides in Competitive Exams like NTSE, OLAMPIAD,CUET, NEET &
            IIT-JEE along with 9th,1Oth, 11th and 12th grade, So connect and
            join our tutors for a guaranteed results.
          </p>

          <h3 className="text-xl font-bold mb-2">Our Key Features:</h3>
        </div>

        {/* Top Features */}
        <div
          className="-left-4 text-left flex flex-wrap justify-between gap-7 mb-10"
          data-aos="fade-up"
        >
          {topFeatures.map((feature, index) => (
            <div
              key={index}
              className="flex flex-col items-center bg-[#ffe7d0] justify-center p-4 border-2 border-red-400 rounded-md hover:shadow-lg transition w-[45%] sm:w-[30%] md:w-[18%]"
            >
              <div className="text-4xl sm:text-5xl mb-2">{feature.icon}</div>
              <h3 className="text-md sm:text-lg font-semibold text-center">
                {feature.title}
              </h3>
            </div>
          ))}
        </div>

        {/* Courses Preparation */}
        <h2 className="text-center text-2xl font-bold mb-6" data-aos="fade-up">
          WE PREPARE YOU FOR:
        </h2>
        <div
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 justify-items-center"
          data-aos="fade-up"
        >
          {courses.map((course, index) => (
            <button
              key={index}
              className="bg-blue-900 text-white py-2 px-3 rounded-md hover:bg-blue-700 transition text-base sm:text-lg font-semibold w-full text-center"
            >
              {course}
            </button>
          ))}
        </div>
      </div>
    </>
  );
};

export default AboutUs;
