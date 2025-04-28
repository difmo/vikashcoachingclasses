import { useState } from "react";
import CustomButton from "../CustomButton";
import CustomInput from "../CustomInput";
import CustomCheckbox from "../CustomCheckbox";
import CustomHeading from "../CustomHeading";
import CustomDropdown from "../CustomDropdown";

export default function Form() {
  const [otpSent, setOtpSent] = useState(false);

  // State for Class Type selection
  const [selectedClassType, setSelectedClassType] = useState("");

  // State for Level selection
  const [selectedLevel, setSelectedLevel] = useState("");

  const handleClassTypeSelect = (classType) => {
    setSelectedClassType(classType); // Update the selected class type
  };

  const handleLevelSelect = (level) => {
    setSelectedLevel(level); // Update the selected level
  };

  return (
    <div className="">
      <div className="w-full px-4 sm:px-6 md:px-4 pb-3 border-2 border-white rounded-lg ">
        <div className="text-2xl sm:text-3xl font-bold text-left md:py-2 xl:py-2">
          <CustomHeading text1="Kindly, Fill  the Form :" />
        </div>

        {/* Name */}
        <div className="pb-4">
          <CustomInput placeholder="Enter Your Name :" />
        </div>

        {/* Email / Contact */}
        <div className="pb-4">
          <CustomInput placeholder="Enter Phone Number :" />
        </div>

        {/* Class Type Dropdown */}
        <CustomDropdown
          className="text-black"
          selectOption={["7th", "8th", "9th", "10th", "12th", "Dropper"]}
          selectedValue={selectedClassType} // Class Type selected value
          onSelect={handleClassTypeSelect} // Class Type select handler
        />

        {/* Subject */}
        <div className="pb-4">
          <label className="block font-semibold mb-2 text-sm sm:text-base">
            Select Subjects:
          </label>
          <div className="flex flex-wrap gap-4">
            {["Sci.", "Physics", "Chemistry", "Maths", "Biology"].map(
              (subject) => (
                <label key={subject} className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name="subject"
                    value={subject}
                    className="text-primary"
                  />
                  <span className="text-sm sm:text-base">{subject}</span>
                </label>
              )
            )}
          </div>
        </div>

        {/* Level Dropdown */}
        <CustomDropdown
          className="text-black"
          selectOption={[
            "School Level",
            "NEET",
            "IIT-JEE",
            "Board + NEET",
            "Board + IIT-JEE",
          ]}
          selectedValue={selectedLevel} // Level selected value
          onSelect={handleLevelSelect} // Level select handler
        />

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
