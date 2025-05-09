import React, { useState } from "react";
import CustomButton from "../CustomButton";
import CustomInput from "../CustomInput";
import CustomCheckbox from "../CustomCheckbox";
import CustomRadio from "../CustomRadio";
import img from "../../assets/logo1.jpeg";
import CustomDropdown from "../CustomDropdown";
import StudentCheckbox from "../StudentCheckbox";
import {
  db,
  RecaptchaVerifier,
  signInWithPhoneNumber,
  auth,
  PhoneAuthProvider,
  signInWithCredential,
} from "../../Firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

const boards = ["CBSE", "IB", "IGCSE", "ICSE", "ISC"];
const subjects = ["Sci.", "Phy", "Chem", "Bio", "Maths", "Other"];
const classes = ["7th", "8th", "9th", "10th", "12th", "Droppers"];
const levels = [
  "School Level",
  "NEET",
  "IIT-JEE",
  "Board + NEET",
  "Board + IIT-JEE",
];

const JoinTeamForm = () => {
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [selectedRole, setSelectedRole] = useState("Other");
  const [selectedCountryCode, setSelectedCountryCode] = useState("+91");
  const [selectedOption, setSelectedOption] = useState("option1");
  const [confirmationResult, setConfirmationResult] = useState(null);
  const [userId, setUserId] = useState(null); 

  const [formData, setFormData] = useState({
    name: "",
    contact: "",
    email: "",
    classes: [],
    subjects: [],
    boards: [],
    experience: "",
    level: "",
    message: "",
    otp: "",
  });

  const toggleSelection = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: prev[field].includes(value)
        ? prev[field].filter((v) => v !== value)
        : [...prev[field], value],
    }));
  };

  const handleRadioChange = (value) => {
    setSelectedOption(value);
  };
  const handleFileChange = (e) => {
    setFormData({ ...formData, resume: e.target.files[0] });
  };
  const handleCountryCodeSelect = (countryCode) => {
    setSelectedCountryCode(countryCode);
  };


  const saveFormData = async () => {
    if (!userId) {
      alert("User ID not available. Please verify OTP again.");
      return;
    }
  
    try {
      await setDoc(doc(db, "joinTeamForms", userId), {
        ...formData,
        role: selectedRole,
        countryCode: selectedCountryCode,
        timestamp: serverTimestamp(),
      });
      alert("Form submitted and saved successfully!");
    } catch (error) {
      console.error("Error saving form data:", error);
      alert("Failed to save form data.");
    }
  };
  

  const sendOtp = async () => {
    try {
      // Initialize reCAPTCHA verifier if not already initialized
      if (!window.recaptchaVerifier) {
        window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha', {
          size: 'invisible',
          callback: (response) => {
            console.log('reCAPTCHA solved:', response);
          },
        });
      }
  
      const appVerifier = window.recaptchaVerifier;
      const phoneNumber = selectedCountryCode + formData.contact;

      const result = await signInWithPhoneNumber(auth, phoneNumber, appVerifier);
      setConfirmationResult(result);
      alert('OTP sent');
    } catch (error) {
      console.error('Error sending OTP:', error.message);
      alert('Error: ' + error.message);
    }
  };

  // const sendOtp = () => {
  //   console.log("hello world");
  //   console.log(formData.contact);
  //   if (!formData.contact) return alert("Enter contact number first");
  //   setOtpSent(true);
  //   alert("OTP sent to " + formData.contact);
  // };


  const verifyOtp = async () => {
    if (!confirmationResult) {
      alert("Please request OTP first");
      return;
    }
  
    try {
      const result = await confirmationResult.confirm(formData.otp);
      const uid = result.user.uid;
      setOtpVerified(true);
      setUserId(uid); // Store the user ID
      alert("OTP verified successfully");
    } catch (error) {
      console.error("OTP verification failed:", error.message);
      alert("Invalid OTP");
    }
  };
  
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!otpVerified) {
      return alert("Please verify OTP before submitting");
    }
    await saveFormData();
  };
  
  const roleFields = {
    Teacher: (
      <>
        {/* Boards */}
        <div className="flex flex-wrap gap-4 ">
          <label className="block font-semibold mr-2 text-gray-700">
            Select Board:
          </label>
          {boards.map((board) => (
            <label key={board} className="flex items-center -gap-2 text-sm">
              <CustomCheckbox
                checked={formData.boards.includes(board)}
                onChange={() => toggleSelection("boards", board)}
              />
              {board}
            </label>
          ))}
        </div>
        {/* Classes */}
        <div className="flex flex-wrap items-center gap-4">
          <label className="font-semibold text-gray-700 mr-4">
            Select Class:
          </label>
          {classes.map((cla) => (
            <label key={cla} className="flex items-center -gap-1 text-sm">
              <CustomCheckbox
                checked={formData.classes.includes(cla)}
                onChange={() => toggleSelection("classes", cla)}
              />
              {cla}
            </label>
          ))}
        </div>
        {/* Subjects */}
        <div className="flex flex-wrap gap-4 ">
          <label className="block font-semibold mr-2 text-gray-700">
            Select Subject:
          </label>
          {subjects.map((sub) => (
            <label key={sub} className="flex items-center -gap-2 text-sm">
              <CustomCheckbox
                checked={formData.subjects.includes(sub)}
                onChange={() => toggleSelection("subjects", sub)}
              />
              {sub}
            </label>
          ))}
        </div>
        <CustomInput
          type="text"
          placeholder="Experience (in years)"
          value={formData.experience}
          onChange={(e) =>
            setFormData({ ...formData, experience: e.target.value })
          }
        />
      </>
    ),

    "Students / Parents": (
      <>
        {/* Boards */}
        <div className="flex flex-wrap gap-4 ">
          <label className="block font-semibold mr-2 text-gray-700">
            Select Board:
          </label>
          {boards.map((board) => (
            <label key={board} className="flex items-center -gap-2 text-sm">
              {/* <StudentCheckbox
                checked={formData.boards.includes(board)}
                onChange={() => toggleSelection("boards", board)}
              />
              {board}
           */}
              <StudentCheckbox
                id="option1"
                // label="Option 1*"
                checked={selectedOption === "option1"}
                onChange={() => handleRadioChange("option1")}
                groupName="student-options"
              />{board} </label>
          ))}
        </div>
        {/* Classes */}
        <div className="flex flex-wrap items-center gap-4">
          <label className="font-semibold text-gray-700 mr-4">
            Select Class :
          </label>
          {classes.map((cla) => (
            <label key={cla} className="flex items-center -gap-1 text-sm">
              <StudentCheckbox
                id="option2"
                // label="Option 1*"
                checked={selectedOption === "option2"}
                onChange={() => handleRadioChange("option2")}
                groupName="student-options"
              />
              {cla}
            </label>
          ))}
        </div>
        {/* Subjects */}
        <div className="flex flex-wrap gap-4 ">
          <label className="block font-semibold mr-2 text-gray-700">
            Select Subject:
          </label>
          {subjects.map((sub) => (
            <label key={sub} className="flex items-center -gap-2 text-sm">
              <CustomCheckbox
                checked={formData.subjects.includes(sub)}
                onChange={() => toggleSelection("subjects", sub)}
              />
              {sub}
            </label>
          ))}
        </div>
        {/* Level Dropdown */}
        <select
          className="w-full border rounded-md px-4 py-2"
          value={formData.level}
          onChange={(e) => setFormData({ ...formData, level: e.target.value })}
        >
          <option value="">Select Level</option>
          {levels.map((lvl) => (
            <option key={lvl} value={lvl}>
              {lvl}
            </option>
          ))}
        </select>
      </>
    ),

    Other: (
      <>
        <textarea
          placeholder="Message :"
          value={formData.message}
          onChange={(e) =>
            setFormData({ ...formData, message: e.target.value })
          }
          rows={4}
          className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </>
    ),
  };

  return (
    <div>
      <div className="bg-[#f2f2f2] text-md text-headerbordertext font-extrabold flex justify-center">
        Home / Contact Us
      </div>
      <div className="container mx-auto py-10 px-4">
        <div className="max-w-7xl mx-auto space-y-10">
          <div className="overflow-hidden">
            <div className="flex flex-col lg:flex-row gap-10 md:gap-0 md:border-2 rounded-2xl">
              {/* Left */}
              <div className="w-full lg:w-1/2 flex flex-col items-center justify-center border-3 md:border-0 relative text-base sm:text-lg md:text-xl bg-primary text-headerbordertext py-6 rounded-2xl lg:rounded-e-none">
                <h1 className="text-2xl sm:text-3xl font-bold absolute top-4 sm:top-8 text-center w-full">
                  Vikas Institute
                </h1>

                <div className="pb-5 pt-20 text-center space-y-2">
                  <p>Malviya Nagar, New Delhi - 110017</p>

                  <p>
                    Contact:{" "}
                    <a href="tel:+918427373281" className="hover:underline">
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
                      className="hover:underline"
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
                </div>

                <img
                  src={img}
                  alt="logo"
                  className="mx-auto mt-6 px-4 sm:px-6 max-w-[80%]"
                />

                <p className="pt-8 sm:pt-10 px-4 sm:px-6 font-light uppercase text-center text-sm sm:text-base">
                  A Most Trusted Website to Hire Best Online Private Tutors for{" "}
                  <br />
                  USA - CANADA - UK - QATAR - UAE - AUSTRALIA - INDIA.
                </p>
                <p
                  className=" px-4 sm:px-6 pt-14
                  font-light uppercase text-center text-sm sm:text-base"
                >
                  "At the Heart of our Success lies the Confidence that you
                  Place in Us, Globly. Your Trust is our Greatest Asset."
                </p>
              </div>

              {/* Right */}
              <div className="w-full lg:w-1/2 p-8 bg-white border-3 border-black md:border-0  rounded-2xl lg:rounded-s-none">
                <h2 className="text-3xl font-bold text-center text-[#dba577] mb-6">
                  Kindly, Fill the Form to get in Touch :
                </h2>

                <form
                  onSubmit={handleSubmit}
                  className="space-y-5 max-w-xl mx-auto"
                >
                  <CustomInput
                    type="text"
                    placeholder="Enter  Name :"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    required
                  />
                  <div className="pb-2 md:pb-0 flex flex-wrap sm:flex-nowrap gap-2 items-center">
                    <div className="w-full sm:w-1/6">
                      <CustomDropdown
                        className="text-black w-full mt-4"
                        selectOption={[
                          "+1",
                          "+44 ",
                          "+974",
                          "+971",
                          "+91",
                          "+61",
                        ]}
                        selectedValue={selectedCountryCode}
                        onSelect={handleCountryCodeSelect}
                      />
                    </div>

                    <div className="w-full sm:w-3/2">
                      <CustomInput
                        placeholder="Enter Mobile No. :"
                        name="contact"
                        value={formData.contact}
                        onChange={(e) =>
                          setFormData({ ...formData, contact: e.target.value })
                        }
                      />

                    </div>
                  </div>
                  <CustomInput
                    type="email"
                    placeholder=" Email Id :"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    required
                  />
                  <div className="flex flex-col sm:flex-row  gap-14 mb-4">
                    <label className="font-semibold text-gray-800">
                      Are You :
                    </label>
                    {[
                      { value: "Teacher", label: "Teacher" },
                      {
                        value: "Students / Parents",
                        label: "Students / Parents",
                      },
                      { value: "Other", label: "Other" },
                    ].map((role) => (
                      <label
                        key={role.value}
                        className="inline-flex items-center gap-2 cursor-pointer"
                      >
                        <span className="relative">
                          <input
                            type="radio"
                            name="role"
                            value={role.value}
                            checked={selectedRole === role.value}
                            onChange={() => setSelectedRole(role.value)}
                            className="sr-only"
                          />
                          <div
                            className={`w-5 h-5 rounded-full border-2 flex items-center justify-center
          ${selectedRole === role.value ? "border-blue-600" : "border-gray-300"
                              }`}
                          >
                            {selectedRole === role.value && (
                              <div className="w-2.5 h-2.5 bg-[#dba577] rounded-full" />
                            )}
                          </div>
                        </span>
                        <span className="text-gray-800">{role.label}</span>
                      </label>
                    ))}
                  </div>

                  {/* Conditional Fields*/}
                  {roleFields[selectedRole]}

                  {/* OTP */}
                  <div className="w-full flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-3 xl:gap-22">
                    {/* Get OTP Button */}
                    <div className="w-full sm:w-auto">
                      <CustomButton
                        type="button"
                        label="Get OTP"
                        onClick={sendOtp}
                        className="w-full py-3 text-sm  rounded-lg bg-[#dba577] hover:bg-[#c08c5c]"
                      />
                    </div>

                    {/* OTP Input Field */}
                    <div className="w-full sm:w-40">
                      <CustomInput
                        type="text"
                        placeholder="Enter OTP"
                        value={formData.otp}
                        onChange={(e) =>
                          setFormData({ ...formData, otp: e.target.value })
                        }
                        className="w-full"
                      />
                    </div>

                    {/* Verify Button */}
                    <div className="w-full sm:w-auto">
                      <CustomButton
                        type="button"
                        label="Verify"
                        onClick={verifyOtp}
                        className="w-full sm:w-auto px-6 py-3 text-sm bg-[#dba577] rounded-lg hover:bg-green-600"
                      />
                    </div>
                  </div>

                  {/* Submit */}
                  <CustomButton
                    type="submit"
                    label="Submit"
                    className="w-full bg-[#dba577] hover:bg-[#dba577] py-2 rounded-lg font-semibold text-white"
                  />
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JoinTeamForm;
