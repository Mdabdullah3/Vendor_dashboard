import React, { useState, useRef } from "react";
import PrimaryButton from "../common/PrimaryButton";
import axios from "axios";
import { API_URL } from "../../config";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

axios.defaults.withCredentials = true;

const PasswordSet = ({ phone, onNext, otpData }) => {
  const [code, setCode] = useState(new Array(4).fill(""));
  const [hash, setHash] = useState(otpData?.data?.hash);
  const inputRefs = useRef([]);
  const navigate = useNavigate();

  const handleChange = (e, index) => {
    const { value } = e.target;
    if (isNaN(value)) return;

    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    if (value && index < 3) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handlePaste = (e) => {
    const pasteData = e.clipboardData.getData("text").slice(0, 4);
    const newCode = [...code];
    for (let i = 0; i < 4; i++) {
      newCode[i] = pasteData[i] || "";
    }
    setCode(newCode);
    inputRefs.current[Math.min(pasteData.length - 1, 3)].focus();
  };

  const handleSubmit = async () => {
    const otp = code.join("");
    try {
      // Step 1: Verify OTP
      const otpResponse = await axios.post(
        `${API_URL}/auth/verify-otp`,
        {
          phone,
          otp,
          role: "vendor",
          hash,
        },
        { withCredentials: true }
      );
      // Save user data from OTP verification
      localStorage.setItem("user", JSON.stringify(otpResponse.data.data));
      toast.success(otpResponse.data.message);

      // Step 2: Login the user
      const registerFields = {
        email: otpResponse.data.data.phone,
        password: otpResponse.data.data.password,
      };

      const registerResponse = await axios.post(
        `${API_URL}/auth/login`,
        registerFields,
      );
      navigate("/profile");
    } catch (error) {
      // Handle errors from either request
      if (error.response?.data?.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("An unexpected error occurred. Please try again.");
      }
      console.error(error);
    }
  };

  const handleResendOTP = async () => {
    try {
      const response = await axios.post(
        `${API_URL}/auth/send-otp`,
        { phone },
        { withCredentials: true }
      );
      toast.success("OTP resent successfully!");
      console.log(response.data);
      setHash(response?.data?.data?.hash);
    } catch (error) {
      toast.error("Failed to resend OTP. Please try again.");
      console.error("Failed to resend OTP", error);
    }
  };

  return (
    <section className="">
      <h1 className="text-xl font-semibold">Enter The Code</h1>
      <p className="text-gray-600 text-[14px]">
        Enter the 4-digit code sent to {phone} via SMS.
      </p>
      <div className="mt-4 flex justify-center gap-2">
        {code.map((digit, index) => (
          <input
            key={index}
            ref={(el) => (inputRefs.current[index] = el)}
            type="text"
            maxLength="1"
            value={digit}
            onChange={(e) => handleChange(e, index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            onPaste={handlePaste}
            className="w-12 h-12 text-center text-2xl border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
          />
        ))}
      </div>
      <p className="text-center pt-3">
        Didn't receive the code?{" "}
        <span onClick={handleResendOTP} className="text-primary cursor-pointer">
          Resend
        </span>
      </p>
      <div className="mt-5 gap-3 flex flex-col">
        <PrimaryButton type="button" value="Next" onClick={handleSubmit} />
      </div>
    </section>
  );
};

export default PasswordSet;
