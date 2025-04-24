import React, { useState } from "react";
import CustomInput from "../components/CustomInput";
import CustomCheckbox from "../components/CustomCheckbox";
import CustomButton from "../components/CustomButton";

const boards = ["CBSE", "ICSE", "ISC", "IB", "IGCSE", "State"];
const subjects = ["Phy", "Chem", "Bio", "Maths"];
const exams = ["NEET", "IIT-JEE"];

const JoinTeamForm = () => {
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    class: "",
    subjects: [],
    boards: [],
    exams: [],
    experience: "",
    contact: "",
    otp: "",
    resume: null,
  });

  const toggleSelection = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: prev[field].includes(value)
        ? prev[field].filter((v) => v !== value)
        : [...prev[field], value],
    }));
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, resume: e.target.files[0] });
  };

  const sendOtp = () => {
    setOtpSent(true);
    alert("OTP sent to " + formData.contact);
  };

  const verifyOtp = () => {
    if (formData.otp === "1234") {
      setOtpVerified(true);
      alert("OTP verified");
    } else {
      alert("Incorrect OTP");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!otpVerified) return alert("Please verify OTP before submitting");
    console.log(formData);
    alert("Form submitted successfully");
  };

  return (
    <div className="max-w-xl mx-auto px-4 sm:px-6 lg:px-8 py-8 bg-white text-black rounded-xl shadow-md">
      <h2 className="text-2xl sm:text-3xl font-semibold text-center mb-6">
        Kindly Fill the Form
      </h2>
      <form onSubmit={handleSubmit} className="space-y-5">
        <CustomInput
          type="text"
          label="Name"
          placeholder="Name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
        />

        <CustomInput
          label="Class"
          type="text"
          placeholder="Class (e.g. 7 to Dropper)"
          value={formData.class}
          onChange={(e) => setFormData({ ...formData, class: e.target.value })}
          required
        />

        <div>
          <label className="block font-medium mb-1">Subjects</label>
          <div className="flex flex-wrap gap-3">
            {subjects.map((sub) => (
              <label key={sub} className="flex items-center gap-2">
                <CustomCheckbox
                  type="checkbox"
                  onChange={() => toggleSelection("subjects", sub)}
                  checked={formData.subjects.includes(sub)}
                />
                {sub}
              </label>
            ))}
          </div>
        </div>

        <div>
          <label className="block font-medium mb-1">Boards</label>
          <div className="flex flex-wrap gap-3">
            {boards.map((board) => (
              <label key={board} className="flex items-center gap-2">
                <CustomCheckbox
                  type="checkbox"
                  onChange={() => toggleSelection("boards", board)}
                  checked={formData.boards.includes(board)}
                />
                {board}
              </label>
            ))}
          </div>
        </div>

        <div>
          <label className="block font-medium mb-1">Exams</label>
          <div className="flex flex-wrap gap-3">
            {exams.map((exam) => (
              <label key={exam} className="flex items-center gap-2">
                <CustomCheckbox
                  type="checkbox"
                  onChange={() => toggleSelection("exams", exam)}
                  checked={formData.exams.includes(exam)}
                />
                {exam}
              </label>
            ))}
          </div>
        </div>

        <CustomInput
          type="text"
          placeholder="Experience"
          value={formData.experience}
          onChange={(e) =>
            setFormData({ ...formData, experience: e.target.value })
          }
        />

        <CustomInput
          type="tel"
          placeholder="Contact Number"
          value={formData.contact}
          onChange={(e) =>
            setFormData({ ...formData, contact: e.target.value })
          }
          required
        />

        <div className="flex flex-col sm:flex-row sm:items-center gap-3">
          <button
            type="button"
            onClick={sendOtp}
            className="btn sm:w-auto w-full bg-gray-200"
          >
            Send OTP
          </button>
          <CustomInput
            type="text"
            placeholder="Enter OTP"
            className="sm:w-32 w-full"
            value={formData.otp}
            onChange={(e) => setFormData({ ...formData, otp: e.target.value })}
          />
          <button
            type="button"
            onClick={verifyOtp}
            className="btn sm:w-auto w-full bg-gray-200"
          >
            Verify OTP
          </button>
        </div>

        <CustomInput
          type="file"
          accept="application/pdf"
          onChange={handleFileChange}
          required
        />

        <CustomButton
          type="submit"
          label="Submit"
          className="btn w-full bg-blue-600 text-white"
        />
      </form>
    </div>
  );
};

export default JoinTeamForm;
