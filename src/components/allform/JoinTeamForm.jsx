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

import Detail from "../Detail";
import Loader from "../Loader";

const boards = ["CBSE", "IB", "IGCSE", "ICSE", "ISC"];
const subjects = ["Sci.", "Phy", "Chem", "Bio", "Maths", "Other"];
const classes = ["7th", "8th", "9th", "10th", "11th", "12th", "Droppers"];
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
    const requestBody = JSON.stringify({
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
    });
    console.log("Request Body:", requestBody);
    const response = await fetch(
      "https://us-central1-vip-home-tutors.cloudfunctions.net/sendJoinTeamForm",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: requestBody,
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
  const [formErrors, setFormErrors] = useState({});
  const validateForm = () => {
    const errors = {};

    if (!formData.name.trim()) errors.name = "Name is required.";

    if (!formData.contact.trim()) {
      errors.contact = "Mobile number is required.";
    } else if (!/^\d{10}$/.test(formData.contact.trim())) {
      errors.contact = "Enter a valid 10-digit mobile number.";
    }

    if (!formData.email.trim()) {
      errors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(formData.email.trim())) {
      errors.email = "Enter a valid email.";
    }

    if (!selectedRole) errors.role = "Please select a role.";

    if (otpSent && !formData.otp.trim()) {
      errors.otp = "OTP is required.";
    } else if (otpSent && formData.otp.length !== 6) {
      errors.otp = "OTP should be 6 digits.";
    }

    if (selectedRole === "Teacher") {
      if (formData.boards.length === 0)
        errors.boards = "Select at least one board.";
      if (formData.classes.length === 0)
        errors.classes = "Select at least one class.";
      if (formData.subjects.length === 0)
        errors.subjects = "Select at least one subject.";
      if (!formData.experience.trim())
        errors.experience = "Experience is required.";
    }

    if (selectedRole === "Students / Parents") {
      if (formData.boards.length === 0) errors.boards = "Select your board.";
      if (formData.classes.length === 0) errors.classes = "Select your class.";
      if (formData.subjects.length === 0)
        errors.subjects = "Select at least one subject.";
      if (!formData.level) errors.level = "Select a level.";
    }
    if (selectedRole === "Other") {
      if (!formData.message.trim()) errors.message = "Message is required.";
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
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
      // alert("Form submitted and saved successfully!");
    } catch (error) {
      console.error("Error saving form data:", error);
      alert("Failed to save form data: " + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const sendOtp = async () => {
    if (!validateForm()) {
      return alert("Please fill in all required fields.");
    }

    try {
      setIsLoading(true);
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
      setIsLoading(false);
    } catch (error) {
      console.error("Error sending OTP:", error);
      alert("Failed to send OTP: " + error.message);
      if (window.recaptchaVerifier) {
        window.recaptchaVerifier.reset();
      }
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  };

  const verifyOtp = async () => {
    if (!confirmationResult) {
      alert("Please request OTP first");
      return;
    }

    try {
      setIsLoading(true);
      const result = await confirmationResult.confirm(formData.otp);
      const uid = result.user.uid;
      setOtpVerified(true);
      setUserId(uid);
      setIsLoading(false);
      alert("OTP verified successfully");
    } catch (error) {
      console.error("OTP verification failed:", error);
      setIsLoading(false);
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

    try {
      setIsLoading(true);
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
      setIsLoading(false);
    } catch (error) {
      console.error("Error during submission:", error);
      setIsLoading(false);
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
          {formErrors.boards && (
            <p className="text-red-500 text-sm">{formErrors.boards}</p>
          )}
        </div>
        <div className="flex flex-wrap items-center gap-3">
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

          {formErrors.classes && (
            <p className="text-red-500 text-sm">{formErrors.classes}</p>
          )}
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

          {formErrors.subjects && (
            <p className="text-red-500 text-sm">{formErrors.subjects}</p>
          )}
        </div>
        <CustomInput
          type="text"
          placeholder="Experience (in years)"
          value={formData.experience}
          onChange={(e) =>
            setFormData({ ...formData, experience: e.target.value })
          }
        />

        {formErrors.experience && (
          <p className="text-red-500 text-sm">{formErrors.experience}</p>
        )}
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
          {formErrors.boards && (
            <p className="text-red-500 text-sm w-full">{formErrors.boards}</p>
          )}
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <label className="font-semibold text-gray-700 mr-4">
            Select Class:
          </label>
          {classes.map((cla) => (
            <label key={cla} className="flex items-center gap- text-sm">
              <StudentCheckbox
                checked={formData.classes === cla}
                onChange={() => handleSingleSelect("classes", cla)}
              />
              {cla}
            </label>
          ))}
          {formErrors.classes && (
            <p className="text-red-500 text-sm w-full">{formErrors.classes}</p>
          )}
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
          {formErrors.subjects && (
            <p className="text-red-500 text-sm">{formErrors.subjects}</p>
          )}
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
        {formErrors.level && (
          <p className="text-red-500 text-sm">{formErrors.level}</p>
        )}
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
        {formErrors.message && (
          <p className="text-red-500 text-sm">{formErrors.message}</p>
        )}
      </>
    ),
  };

  return (
    <div className="relative">
      <Loader isLoading={isLoading} />

      <div className="bg-[#f2f2f2] text-md text-headerbordertext font-extrabold flex justify-center">
        Home / Contact Us
      </div>
      <div className="container mx-auto py-10 px-4">
        <div className="max-w-7xl mx-auto space-y-10">
          <div className="overflow-hidden">
            <div className="flex flex-col lg:flex-row gap-10 md:gap-0 md:border-2 rounded-2xl">
              <div className="w-full rounded-2xl lg:rounded-e-none bg-primary h-auto lg:w-1/2">
                <Detail />
              </div>
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
                  {formErrors.name && (
                    <p className="text-red-500 text-sm">{formErrors.name}</p>
                  )}

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
                  {formErrors.contact && (
                    <p className="text-red-500 text-sm">{formErrors.contact}</p>
                  )}
                  <CustomInput
                    type="email"
                    placeholder="Email Id:"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    required
                  />
                  {formErrors.email && (
                    <p className="text-red-500 text-sm">{formErrors.email}</p>
                  )}
                  <div className="w-full flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6 mb-4">
                    {/* Label */}
                    <div className="font-semibold text-gray-800 min-w-fit">
                      Are You:
                    </div>

                    {/* Radio Buttons */}
                    <div className="flex flex-col sm:flex-row gap-3 sm:gap-3 md:gap-8 xl:gap-24">
                      {[
                        { value: "Teacher", label: "Teacher" },
                        {
                          value: "Students / Parents",
                          label: "Students/Parents",
                        },
                        { value: "Other", label: "Other" },
                      ].map((role) => (
                        <label
                          key={role.value}
                          className="inline-flex items-center gap-1 cursor-pointer"
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
                              className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
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
                          <span className="text-gray-800 text-sm sm:text-base">
                            {role.label}
                          </span>
                        </label>
                      ))}
                    </div>
                    {formErrors.role && (
                      <p className="text-red-500 text-sm">{formErrors.role}</p>
                    )}
                  </div>

                  {roleFields[selectedRole]}
                  <div className="w-full flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6 xl:gap-24">
                    {/* Get OTP Button */}
                    <div className="w-full sm:w-auto">
                      <CustomButton
                        type="button"
                        label="Get OTP"
                        onClick={sendOtp}
                        className="w-full sm:min-w-[100px] py-3 text-[10px] rounded-lg bg-[#dba577] hover:bg-[#c08c5c]"
                      />
                    </div>

                    {/* OTP Input */}
                    <div className="w-full sm:w-auto flex justify-center">
                      <CustomInput
                        type="text"
                        placeholder="Enter OTP"
                        value={formData.otp}
                        onChange={(e) =>
                          setFormData({ ...formData, otp: e.target.value })
                        }
                        className="w-full sm:w-[180px] md:w-[220px] lg:w-[250px] px-3 py-3 text-sm rounded-lg"
                      />
                    </div>

                    {/* Verify Button */}
                    <div className="w-full sm:w-auto">
                      <CustomButton
                        type="button"
                        label="Verify"
                        onClick={verifyOtp}
                        className="w-full sm:min-w-[100px] px-6 py-3 text-sm bg-[#dba577] rounded-lg hover:bg-green-600"
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
