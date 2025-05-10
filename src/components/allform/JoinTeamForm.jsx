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
import img from "../../assets/logo1.jpeg";
import StudentCheckbox from "../StudentCheckbox";

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

// Function to send form data to Cloud Function for email
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
    // Validate name, contact, email, and OTP
    if (!formData.name.trim()) {
      alert("Name is required.");
      return false;
    }
    if (!formData.contact.trim()) {
      alert("Contact number is required.");
      return false;
    }
    if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email)) {
      alert("Please enter a valid email.");
      return false;
    }
    if (!otpVerified) {
      alert("Please verify OTP before submitting.");
      return false;
    }

    // Validate role-specific fields
    if (selectedRole === "Teacher") {
      if (!formData.boards.length) {
        alert("Please select at least one board.");
        return false;
      }
      if (!formData.classes.length) {
        alert("Please select at least one class.");
        return false;
      }
      if (!formData.subjects.length) {
        alert("Please select at least one subject.");
        return false;
      }
      if (!formData.experience.trim()) {
        alert("Experience is required.");
        return false;
      }
    } else if (selectedRole === "Students / Parents") {
      if (!formData.boards.length) {
        alert("Please select at least one board.");
        return false;
      }
      if (!formData.classes.length) {
        alert("Please select at least one class.");
        return false;
      }
      if (!formData.subjects.length) {
        alert("Please select at least one subject.");
        return false;
      }
      if (!formData.level.trim()) {
        alert("Please select a level.");
        return false;
      }
    }
    return true;
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
// siodcfndwiovhwdogiwde
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
    if (!validateForm()) {
      return;
    }
    setIsLoading(true);
    try {
      // Save to Firestore
      await saveFormData();
      // Send email via Cloud Function
      await sendJoinTeamForm(formData, selectedRole, selectedCountryCode);
      alert("Form data sent successfully!");
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
        <CustomDropdown
          label="Level"
          selectedValue={formData.level}
          options={levels}
          onChange={(e) =>
            setFormData({ ...formData, level: e.target.value })
          }
        />
      </>
    ),
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto p-6">
      <img src={img} alt="logo" className="mb-6" />
      <h2 className="text-2xl font-semibold mb-4 text-center">Join Our Team</h2>
      
      <CustomInput
        type="text"
        placeholder="Name"
        value={formData.name}
        onChange={(e) =>
          setFormData({ ...formData, name: e.target.value })
        }
      />

      <div className="flex items-center gap-2">
        <CustomInput
          type="text"
          placeholder="Contact"
          value={formData.contact}
          onChange={(e) =>
            setFormData({ ...formData, contact: e.target.value })
          }
        />
        <CustomDropdown
          selectedValue={selectedCountryCode}
          options={["+91", "+1", "+44", "+61"]}
          onChange={(e) => handleCountryCodeSelect(e.target.value)}
        />
      </div>

      <CustomInput
        type="email"
        placeholder="Email"
        value={formData.email}
        onChange={(e) =>
          setFormData({ ...formData, email: e.target.value })
        }
      />

      {roleFields[selectedRole]}

      <CustomInput
        type="text"
        placeholder="Message"
        value={formData.message}
        onChange={(e) =>
          setFormData({ ...formData, message: e.target.value })
        }
      />

      {otpSent ? (
        <>
          <CustomInput
            type="text"
            placeholder="Enter OTP"
            value={formData.otp}
            onChange={(e) =>
              setFormData({ ...formData, otp: e.target.value })
            }
          />
          <CustomButton
            type="button"
            onClick={verifyOtp}
            disabled={isLoading}
            text="Verify OTP"
          />
        </>
      ) : (
        <CustomButton
          type="button"
          onClick={sendOtp}
          disabled={isLoading}
          text="Send OTP"
        />
      )}

      <CustomButton type="submit" disabled={isLoading} text="Submit" />
    </form>
  );
};

export default JoinTeamForm;
