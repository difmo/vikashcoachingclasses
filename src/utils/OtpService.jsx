// src/utils/otpService.js
import axios from "axios";

const baseUrl = "https://smsapi.edumarcsms.com/api/v1/sendsms";
const apiKey = "0b305d9a779d4d6ab2bcdd4af249344a";
const senderId = "EDUMRC";
const templateId = "1707168926925165526";

// Generate a 6-digit OTP
export const generateOtp = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};


// Send OTP via Edumarc SMS API
export const sendOtp = async (phoneNumber) => {
  try {
    console.log("sendign otp")
    const otp = generateOtp();
    console.log(otp);
    const message = `OTP for P.C.M.B. Tutors for verification is: ${otp}. OTP is confidential, refrain from sharing it with anyone. By P.C.M.B. Tutors`;

    console.log(message);

    const params = {
      apikey: apiKey,
      senderId: senderId,
      message: message,
      number: phoneNumber,
      templateId: templateId,
    };

    const response = await axios.get(baseUrl, { params });
    console.log(response);

    if (response.status === 200 && response.data.success === true) {
      return {
        success: true,
        otp, // we return it for later frontend verification
        transactionId: response.data.data.transactionId,
        message: response.data.data.msg,
      };
    } else {
      return {
        success: false,
        error: response.data.data?.msg || "Failed to send OTP",
      };
    }
  } catch (err) {
    return { success: false, error: err.message };
  }
};
