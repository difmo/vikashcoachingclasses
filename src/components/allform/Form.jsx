import { useState } from "react";
import CustomButton from "../CustomButton";
import CustomInput from "../CustomInput";
import CustomCheckbox from "../CustomCheckbox";
import CustomHeading from "../CustomHeading";

export default function Form() {
  const [otpSent, setOtpSent] = useState(false);

  return (
    <div className="">
      <div className="w-full px-4 sm:px-6 md:px-4 pb-3 border-2 border-white rounded-lg ">
        <div className="text-2xl sm:text-3xl font-bold text-center  md:py-2 xl:py-9">
          <CustomHeading text1="Hire a Online Private Tutor:" />
        </div>

        {/* Name */}
        <div className="pb-4">
          <CustomInput placeholder="Enter Your Name :" />
        </div>

        {/* Email / Contact */}
        <div className="pb-4">
          <CustomInput placeholder="Enter Phone Number :" />
        </div>

        {/* Class Type */}
        <div className="pb-4">
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
              "Dropper",
            ].map((type) => (
              <option key={type} value={type} className="px-4">
                {type}
              </option>
            ))}
          </select>
        </div>

        {/* Subject */}
        <div className="pb-4">
          <label className="block font-semibold mb-2 text-sm sm:text-base">
            Select Subjects:
          </label>
          <div className="flex flex-wrap gap-4">
            {[
              "Sci.",
              "Physics",
              "Chemistry",
              "Maths",
              "Biology",

              // "Robitics & AI",
            ].map((subject) => (
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
        <div className="pb-4">
          <label className="block font-semibold mb-2 text-sm sm:text-base">
            Select Level:
          </label>
          <div className="w-full">
            <select
              name="level"
              className="w-full p-2 bg-white border px-2 border-gray-300 rounded-md text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {[
                "School Level",
                "NEET",
                "IIT-JEE",
                "Board + NEET",
                "Board + IIT-JEE",
              ].map((level) => (
                <option key={level} value={level}>
                  {level}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Get OTP */}
        <div className="text-center py-2">
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
