import React, { useState } from "react";
import InputField from "../common/InputField";
import PrimaryButton from "../common/PrimaryButton";
import RadioBtn from "../common/RadioBtn";

const EmailSet = ({ onNext }) => {
  const [email, setEmail] = useState("");
  const [accountType, setAccountType] = useState("personal");

  return (
    <section className="flex flex-col items-center">
      <div className="mt-4 bg-white text-black p-3 md:p-5 rounded-2xl">
        <h1 className="text-xl font-semibold">Set Your Email</h1>
        <div>
          <h1>Account Type</h1>
          <RadioBtn
            label="Personal"
            value="personal"
            checked={accountType === "personal"}
            onChange={() => setAccountType("personal")}
          />
          <RadioBtn
            label="Business"
            value="business"
            checked={accountType === "business"}
            onChange={() => setAccountType("business")}
          />
        </div>
        <div className="mt-5 gap-3 flex flex-col">
          <InputField
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <PrimaryButton type="button" value="Next" onClick={onNext} />
        </div>
      </div>
    </section>
  );
};

export default EmailSet;
