import React, { useState, useRef } from "react";
import PrimaryButton from "../common/PrimaryButton";
import InputField from "../common/InputField";

const PasswordSet = ({ onNext }) => {
  const [code, setCode] = useState(new Array(6).fill(""));
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [referalCode, setReferalCode] = useState("");
  const inputRefs = useRef([]);

  const handleChange = (e, index) => {
    const { value } = e.target;
    if (isNaN(value)) return; // Only allow digits

    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    // Move to next input if not the last one
    if (value && index < 5) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handlePaste = (e) => {
    const pasteData = e.clipboardData.getData("text").slice(0, 6);
    const newCode = [...code];
    for (let i = 0; i < 6; i++) {
      newCode[i] = pasteData[i] || "";
    }
    setCode(newCode);
    inputRefs.current[Math.min(pasteData.length - 1, 5)].focus();
  };

  return (
    <section className="">
      <h1 className="text-xl font-semibold">Enter The Code</h1>
      <p className="text-gray-600 text-[14px]">
        Enter the 6-digit code sent to {"0123456789"} via SMS.
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
        <InputField
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
        />
        <PrimaryButton type="button" value="Next" onClick={onNext} />
      </div>
    </section>
  );
};

export default PasswordSet;
