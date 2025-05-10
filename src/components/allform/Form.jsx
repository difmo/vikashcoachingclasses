import { useState } from "react";
import CustomButton from "../CustomButton";
import CustomInput from "../CustomInput";
import CustomDropdown from "../CustomDropdown";
import { addDoc, collection } from "firebase/firestore";
import {
  db,
  RecaptchaVerifier,
  signInWithPhoneNumber,
  auth,
  PhoneAuthProvider,
  signInWithCredential,
} from "../../Firebase";

export default function Form() {
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [otpVerified, setOtpVerified] = useState(false);
  const [verificationId, setVerificationId] = useState("");
  const [selectedClassType, setSelectedClassType] = useState("Select Class");
  const [selectedCountryCode, setSelectedCountryCode] = useState("+91");
  const [selectedLevel, setSelectedLevel] = useState("");
  const [experienceLevel, setExperienceLevel] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    board: "",
    subjects: [],
  });
  const [errors, setErrors] = useState({
    name: "",
    phone: "",
    classType: "",
    subjects: "",
    board: "",
    level: "",
  });
  setFormData({
    name: "",
    phone: "",
    board: "",
    subjects: [],
  });
  setSelectedClassType("Select Class");
  setSelectedCountryCode("+91");
  setSelectedLevel("");
  setExperienceLevel("");
  setOtp("");
  setOtpSent(false);
  setVerificationId("");
  setErrors({
    name: "",
    phone: "",
    classType: "",
    subjects: "",
    board: "",
    level: "",
  });
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

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

  const handleBoardChange = (e) => {
    setFormData({ ...formData, board: e.target.value });
  };

  const handleClassTypeSelect = (classType) => {
    setSelectedClassType(classType);
  };

  const handleCountryCodeSelect = (code) => {
    setSelectedCountryCode(code);
  };

  const handleLevelSelect = (level) => {
    setSelectedLevel(level);
  };

  const handleExperienceChange = (e) => {
    setExperienceLevel(e.target.value);
  };

  const validateForm = () => {
    let formErrors = { ...errors };
    let isValid = true;

    if (!formData.name.trim()) {
      formErrors.name = "Please enter your name.";
      isValid = false;
    } else {
      formErrors.name = "";
    }

    if (!formData.phone || formData.phone.length < 10) {
      formErrors.phone = "Please enter a valid phone number.";
      isValid = false;
    } else {
      formErrors.phone = "";
    }

    if (selectedClassType === "Select Class") {
      formErrors.classType = "Please select a class.";
      isValid = false;
    } else {
      formErrors.classType = "";
    }

    if (formData.subjects.length === 0) {
      formErrors.subjects = "Please select at least one subject.";
      isValid = false;
    } else {
      formErrors.subjects = "";
    }

    if (!formData.board) {
      formErrors.board = "Please select a board.";
      isValid = false;
    } else {
      formErrors.board = "";
    }

    if (!selectedLevel) {
      formErrors.level = "Please select a level.";
      isValid = false;
    } else {
      formErrors.level = "";
    }

    setErrors(formErrors);
    return isValid;
  };

  const handleSendOTP = async () => {
    if (!validateForm()) return;

    try {
      if (!window.recaptchaVerifier) {
        window.recaptchaVerifier = new RecaptchaVerifier(auth, "recaptcha", {
          size: "invisible",
          callback: (response) => {
            console.log("reCAPTCHA solved:", response);
          },
        });
      }

      const appVerifier = window.recaptchaVerifier;
      const phoneNumber = selectedCountryCode + formData.phone;

      const confirmationResult = await signInWithPhoneNumber(
        auth,
        phoneNumber,
        appVerifier
      );
      setVerificationId(confirmationResult.verificationId);
      setOtpSent(true);
      alert("OTP sent successfully!");
    } catch (error) {
      console.error("Error sending OTP:", error.message);
      alert("Error: " + error.message);
    }
  };

  const handleVerifyOTP = () => {
    if (!otp || !verificationId) return alert("Please enter the OTP.");

    const credential = PhoneAuthProvider.credential(verificationId, otp);
    signInWithCredential(auth, credential)
      .then(() => {
        setOtpVerified(true);
        alert("OTP verified successfully!");
      })
      .catch((error) => {
        console.error("OTP Verification Error:", error);
        alert("Invalid OTP. Please try again.");
      });
  };

  const sendFormDataToEmail = async () => {
    try {
      const response = await fetch(
        "https://us-central1-vip-home-tutors.cloudfunctions.net/sendTeachersForm",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: formData.name,
            phone: selectedCountryCode + formData.phone,
            classType: selectedClassType,
            level: selectedLevel,
            board: formData.board,
            subjects: formData.subjects,
            experienceLevel: experienceLevel,
            timestamp: new Date().toISOString(),
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to send form data to email");
      }

      const result = await response.json();
      console.log("Email sent successfully:", result);
      return true;
    } catch (error) {
      console.error("Error sending form data to email:", error);
      throw error;
    }
  };

  const handleFinalSubmit = async (e) => {
    e.preventDefault();
    if (!experienceLevel) {
      alert("Please select your experience level.");
      return;
    }

    try {
      await addDoc(collection(db, "Vikasrequests"), {
        name: formData.name,
        phone: selectedCountryCode + formData.phone,
        classType: selectedClassType,
        level: selectedLevel,
        board: formData.board,
        subjects: formData.subjects,
        experienceLevel,
        timestamp: new Date(),
      });
      await sendFormDataToEmail();
      setOtpVerified(false);
      alert("Form submitted successfully!");
    } catch (err) {
      alert("Something went wrong. Please try again later.");
      console.error(err);
      setOtpVerified(false);
    }
  };

  return (
    <div className="relative w-full px-4 sm:px-6 md:px-4 pb-3 border-3 border-white rounded-lg">
      <div className="-mb-1 mt-1 text-[31px] tracking-tight text-[#dba577] font-extrabold">
        Kindly, Fill the Form :
      </div>

      <div className="-pb-1">
        <CustomInput
          placeholder="Enter Your Name :"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
        />
        {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
      </div>

      <div className="pb-1 flex flex-wrap sm:flex-nowrap gap-2 items-center">
        <div className="w-full sm:w-1/6">
          <CustomDropdown
            className="text-black w-full mt-4"
            selectOption={["+91", "+1", "+44", "+974", "+971", "+61"]}
            selectedValue={selectedCountryCode}
            onSelect={handleCountryCodeSelect}
          />
        </div>
        <div className="w-full sm:w-3/2">
          <CustomInput
            placeholder="Enter Mobile No. :"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
          />
          {errors.phone && (
            <p className="text-red-500 text-sm">{errors.phone}</p>
          )}
        </div>
      </div>

      <CustomDropdown
        className="text-black"
        selectOption={["7th", "8th", "9th", "10th", "12th", "Droppers"]}
        selectedValue={selectedClassType}
        onSelect={handleClassTypeSelect}
      />
      {errors.classType && (
        <p className="text-red-500 text-sm">{errors.classType}</p>
      )}

      <div className="pb-1">
        <label className="block font-semibold mb- text-sm sm:text-base">
          Select Subjects :
          <span className="text-sm text-[#ebe9e7]">
            &nbsp;(You can Select Multiples)
          </span>
        </label>
        <div className="grid grid-cols-3 gap- ">
          {[
            "Science",
            "Physics",
            "Chemistry",
            "Maths",
            "Biology",
            "Others",
          ].map((subject) => (
            <label key={subject} className="flex items-center ">
              <input
                type="checkbox"
                name="subjects"
                value={subject}
                onChange={handleSubjectChange}
              />
              <span className="text-sm sm:text-base px-2">{subject}</span>
            </label>
          ))}
        </div>
        {errors.subjects && (
          <p className="text-red-500 text-sm">{errors.subjects}</p>
        )}
      </div>

      <div className="flex flex-wrap gap-2 pb-2">
        <label className="block text-black font-extrabold">Board : </label>
        {["CBSE", "IB", "ICSE", "ISC", "IGCSE"].map((board) => (
          <label key={board} className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              name="board"
              value={board}
              checked={formData.board === board}
              onChange={handleBoardChange}
            />
            {board}
          </label>
        ))}
        {errors.board && <p className="text-red-500 text-sm">{errors.board}</p>}
      </div>

      <CustomDropdown
        className="text-black"
        selectOption={[
          "School Level",
          "NEET",
          "IIT-JEE",
          "Board + NEET",
          "Board + IIT-JEE",
        ]}
        selectedValue={selectedLevel}
        onSelect={handleLevelSelect}
      />
      {errors.level && <p className="text-red-500 text-sm">{errors.level}</p>}

      <div id="recaptcha"></div>

      {!otpSent ? (
        <div className="text-center -pt-2 ">
          <CustomButton
            onClick={handleSendOTP}
            className="text-[#51087E] hover:bg-primary bg-[#dba577] text-xl font-bold"
            label="Get OTP"
          />
        </div>
      ) : !otpVerified ? (
        <div className="">
          <CustomInput
            placeholder="Enter OTP"
            name="otp"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />
          <div className="text-center pt-2">
            <CustomButton
              onClick={handleVerifyOTP}
              className="bg-[#51087E] text-white font-bold"
              label="Verify OTP"
            />
          </div>
        </div>
      ) : (
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
          </form>
        </div>
      )}
    </div>
  );
}
