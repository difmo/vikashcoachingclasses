import React, { useState, useEffect } from "react";
import { initializeApp, getApps } from "firebase/app";
import {
  getAuth,
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from "firebase/auth";

// Firebase config
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const Demo = () => {
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [confirmationResult, setConfirmationResult] = useState(null);
  const [userId, setUserId] = useState("");

  useEffect(() => {
    // Initialize recaptchaVerifier on component mount
    window.recaptchaVerifier = new RecaptchaVerifier("recaptcha-container", {
      size: "invisible", // Invisible reCAPTCHA
      callback: (response) => {
        console.log("reCAPTCHA solved");
      },
      auth, // Firebase auth instance
    });
  }, []);

  // Function to handle sending OTP
  const handleSendOtp = async () => {
    if (!phone) return alert("Please enter a phone number");

    try {
      const fullPhone = "+91" + phone; // Assuming it's an Indian phone number
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

  // Function to handle OTP verification
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
  