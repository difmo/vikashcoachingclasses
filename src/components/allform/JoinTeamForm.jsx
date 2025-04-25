import React, { useState } from "react";
import CustomButton from "../CustomButton";
import CustomInput from "../CustomInput";
import CustomCheckbox from "../CustomCheckbox";

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
    <div className=" py-10 px-4">
      <div className="max-w-5xl mx-auto shadow-xl bg-white rounded-3xl overflow-hidden">
        <div className="flex flex-col lg:flex-row">
          {/* Left Section (Info / Description) */}
          <div className="lg:w-1/2 bg-secondary/10 text-black p-8 hidden lg:flex flex-col justify-center">
            <h2 className="text-3xl font-bold mb-4">Join Our Educator Team</h2>
            <p className="text-lg">
              Help shape the future by sharing your knowledge. Fill in the form
              and become a part of our growing network of educators.
            </p>
          </div>

          {/* Right Section (Form) */}
          <div className="w-full lg:w-1/2 p-8">
            <h2 className="text-2xl sm:text-3xl font-semibold text-center text-gradient-primary mb-6">
              Kindly Fill the Form
            </h2>

            <form
              onSubmit={handleSubmit}
              className="space-y-5 max-w-xl mx-auto"
            >
              <CustomInput
                type="text"
                label="Name"
                placeholder="Name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                required
              />

              <CustomInput
                label="Class"
                type="text"
                placeholder="Class (e.g. 7 to Dropper)"
                value={formData.class}
                onChange={(e) =>
                  setFormData({ ...formData, class: e.target.value })
                }
                required
              />

              {/* Subjects */}
              <div>
                <label className="block font-semibold mb-2 text-gray-700">
                  Subjects
                </label>
                <div className="flex flex-wrap gap-3">
                  {subjects.map((sub) => (
                    <label
                      key={sub}
                      className="flex items-center gap-2 text-sm"
                    >
                      <CustomCheckbox
                        onChange={() => toggleSelection("subjects", sub)}
                        checked={formData.subjects.includes(sub)}
                      />
                      {sub}
                    </label>
                  ))}
                </div>
              </div>

              {/* Boards */}
              <div>
                <label className="block font-semibold mb-2 text-gray-700">
                  Boards
                </label>
                <div className="flex flex-wrap gap-3">
                  {boards.map((board) => (
                    <label
                      key={board}
                      className="flex items-center gap-2 text-sm"
                    >
                      <CustomCheckbox
                        onChange={() => toggleSelection("boards", board)}
                        checked={formData.boards.includes(board)}
                      />
                      {board}
                    </label>
                  ))}
                </div>
              </div>

              {/* Exams */}
              <div>
                <label className="block font-semibold mb-2 text-gray-700">
                  Exams
                </label>
                <div className="flex flex-wrap gap-3">
                  {exams.map((exam) => (
                    <label
                      key={exam}
                      className="flex items-center gap-2 text-sm"
                    >
                      <CustomCheckbox
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
                placeholder="Experience (in years)"
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

              {/* OTP Section */}
              <div className="flex flex-col sm:flex-row items-center gap-3">
                <CustomButton
                  type="button"
                  label="  Send OTP"
                  onClick={sendOtp}
                  className=" px-4 py-2 rounded-lg"
                />

                <CustomInput
                  type="text"
                  placeholder="Enter OTP"
                  className="sm:w-32 w-full"
                  value={formData.otp}
                  onChange={(e) =>
                    setFormData({ ...formData, otp: e.target.value })
                  }
                />
                <CustomButton
                  type="button"
                  label="  Verify"
                  onClick={verifyOtp}
                  className="bg-green-500 text- px-4 py-2 rounded-lg hover:bg-indigo-200 transition-all"
                />
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
                className="w-full bg-secondary text-white hover:bg-primary transition-all py-2 rounded-xl"
              />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JoinTeamForm;
