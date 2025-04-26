import { useState } from "react";
import CustomButton from "../CustomButton";
import CustomInput from "../CustomInput";
import CustomCheckbox from "../CustomCheckbox";
import CustomHeading from "../CustomHeading";

export default function Form() {
  const [otpSent, setOtpSent] = useState(false);

  return (
    <div className="pt-12">
      <div className="w-full px-6   pb-4 border-2 ">
        <CustomHeading className="text-3xl font-bold text-center text-primary">
          Fill the form to hire a tutor
        </CustomHeading>

        {/* Name */}
        <CustomInput placeholder="Enter Your Name :" />

        {/* Email / Contact */}
        <CustomInput
          //   label="Email / Contact No."
          placeholder="Enter Phone Number :"
        />

        {/* Class Type */}
        <div className="mb-6">
          <label className="block font-semibold mb-2">Select Class:</label>
          <select
            name="classType"
            className="w-full p-2 border border-gray-300 rounded-md text-black"
          >
            {["Board", "IB", "IGCSE", "ICSE", "Dropper"].map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-6">
          <label className="block font-semibold mb-2">Select Subject:</label>
          <select
            name="subject"
            className="w-full p-2 border border-gray-300 rounded-md text-black"
          >
            {["Physics", "Chemistry", "Maths", "Biology"].map((subject) => (
              <option key={subject} value={subject}>
                {subject}
              </option>
            ))}
          </select>
        </div>

        {/* Level */}
        <div>
          <label className="block font-semibold mb-2">Select Level:</label>
          <select className="w-full p-3 border border-gray-300 rounded-md">
            <option>Board</option>
            <option>NEET</option>
            <option>IIT-JEE</option>
            <option>Board + NEET</option>
            <option>Board + IIT-JEE</option>
          </select>
        </div>

        {/* Get OTP */}
        <div className="text-center pt-4">
          <CustomButton
            onClick={() => setOtpSent(true)}
            className="bg-secondary text-white px-6 py-3 rounded-lg hover:bg-primary transition"
            label="Get OTP"
          />
        </div>
      </div>
    </div>
  );
}
