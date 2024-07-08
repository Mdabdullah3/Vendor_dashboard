import React, { useState, useRef } from "react";
import PrimaryButton from "../common/PrimaryButton";
import axios from "axios";
import { API_URL } from "../../config";
import useAuthStore from "../../store/useAuthStore";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const PasswordSet = ({ phone, onNext, otpData }) => {
  const [code, setCode] = useState(new Array(4).fill(""));
  // const [password, setPassword] = useState("");
  // const [confirmPassword, setConfirmPassword] = useState("");
  // const [referalCode, setReferalCode] = useState("");
  const inputRefs = useRef([]);
  const setUser = useAuthStore((state) => state.setUser);
  console.log(otpData);
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
    const hash = otpData?.data?.hash;

    try {
      const response = await axios.post(`${API_URL}/auth/verify-otp`, {
        phone,
        otp,
        hash,
      });
      const user = response.data.data;
      console.log(user);
      setUser(user);
      toast.success(response.data.message);
      navigate("/admin");
    } catch (error) {
      toast.error(error.response.data.message);
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
        <span className="text-primary cursor-pointer">Resend</span>
      </p>
      <div className="mt-5 gap-3 flex flex-col">
        {/* <InputField
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <InputField
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        <InputField
          type="text"
          placeholder="Enter Referal Code"
          value={referalCode}
          onChange={(e) => setReferalCode(e.target.value)}
          required
        /> */}
        <PrimaryButton type="button" value="Next" onClick={handleSubmit} />
      </div>
    </section>
  );
};

export default PasswordSet;
