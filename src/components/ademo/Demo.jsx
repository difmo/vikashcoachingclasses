// src/components/Demo.jsx
import React, { useState, useEffect } from "react";
import { auth } from "../../Firebase"; // Adjust the path if needed
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";

const Demo = () => {
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [confirmationResult, setConfirmationResult] = useState(null);
  const [userId, setUserId] = useState("");

  useEffect(() => {
    if (!window.recaptchaVerifier && auth) {
      window.recaptchaVerifier = new RecaptchaVerifier(
        "recaptcha-container",
        {
          size: "invisible",
          callback: (response) => {
            console.log("reCAPTCHA solved");
          },
        },
        auth
      );
    }
  }, []);

  const handleSendOtp = async () => {
    if (!phone) return alert("Please enter a phone number");

    try {
      const fullPhone = "+91" + phone; // You can change country code as needed
      const result = await signInWithPhoneNumber(
        auth,
        fullPhone,
        window.recaptchaVerifier
      );
      setConfirmationResult(result);
      alert("OTP sent successfully!");
    } catch (error) {
      console.error("Error sending OTP:", error);
      alert("Failed to send OTP: " + error.message);
    }
  };

  const handleVerifyOtp = async () => {
    if (!otp || !confirmationResult) return alert("Enter OTP");

    try {
      const result = await confirmationResult.confirm(otp);
      setUserId(result.user.uid);
      alert("Phone number verified successfully!");
    } catch (error) {
      console.error("Error verifying OTP:", error);
      alert("Invalid OTP: " + error.message);
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto space-y-4">
      <h1 className="text-xl font-semibold">📱 Firebase Phone Auth</h1>

      <input
        type="text"
        placeholder="Enter phone number"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        className="border px-3 py-2 w-full"
      />
      <button
        onClick={handleSendOtp}
        className="bg-blue-600 text-white px-4 py-2 w-full rounded"
      >
        Send OTP
      </button>

      {confirmationResult && (
        <>
          <input
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            className="border px-3 py-2 w-full"
          />
          <button
            onClick={handleVerifyOtp}
            className="bg-green-600 text-white px-4 py-2 w-full rounded"
          >
            Verify OTP
          </button>
        </>
      )}

      {/* Invisible reCAPTCHA */}
      <div id="recaptcha-container"></div>

      {userId && (
        <p className="mt-4 text-green-700 font-semibold">
          ✅ User ID: {userId}
        </p>
      )}
    </div>
  );
};

export default Demo;
