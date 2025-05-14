import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import CustomButton from "../CustomButton";
import CustomInput from "../CustomInput";
import CustomDropdown from "../CustomDropdown";
import { addDoc, collection } from "firebase/firestore";
import { useEffect } from "react";

import {
  db,
  RecaptchaVerifier,
  signInWithPhoneNumber,
  auth,
  PhoneAuthProvider,
  signInWithCredential,
} from "../../Firebase";
import Loader from "../Loader";

export default function Form() {
  const navigate = useNavigate();

  const initialFormState = {
    name: "",
    phone: "",
    board: "",
    subjects: [],
  };

  const initialErrors = {
    name: "",
    phone: "",
    classType: "",
    subjects: [],
    board: "",
    level: "",
  };

  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [otpVerified, setOtpVerified] = useState(false);
  const [verificationId, setVerificationId] = useState("");
  const [selectedClassType, setSelectedClassType] = useState("Select Class");
  const [selectedsubjects, setSelectedsubjects] = useState("");
  const [selectedCountryCode, setSelectedCountryCode] = useState("+91");
  const [selectedLevel, setSelectedLevel] = useState("");
  const [experienceLevel, setExperienceLevel] = useState("");
  const [errorsEx, setErrorsEx] = useState("");
  const [formData, setFormData] = useState(initialFormState);
  const [errors, setErrors] = useState(initialErrors);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const formRef = useRef(null);

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
    setErrorsEx(""); // Clear error when user selects something
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
    // ❌ Using phoneNumber before it’s defined
    // if (!phoneNumber.match(/^\+\d{10,15}$/)) {
    //   alert("Please enter a valid phone number (e.g., +919876543210)");
    //   return;
    // }

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

    // if (!experienceLevel) {
    //   formErrors.experienceLevel = "Please select an experience level.";
    //   isValid = false;
    // } else {
    //   formErrors.experienceLevel = "";
    // }

    setErrors(formErrors);
    return isValid;
  };

  useEffect(() => {
    return () => {
      if (window.recaptchaVerifier) {
        delete window.recaptchaVerifier;
      }
    };
  }, []);

  useEffect(() => {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(auth, "recaptcha", {
        size: "invisible",
        callback: () => {
          console.log("reCAPTCHA resolved");
        },
        "expired-callback": () => {
          console.log("reCAPTCHA expired. Resetting...");
          window.recaptchaVerifier.render().then((widgetId) => {
            window.grecaptcha.reset(widgetId);
          });
        },
      });

      // Render the reCAPTCHA widget immediately
      window.recaptchaVerifier.render().catch(console.error);
    }
  }, []);

  const handleSendOTP = async () => {
    if (!validateForm()) {
      return alert("Please fill in all required fields.");
    }
    try {
      // const phoneNumber = `${selectedCountryCode}${formData.contact}`.trim();
      // if (!phoneNumber.match(/^\+\d{10,15}$/)) {
      //   alert("Please enter a valid phone number (e.g., +919876543210)");
      //   return;
      // }

      if (!window.recaptchaVerifier) {
        window.recaptchaVerifier = new RecaptchaVerifier(auth, "recaptcha", {
          size: "invisible",
          callback: () => {},
        });
      }
      setIsLoading(true);

      const appVerifier = window.recaptchaVerifier;
      const phoneNumber = selectedCountryCode + formData.phone;

      const confirmationResult = await signInWithPhoneNumber(
        auth,
        phoneNumber,
        appVerifier
      );

      setVerificationId(confirmationResult.verificationId);
      setOtpSent(true);
      setIsLoading(false);
      alert("OTP sent successfully!");
    } catch (error) {
      console.error("Error sending OTP:", error.message);
      alert("Error: " + error.message);
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyOTP = async () => {
    if (!otp || !verificationId) return alert("Please enter the OTP.");

    setIsLoading(true);
    try {
      const credential = PhoneAuthProvider.credential(verificationId, otp);
      await signInWithCredential(auth, credential);
      setOtpVerified(true);
      setIsLoading(false);
      alert("OTP verified successfully!");
    } catch (error) {
      console.error("OTP Verification Error:", error);
      alert("Invalid OTP. Please try again.");
      setIsLoading(false);
    } finally {
      setIsLoading(false); // Ensure loader is turned off
    }
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
            experienceLevel,
            timestamp: new Date().toISOString(),
          }),
        }
      );
      setIsLoading(false);
      if (!response.ok) throw new Error("Failed to send form data to email");
      return true;
    } catch (error) {
      setIsLoading(false);
      console.error("Error sending form data to email:", error);
      throw error;
    }
  };

  const resetForm = () => {
    setFormData(initialFormState);
    setOtp("");
    setOtpSent(false);
    setOtpVerified(false);
    setVerificationId("");
    setSelectedsubjects("");
    setSelectedClassType("Select Class");
    setSelectedCountryCode("+91");
    setSelectedLevel("");
    setExperienceLevel("");
    setErrors(initialErrors);
  };

  const handleFinalSubmit = async (e) => {
    e.preventDefault();

    // Validate that experienceLevel is selected
    if (!experienceLevel) {
      setErrorsEx("Please select an experience level.");
      return;
    }

    // Clear errors and continue with submission logic
    setErrorsEx("");

    e.preventDefault();
    setIsLoading(true);
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
      setIsLoading(false);
      alert("Thanks for submitting! We'll get in touch soon.");
      resetForm();
      navigate("/");
      setOtpVerified(false);
      setFormData(initialFormState);
    } catch (err) {
      alert("Something went wrong. Please try again later.");
      console.error(err);
      setIsLoading(false);
      setOtpVerified(false);
    }
  };
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (formRef.current && !formRef.current.contains(event.target)) {
        // Reset only errors:
        setErrors(initialErrors);
        setErrorsEx("");

        // Optionally reset entire form:
        // resetForm();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div
      ref={formRef}
      className="relative w-full px-4 sm:px-6 md:px-4 pb-3 border-3 border-white rounded-lg"
    >
      <Loader isLoading={isLoading} />

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
        selectOption={["7th", "8th", "9th", "10th", "11th", "12th", "Droppers"]}
        selectedValue={selectedClassType}
        onSelect={handleClassTypeSelect}
      />
      {errors.classType && (
        <p className="text-red-500 text-sm">{errors.classType}</p>
      )}
      <div className="pb-1">
        <label className="block font-semibold text-sm sm:text-base">
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
                checked={formData.subjects.includes(subject)} // ← this is critical
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
      {!otpVerified ? (
        <div className="flex flex-col sm:flex-row flex-nowrap items-center gap-2 justify-between w-full">
          <CustomButton
            onClick={handleSendOTP}
            className=" shrink-0 px-3 py-3 text-[#51087E] text-sm hover:bg-primary bg-[#dba577] rounded"
            label="Get OTP"
          />
          <CustomInput
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            className=" px-3 py-3 text-sm rounded-lg"
          />

          <CustomButton
            onClick={handleVerifyOTP}
            className=" shrink-0 px-3 py-2 text-headerbordertext hover:bg-primary bg-[#dba577] rounded"
            label="Verify"
          />
        </div>
      ) : (
        <div className="fixed inset-0 pt-18 bg-white flex justify-center items-center z-50">
          <Loader isLoading={isLoading} />
          <form
            onSubmit={handleFinalSubmit}
            className="bg-white p-6 rounded-lg h-screen ab  items-center w-full"
          >
            <h3 className="text-3xl font-semibold mb-4 text-center text-[#51087E]">
              Select Experience Level and Fee Range
            </h3>

            <div className="space-y-3 justify-center text-center text-2xl  items-center">
              <label className="block py-2 md:px-28">
                <input
                  type="radio"
                  name="experience"
                  value="intermediate"
                  checked={experienceLevel === "intermediate"}
                  onChange={handleExperienceChange}
                  className="mr-2"
                />
                Want to Hire an Intermediate level Teacher (up to 5 years of
                Experience) Fees Range $10 to $20 (USD) Per Hour
              </label>

              <label className="block py-2 md:px-28">
                <input
                  type="radio"
                  name="experience"
                  value="proficient"
                  checked={experienceLevel === "proficient"}
                  onChange={handleExperienceChange}
                  className="mr-2"
                />
                Want to Hire a Proficient level Teacher (up to 10 years of
                Experience) Fees Range $20 to $35 (USD) Per Hour
              </label>

              <label className="block py-2 md:px-28">
                <input
                  type="radio"
                  name="experience"
                  value="expert"
                  checked={experienceLevel === "expert"}
                  onChange={handleExperienceChange}
                  className="mr-2"
                />
                Want to Hire an Expert level Teacher (More than 10 years of
                Experience) Fees Range $35 to $50 (USD) Per Hour
              </label>
            </div>

            {/* Error Display */}
            {errorsEx && (
              <p className="text-red-500 text-sm text-center mt-2">
                {errorsEx}
              </p>
            )}

            <div className="w-full flex justify-center mt-4 px-4">
              <button
                type="submit"
                label="Submit"
                className={`w-full sm:w-3/4 md:w-1/2 lg:w-1/3 px-4 py-2 ${
                  isSubmitting
                    ? "bg-gray-400"
                    : "bg-[#dba577] hover:bg-[#c38e50]"
                } text-white font-bold rounded transition duration-200`}
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
