
import React, { useState } from "react";
import CustomButton from "../CustomButton";
import CustomInput from "../CustomInput";
import CustomCheckbox from "../CustomCheckbox";
import CustomDropdown from "../CustomDropdown";
import {
  db,
  RecaptchaVerifier,
  signInWithPhoneNumber,
  auth,
} from "../../Firebase";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";

import StudentCheckbox from "../StudentCheckbox";
import Loader from "../Loader";
import Deaital from "../Detail";
import Detail from "../Detail";

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

const sendJoinTeamForm = async (
  formData,
  selectedRole,
  selectedCountryCode
) => {
  try {
    const response = await fetch(
      "https://us-central1-vip-home-tutors.cloudfunctions.net/sendJoinTeamForm",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          contact: `${selectedCountryCode}${formData.contact}`,
          email: formData.email,
          role: selectedRole,
          boards: formData.boards,
          classes: formData.classes,
          subjects: formData.subjects,
          experience: formData.experience,
          level: formData.level,
          message: formData.message,
        }),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to send form data");
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error sending form data:", error);
    throw error;
  }
};

const JoinTeamForm = () => {
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [selectedRole, setSelectedRole] = useState("Other");
  const [selectedCountryCode, setSelectedCountryCode] = useState("+91");
  const [confirmationResult, setConfirmationResult] = useState(null);
  const [userId, setUserId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

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
  const handleSingleSelect = (field, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  const toggleSelection = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: prev[field].includes(value)
        ? prev[field].filter((v) => v !== value)
        : [...prev[field], value],
    }));
  };

  const handleCountryCodeSelect = (countryCode) => {
    setSelectedCountryCode(countryCode);
  };
const validateForm = () => {
  const errors = {};
  if (!formData.name.trim()) errors.name = "Name is required.";
  if (!formData.contact.trim()) errors.contact = "Mobile number is required.";
  else if (!/^\d{10}$/.test(formData.contact.trim())) errors.contact = "Enter valid 10-digit mobile number.";

  if (!formData.email.trim()) errors.email = "Email is required.";
  else if (!/\S+@\S+\.\S+/.test(formData.email)) errors.email = "Enter a valid email.";

  if (!selectedRole) errors.role = "Please select a role.";

  if (!formData.otp.trim()) errors.otp = "OTP is required.";
  else if (formData.otp.length !== 6) errors.otp = "OTP should be 6 digits.";

  // Add more based on selectedRole fields if necessary
  return errors;
};

  const saveFormData = async () => {
    if (!userId) {
      alert("User ID not available. Please verify OTP again.");
      return;
    }
    setIsLoading(true);
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
      alert("Failed to save form data: " + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const sendOtp = async () => {
    setIsLoading(true);
    try {
      const phoneNumber = `${selectedCountryCode}${formData.contact}`.trim();
      if (!phoneNumber.match(/^\+\d{10,15}$/)) {
        alert("Please enter a valid phone number (e.g., +919876543210)");
        return;
      }

      if (!window.recaptchaVerifier) {
        window.recaptchaVerifier = new RecaptchaVerifier(auth, "recaptcha", {
          size: "invisible",
          callback: () => console.log("reCAPTCHA solved"),
          "expired-callback": () => {
            console.log("reCAPTCHA expired");
            window.recaptchaVerifier.reset();
          },
        });
      }
     
      const appVerifier = window.recaptchaVerifier;
      const result = await signInWithPhoneNumber(
        auth,
        phoneNumber,
        appVerifier
      );
      setConfirmationResult(result);
      setOtpSent(true);
      alert("OTP sent to " + phoneNumber);
    } catch (error) {
      console.error("Error sending OTP:", error);
      alert("Failed to send OTP: " + error.message);
      if (window.recaptchaVerifier) {
        window.recaptchaVerifier.reset();
      }
    } finally {
      setIsLoading(false);
    }
  };

  const verifyOtp = async () => {
    if (!confirmationResult) {
      alert("Please request OTP first");
      return;
    }
    setIsLoading(true);
    try {
      const result = await confirmationResult.confirm(formData.otp);
      const uid = result.user.uid;
      setOtpVerified(true);
      setUserId(uid);
      alert("OTP verified successfully");
    } catch (error) {
      console.error("OTP verification failed:", error);
      alert("Invalid OTP: " + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!otpVerified) {
      alert("Please verify OTP before submitting");
      return;
    }
    setIsLoading(true);
    try {
    
      await saveFormData();
     
      await sendJoinTeamForm(formData, selectedRole, selectedCountryCode);
      alert("Form data sent successfully!");
       setFormData({
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
      setSelectedRole("Other");
      setSelectedCountryCode("+91");
      setOtpVerified(false);
      setOtpSent(false);
      setConfirmationResult(null);
      setUserId(null);

    } catch (error) {
      console.error("Error during submission:", error);
      alert("Failed to submit form: " + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const roleFields = {
    Teacher: (
      <>
        <div className="flex flex-wrap gap-4">
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
        <div className="flex flex-wrap gap-4">
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
        <div className="flex flex-wrap gap-4">
          <label className="block font-semibold mr-2 text-gray-700">
            Select Board:
          </label>
          {boards.map((board) => (
            <label key={board} className="flex items-center gap-2 text-sm">
              <StudentCheckbox
                checked={formData.boards === board}
                onChange={() => handleSingleSelect("boards", board)}
              />
              {board}
            </label>
          ))}
        </div>

        <div className="flex flex-wrap items-center gap-4">
          <label className="font-semibold text-gray-700 mr-4">
            Select Class:
          </label>
          {classes.map((cla) => (
            <label key={cla} className="flex items-center gap-2 text-sm">
              <StudentCheckbox
                checked={formData.classes === cla}
                onChange={() => handleSingleSelect("classes", cla)}
              />
              {cla}
            </label>
          ))}
        </div>

        <div className="flex flex-wrap gap-4">
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
          placeholder="Message:"
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
    <div className="relative">
      {isLoading && (
       <Loader/>
      )}
      <div className="bg-[#f2f2f2] text-md text-headerbordertext font-extrabold flex justify-center">
        Home / Contact Us
      </div>
      <div className="container mx-auto py-10 px-4">
        <div className="max-w-7xl mx-auto space-y-10">
          <div className="overflow-hidden">
            <div className="flex flex-col lg:flex-row gap-10 md:gap-0 md:border-2 rounded-2xl">
              <Detail/>
             
              <div className="w-full lg:w-1/2 p-8 bg-white border-3 border-black md:border-0 rounded-2xl lg:rounded-s-none">
                <h2 className="text-3xl font-bold text-center text-[#dba577] mb-6">
                  Kindly, Fill the Form to get in Touch:
                </h2>
                <form
                  onSubmit={handleSubmit}
                  className="space-y-5 max-w-xl mx-auto"
                >
                  <CustomInput
                    type="text"
                    placeholder="Enter Name:"
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
                          "+44",
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
                        placeholder="Enter Mobile No.:"
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
                    placeholder="Email Id:"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    required
                  />
                  <div className="flex flex-col sm:flex-row gap-14 mb-4">
                    <label className="font-semibold text-gray-800">
                      Are You:
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
                              ${
                                selectedRole === role.value
                                  ? "border-blue-600"
                                  : "border-gray-300"
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
                  {roleFields[selectedRole]}
                  <div className="w-full flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-3 xl:gap-12">
                    <div className="w-full sm:w-auto">
                      <CustomButton
                        type="button"
                        label="Get OTP"
                        onClick={sendOtp}
                        className="w-full py-3 text-sm rounded-lg bg-[#dba577] hover:bg-[#c08c5c]"
                      />
                    </div>
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
                    <div className="w-full sm:w-auto">
                      <CustomButton
                        type="button"
                        label="Verify"
                        onClick={verifyOtp}
                        className="w-full sm:w-auto px-6 py-3 text-sm bg-[#dba577] rounded-lg hover:bg-green-600"
                      />
                    </div>
                  </div>
                  <div id="recaptcha"></div>
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
