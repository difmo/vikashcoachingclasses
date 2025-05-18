import img from "../assets/tutorcat/sciencetutor.jpeg";

const   CategoryContent = () => {
  return (
    <div >
        <h2 className="text-3xl mb-8"> Online Science Tutoring :</h2>
    <div className="md:flex md:flex-row flex flex-col gap-12 ">

      <div className="w-1/2 alingn-center">
        <p className="text-2xl  ">
          Personalized Learning for Academic Excellence
          In today’s competitive academic world, mastering science is essential
          for every students from middle school to high school and beyond.
          Science isn’t just about reading textbooks; it’s about understanding
          the world around us. Whether it's Physics, Chemistry, Biology, or
          Maths, these subjects form the foundation of higher education and
          professional success in fields like engineering, medicine, research,
          data science, and technology. Online science tutoring has emerged as a
          powerful solution for students who want personalized, flexible, and
          effective support in these core subjects. At Vikas Institute, we offer
          1-to-1 live tutoring in Physics, Chemistry, Biology, and Maths,
          tailored to the unique needs of each learner.
        </p>
      </div>
      <div className="w-1/2">
        <img className="rounded-xl" src={img} />
      </div>
        </div>
    </div>
  );
};

export default CategoryContent;
