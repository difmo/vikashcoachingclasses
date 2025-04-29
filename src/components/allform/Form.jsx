import { useState } from "react";
import CustomButton from "../CustomButton";
import CustomInput from "../CustomInput";
import CustomDropdown from "../CustomDropdown";
import { addDoc, collection } from "firebase/firestore";
import {
  auth,
  db,
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from "../../Firebase";

export default function Form() {
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [otpVerified, setOtpVerified] = useState(false);
  const [selectedClassType, setSelectedClassType] = useState("Select Class");
  const [selectedLevel, setSelectedLevel] = useState("");
  const [experienceLevel, setExperienceLevel] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    subjects: [],
  });
  const [verificationId, setVerificationId] = useState("");

  // Handle input change for text fields
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle checkbox change for subjects
  const handleSubjectChange = (e) => {
    const { value, checked } = e.target;
    let updatedSubjects = [...formData.subjects];
    if (checked) {
      updatedSubjects.push(value);
    } else {
      updatedSubjects = updatedSubjects.filter((subj) => subj !== value);
    }
    setFormData({ ...formData, subjects: updatedSubjects });
  };

  // Handle class type dropdown selection
  const handleClassTypeSelect = (classType) => {
    setSelectedClassType(classType);
  };

  // Handle level dropdown selection
  const handleLevelSelect = (level) => {
    setSelectedLevel(level);
  };

  // Handle experience level change
  const handleExperienceChange = (e) => {
    setExperienceLevel(e.target.value);
  };

  // Function to initiate OTP sending
  const handleOTPSubmit = () => {
    if (!otpSent) {
      const recaptchaVerifier = new RecaptchaVerifier(
        "recaptcha-container",
        {
          size: "invisible",
          callback: (response) => {
            console.log("Recaptcha verified!");
          },
        },
        auth
      );

      const phoneNumber = "+" + formData.phone; // Assuming user enters the country code too

      signInWithPhoneNumber(auth, phoneNumber, RecaptchaVerifier)
        .then((confirmationResult) => {
          setVerificationId(confirmationResult.verificationId);
          setOtpSent(true);
          console.log("OTP sent to " + phoneNumber);
        })
        .catch((error) => {
          console.error("Error during OTP sending:", error);
          alert("Error sending OTP. Please try again.");
        });
    } else {
      // OTP verification logic
      const credential = firebase.auth.PhoneAuthProvider.credential(
        verificationId,
        otp
      );
      auth
        .signInWithCredential(credential)
        .then(() => {
          console.log("OTP Verified!");
          setOtpVerified(true);
        })
        .catch((error) => {
          console.error("OTP verification failed:", error);
          alert("Invalid OTP. Please try again.");
        });
    }
  };

  // Handle final form submission
  const handleFinalSubmit = async (e) => {
    e.preventDefault();

    try {
      await addDoc(collection(db, "Vikasrequests"), {
        name: formData.name,
        phone: formData.phone,
        classType: selectedClassType,
        level: selectedLevel,
        subjects: formData.subjects,
        experienceLevel,
        timestamp: new Date(),
      });
      alert("Form Submitted Successfully!");
    } catch (err) {
      alert("Failed to submit form. Try again.");
      console.error(err);
    }
  };

  return (
    <div className="relative w-full px-4 sm:px-6 md:px-4 pb-3 border-2 border-white rounded-lg">
      <div className="my-4 text-4xl tracking-tight text-[#dba577] font-extrabold">
        Kindly, Fill the Form :
      </div>
      {/* Name Input */}
      <div className="pb-4">
        <CustomInput
          placeholder="Enter Your Name :"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
        />
      </div>
      {/* Phone Input */}
      <div className="pb-4">
        <CustomInput
          placeholder="Enter Phone Number :"
          name="phone"
          value={formData.phone}
          onChange={handleInputChange}
        />
      </div>
      {/* Class Dropdown */}
      <CustomDropdown
        className="text-black"
        selectOption={["7th", "8th", "9th", "10th", "12th", "Dropper"]}
        selectedValue={selectedClassType}
        onSelect={handleClassTypeSelect}
      />
      {/* Subject Checkboxes */}
      <div className="pb-4">
        <label className="block font-semibold mb-2 text-sm sm:text-base">
          Select Subjects:
        </label>
        <div className="grid grid-cols-3 gap-2">
          {["Science", "Physics", "Chemistry", "Maths", "Biology"].map(
            (subject) => (
              <label key={subject} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  name="subjects"
                  value={subject}
                  onChange={handleSubjectChange} // Don't forget this
                />
                <span className="text-sm sm:text-base">{subject}</span>
              </label>
            )
          )}{" "}
          <span className="text-sm relative -left-5 mt-1 text-left text-[#ebe9e7]">
            (Can select multiple)
          </span>
        </div>
      </div>
      {/* Level Dropdown */}
      <CustomDropdown
        className="text-black"
        selectOption={["NEET", "IIT-JEE", "Board + NEET", "Board + IIT-JEE"]}
        selectedValue={selectedLevel}
        onSelect={handleLevelSelect}
      />
      {/* OTP Section */}
      <div id="recaptcha-container"></div> {/* Recaptcha container */}
      {!otpSent ? (
        <div className="text-center py-2">
          <CustomButton
            onClick={handleOTPSubmit}
            className="text-[#51087E] hover:bg-primary bg-[#dba577] text-xl font-bold"
            label="Get OTP"
          />
        </div>
      ) : !otpVerified ? (
        <div className="text-center py-2">
          <input
            type="text"
            placeholder="Enter OTP"
            className="border px-4 py-2 mr-2 rounded"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />
          <CustomButton
            onClick={handleOTPSubmit}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            label="Verify OTP"
          />
        </div>
      ) : null}
      {/* Experience Modal */}
      {otpVerified && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50">
          <form
            onSubmit={handleFinalSubmit}
            className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md"
          >
            <h3 className="text-lg font-semibold mb-4 text-center text-[#51087E]">
              Select Experience Level and Fee Range
            </h3>

            <div className="space-y-3">
              <label className="block">
                <input
                  type="radio"
                  name="experience"
                  value="expert"
                  checked={experienceLevel === "expert"}
                  onChange={handleExperienceChange}
                  className="mr-2"
                />
                Master/Expert Level (10+ years) – ₹3000 to ₹7000/hr
              </label>

              <label className="block">
                <input
                  type="radio"
                  name="experience"
                  value="proficient"
                  checked={experienceLevel === "proficient"}
                  onChange={handleExperienceChange}
                  className="mr-2"
                />
                Proficient Level (5–10 years) – ₹2000 to ₹3000/hr
              </label>

              <label className="block">
                <input
                  type="radio"
                  name="experience"
                  value="intermediate"
                  checked={experienceLevel === "intermediate"}
                  onChange={handleExperienceChange}
                  className="mr-2"
                />
                Intermediate Level (5 years) – ₹1000 to ₹1500/hr
              </label>
            </div>

            <button
              type="submit"
              className="mt-6 w-full px-4 py-2 bg-[#dba577] hover:bg-[#c38e50] text-white font-bold rounded"
            >
              Submit
            </button>

            <p className="mt-4 text-green-700 font-medium text-center">
              Thank you! Kindly wait, we will contact you as soon as possible.
            </p>
          </form>
        </div>
      )}
    </div>
  );
}
