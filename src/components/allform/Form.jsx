import { useState } from "react";
import CustomButton from "../CustomButton";
import CustomInput from "../CustomInput";
import CustomCheckbox from "../CustomCheckbox";
import CustomHeading from "../CustomHeading";

export default function Form() {
  const [otpSent, setOtpSent] = useState(false);

  return (
    <div className="">
      <div className="w-full px-4 sm:px-6 md:px-8 pb-6 border-2 border-white rounded-lg ">
        <div className="text-2xl sm:text-3xl font-bold text-center  xl:py-2">
          <CustomHeading text1="Fill the form to hire a tutor" />
        </div>

        {/* Name */}
        <div className="mb-4">
          <CustomInput placeholder="Enter Your Name :" />
        </div>

        {/* Email / Contact */}
        <div className="mb-4">
          <CustomInput placeholder="Enter Phone Number :" />
        </div>

        {/* Class Type */}
        <div className="mb-6">
          <select
            name="classType"
            className="w-full p-3 border border-gray-300 rounded-md bg-white text-black "
          >
            {[
              "Select Class",
              "7th",
              "8th",
              "9th",
              "10th",
              "12th",
              "IB",
              "IGCSE",
              "ICSE",
              "Dropper",
            ].map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>

        {/* Subject */}
        <div className="mb-6">
          <label className="block font-semibold mb-2 text-sm sm:text-base">
            Select Subject:
          </label>
          <div className="flex flex-wrap gap-4">
            {["Physics", "Chemistry", "Maths", "Biology"].map((subject) => (
              <label key={subject} className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="subject"
                  value={subject}
                  className="text-primary"
                />
                <span className="text-sm sm:text-base">{subject}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Level */}
        <div className="mb-6">
          <label className="block font-semibold mb-2 text-sm sm:text-base">
            Select Level:
          </label>
          <div className="flex flex-wrap gap-4">
            {[
              "Board",
              "NEET",
              "IIT-JEE",
              "Board + NEET",
              "Board + IIT-JEE",
            ].map((level) => (
              <label key={level} className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="level"
                  value={level}
                  className="text-blue-600"
                />
                <span className="text-sm sm:text-base">{level}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Get OTP */}
        <div className="text-center pt-4">
          <CustomButton
            onClick={() => setOtpSent(true)}
            className="bg-secondary px-6 py-3 rounded-lg hover:bg-primary transition text-white text-sm sm:text-base"
            label="Get OTP"
          />
        </div>
      </div>
    </div>
  );
}
