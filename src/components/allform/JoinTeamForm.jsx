import React, { useState } from "react";
import CustomButton from "../CustomButton";
import CustomInput from "../CustomInput";
import CustomCheckbox from "../CustomCheckbox";
import img from "../../assets/logo1.jpeg";
const boards = ["CBSE", "ICSE", "ISC", "IB", "IGCSE", "State"];
const subjects = ["Phy", "Chem", "Bio", "Maths"];
const exams = ["NEET", "IIT-JEE"];
const radio = ["Teacher", "Students / Parents", "Other"];
const JoinTeamForm = () => {
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    class: "",
    subjects: [],
    radio: [],
    boards: [],
    exams: [],
    experience: "",
    contact: "",
    otp: "",
    resume: null,
  });

  const toggleSelection = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: prev[field].includes(value)
        ? prev[field].filter((v) => v !== value)
        : [...prev[field], value],
    }));
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, resume: e.target.files[0] });
  };

  const sendOtp = () => {
    setOtpSent(true);
    alert("OTP sent to " + formData.contact);
  };

  const verifyOtp = () => {
    if (formData.otp === "1234") {
      setOtpVerified(true);
      alert("OTP verified");
    } else {
      alert("Incorrect OTP");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!otpVerified) return alert("Please verify OTP before submitting");
    console.log(formData);
    alert("Form submitted successfully");
  };

  return (
    <div>
      <div className="">
        <div className=" bg-[#f2f2f2] text-2xl  text-headerbordertext font-bold flex justify-center">
          Home / Contact Us
        </div>
      </div>

      <div className="container mx-auto py-10 px-4">
        <div className="max-w-7xl mx-auto space-y-10">
          {/* Form and Info Section */}
          <p className="flex justify-center text-5xl text-headerbordertext font-bold">
            Contact Us . . .
          </p>
          <div className="overflow-hidden">
            <div className="flex flex-col lg:flex-row gap- mb-10 border-2 rounded-2xl">
              {/* Left Section */}
              <div className=" lg:flex flex-col relative text-xl justify-center items-center rounded-l-2xl bg-primary text-headerbordertext  lg:w-1/2 py-6">
                <h1 className="text-3xl absolute flex justify-center font-bold top-8 ">
                  Vikas Institute
                </h1>
                <p>Malviya Nagar, New Delhi - 110017</p>
                <p>
                  Contact Numbers:{" "}
                  <a href="tel:+918427373281" className=" hover:underline">
                    +91 8427373281
                  </a>
                </p>
                <p>
                  Email:{" "}
                  <a
                    href="mailto:info@vikasinstitute.in"
                    className="hover:underline"
                  >
                    info@vikasinstitute.in
                  </a>
                </p>

                <p>
                  Website:{" "}
                  <a
                    href="https://www.vikasinstitute.in/"
                    className="hover:underline "
                  >
                    www.vikasinstitute.in
                  </a>
                </p>
                <p>
                  WhatsApp:{" "}
                  <a
                    href="https://wa.me/919582699555"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline"
                  >
                    919582699555
                  </a>
                </p>

                <img
                  src={img}
                  alt="VIP Tutors Logo"
                  className="mx-auto mt-6 px-6"
                />
                <p className="pt-10 px-6 font-extralight  uppercase">
                  A Most Trusted Website to Hire, Best Online Private Tutors for
                  the Students of USA - CANADA - UK - QATAR - UAE - AUSTRALIA -
                  INDIA .
                </p>
              </div>

              {/* Right Section (Form) */}
              <div className="w-full lg:w-1/2 p-8 bg-white rounded-e-2xl">
                <h2 className="text-3xl font-bold text-center text-yellow-500 mb-6">
                  Kindly, Fill the Form to get in Touch :
                </h2>

                <form
                  onSubmit={handleSubmit}
                  className="space-y-5 max-w-xl mx-auto"
                >
                  {/* Name */}
                  <CustomInput
                    type="text"
                    placeholder="Name"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    required
                  />
                  <CustomInput
                    type="text"
                    placeholder="Contact No."
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    required
                  />
                  <CustomInput
                    type="email"
                    placeholder="Email"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    required
                  />
                  <div>
                    <div className="flex flex-wrap gap-16 px-1">
                      <label className="block font-semibold mb-2 text-gray-700">
                        {" "}
                        Are You :
                      </label>
                      {radio.map((sub) => (
                        <label
                          key={sub}
                          className="flex items-center gap-2 text-sm"
                        >
                          <CustomCheckbox
                            checked={formData.radio.includes(sub)}
                            onChange={() => toggleSelection("radio", sub)}
                          />
                          {sub}
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Class */}
                  <CustomInput
                    type="text"
                    placeholder="Class (e.g. 7 to Dropper)"
                    value={formData.class}
                    onChange={(e) =>
                      setFormData({ ...formData, class: e.target.value })
                    }
                    required
                  />

                  {/* Subjects */}
                  <div>
                    <div className="flex flex-wrap gap-3 px-1">
                      <label className="block font-semibold mb-2 text-gray-700">
                        Subjects
                      </label>
                      {subjects.map((sub) => (
                        <label
                          key={sub}
                          className="flex items-center gap-2 text-sm"
                        >
                          <CustomCheckbox
                            checked={formData.subjects.includes(sub)}
                            onChange={() => toggleSelection("subjects", sub)}
                          />
                          {sub}
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Boards */}
                  <div>
                    <div className="flex flex-wrap gap-3 px-1">
                      <label className="block font-semibold mb-2 text-gray-700">
                        Boards
                      </label>
                      {boards.map((board) => (
                        <label
                          key={board}
                          className="flex items-center gap-2 text-sm"
                        >
                          <CustomCheckbox
                            checked={formData.boards.includes(board)}
                            onChange={() => toggleSelection("boards", board)}
                          />
                          {board}
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Experience */}
                  <CustomInput
                    type="text"
                    placeholder="Experience (in years)"
                    value={formData.experience}
                    onChange={(e) =>
                      setFormData({ ...formData, experience: e.target.value })
                    }
                  />

                  {/* Contact Number */}
                  <CustomInput
                    type="tel"
                    placeholder="Contact Number"
                    value={formData.contact}
                    onChange={(e) =>
                      setFormData({ ...formData, contact: e.target.value })
                    }
                    required
                  />

                  {/* OTP Section */}
                  <div className="flex flex-col sm:flex-row items-center gap-3">
                    <CustomButton
                      type="button"
                      label="Send OTP"
                      onClick={sendOtp}
                      className="px-4 py-2 rounded-lg bg-yellow-400 hover:bg-yellow-500"
                    />

                    <CustomInput
                      type="text"
                      placeholder="Enter OTP"
                      value={formData.otp}
                      onChange={(e) =>
                        setFormData({ ...formData, otp: e.target.value })
                      }
                      className="sm:w-32 w-full"
                    />

                    <CustomButton
                      type="button"
                      label="Verify"
                      onClick={verifyOtp}
                      className="px-4 py-2  bg-yellow-400 rounded-lg hover:bg-green-600"
                    />
                  </div>

                  {/* File Upload */}

                  {/* Submit */}
                  <CustomButton
                    type="submit"
                    label="Submit"
                    className="w-full bg-yellow-400 hover:bg-yellow-500 py-2 rounded-lg font-semibold text-white"
                  />
                </form>
              </div>
            </div>
          </div>

          {/* Contact Table */}
          {/* <div className="overflow-x-auto rounded-xl shadow-md bg-white">
            <table className="min-w-full text-left">
              <thead className="bg-blue-900 text-white">
                <tr>
                  <th className="p-3">Sr.No.</th>
                  <th className="p-3">State or City Name</th>
                  <th className="p-3">Contact Number</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { no: 1, city: "VIP Headquarter", phone: "8427373281" },
                  { no: 2, city: "New Delhi", phone: "8750919571" },
                  { no: 3, city: "New Delhi", phone: "8375094571" },
                  { no: 4, city: "Maharashtra", phone: "8587037571" },
                  { no: 5, city: "Maharashtra", phone: "8527110571" },
                ].map((item) => (
                  <tr key={item.no} className="border-t">
                    <td className="p-3">{item.no}</td>
                    <td className="p-3">{item.city}</td>
                    <td className="p-3 text-blue-600 hover:underline">
                      <a href={`tel:${item.phone}`}>{item.phone}</a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default JoinTeamForm;
// import React, { useState } from "react";
// import CustomButton from "../CustomButton";
// import CustomInput from "../CustomInput";
// import CustomCheckbox from "../CustomCheckbox";

// const boards = ["CBSE", "ICSE", "ISC", "IB", "IGCSE", "State"];
// const subjects = ["Phy", "Chem", "Bio", "Maths"];
// const exams = ["NEET", "IIT-JEE"];

// const JoinTeamForm = () => {
//   const [otpSent, setOtpSent] = useState(false);
//   const [otpVerified, setOtpVerified] = useState(false);
//   const [formData, setFormData] = useState({
//     name: "",
//     class: "",
//     subjects: [],
//     boards: [],
//     exams: [],
//     experience: "",
//     contact: "",
//     otp: "",
//     resume: null,
//   });

//   const toggleSelection = (field, value) => {
//     setFormData((prev) => ({
//       ...prev,
//       [field]: prev[field].includes(value)
//         ? prev[field].filter((v) => v !== value)
//         : [...prev[field], value],
//     }));
//   };

//   const handleFileChange = (e) => {
//     setFormData({ ...formData, resume: e.target.files[0] });
//   };

//   const sendOtp = () => {
//     setOtpSent(true);
//     alert("OTP sent to " + formData.contact);
//   };

//   const verifyOtp = () => {
//     if (formData.otp === "1234") {
//       setOtpVerified(true);
//       alert("OTP verified");
//     } else {
//       alert("Incorrect OTP");
//     }
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (!otpVerified) return alert("Please verify OTP before submitting");
//     console.log(formData);
//     alert("Form submitted successfully");
//   };

//   return (
//     <div>
//       <div className="container mx-auto">
//         <div className="flex flex-wrap min-h-screen p-6  items-center">
//           {/* Contact Info */}
// <div className=" w-full md:w-1/2 text-center mb-8">
//   <h1 className="text-3xl font-bold mb-4">VIP Home Tutors.</h1>
//   <p>Gupta Colony, Malviya Nagar, New Delhi - 110017</p>
//   <p>Phone Numbers: +91 84273 73281, +91 8289052751</p>
//   <p>+91 8750919571, +91 8375094571</p>
//   <p>Email: info@viptutors.in</p>
//   <p>
//     Website:{" "}
//     <a
//       href="https://www.viptutors.in"
//       className="text-blue-700 underline"
//     >
//       https://www.viptutors.in
//     </a>
//   </p>
//   <img
//     src="/vip-tutors-logo.png"
//     alt="VIP Tutors Logo"
//     className="mx-auto mt-4"
//   />
// </div>

//           {/* Main Section */}
//           <div className="flex flex-col lg:flex-row gap-10 w-full md:w-1/2">
//             {/* Contact Form */}
//             <div className="bg-white p-6 rounded-xl shadow-lg flex-1">
//               <div className="bg- text-white p-4 rounded-md mb-4 text-center font-semibold">
//                 Please fill the form below
//               </div>
//               <form className="flex flex-col gap-4">
//                 <input
//                   type="text"
//                   placeholder="Name"
//                   className="border p-3 rounded-md"
//                 />
//                 <input
//                   type="text"
//                   placeholder="Contact Number"
//                   className="border p-3 rounded-md"
//                 />
//                 <input
//                   type="email"
//                   placeholder="Email Address"
//                   className="border p-3 rounded-md"
//                 />
//                 <textarea
//                   placeholder="Inquiry/Message"
//                   rows="4"
//                   className="border p-3 rounded-md"
//                 ></textarea>
//                 <button
//                   type="submit"
//                   className="bg-green-600 text-white py-2 rounded-md hover:bg-green-700"
//                 >
//                   Submit
//                 </button>
//               </form>
//             </div>
//           </div>
//         </div>
// <div className="flex-1 overflow-x-auto">
//   <table className="min-w-full bg-white rounded-xl overflow-hidden shadow-lg">
//     <thead className="bg-blue-900 text-white">
//       <tr>
//         <th className="p-3 text-left">Sr.No.</th>
//         <th className="p-3 text-left">State or City Name</th>
//         <th className="p-3 text-left">Contact Number</th>
//       </tr>
//     </thead>
//     <tbody>
//       {[
//         { no: 1, city: "VIP Headquarter", phone: "9988752471" },
//         { no: 2, city: "New Delhi", phone: "8750919571" },
//         { no: 3, city: "New Delhi", phone: "8375094571" },
//         { no: 4, city: "MAHARASTRA", phone: "8587037571" },
//         { no: 5, city: "MAHARASTRA", phone: "8527110571" },
//       ].map((item) => (
//         <tr key={item.no} className="border-t">
//           <td className="p-3">{item.no}</td>
//           <td className="p-3">{item.city}</td>
//           <td className="p-3 text-blue-600 hover:underline cursor-pointer">
//             <a href={`tel:${item.phone}`}>{item.phone}</a>
//           </td>
//         </tr>
//       ))}
//     </tbody>
//   </table>
// </div>
//       </div>
//     </div>
//   );
// };

// export default JoinTeamForm;
