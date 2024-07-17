import React from "react";
import InputFileUpload from "../common/InputFileUpload";
import InputField from "../common/InputField";
import PrimaryButton from "../common/PrimaryButton";

const PersonalDetails = ({
  setPhone,
  setEmail,
  setPassword,
  setConfirmPassword,
  setName,
  setAvatar,
  setCoverPhoto,
  name,
  phone,
  email,
  password,
  confirmPassword,
  handleNextStep,
}) => {
  return (
    <section>
      <h1 className="text-xl font-semibold my-2">
        Update Your Personal Information
      </h1>
      <div>
        <h1 className="my-2">Upload Your Brand Photo</h1>
        <InputFileUpload setSelectedFile={setAvatar} label={"Brand Logo"} />
        <h2 className="my-2">Upload Your Brand Cover Photo</h2>
        <InputFileUpload
          setSelectedFile={setCoverPhoto}
          label={"Brand Cover Photo"}
        />
      </div>
      <div className="w-10/12 mt-4 space-y-3">
        <InputField
          label={"Brand Name"}
          value={name}
          onChange={setName}
          placeholder="Enter Your Brand Name"
        />
        <InputField
          label={"Email Address"}
          value={email}
          onChange={setEmail}
          placeholder="Enter Your Email"
        />
        <InputField
          label={"Phone Number"}
          value={phone}
          onChange={setPhone}
          placeholder="Enter Your Phone"
        />
        <InputField
          label={"Password"}
          value={password}
          onChange={setPassword}
          placeholder="Enter Your Password"
          type="password"
        />
        <InputField
          label={"Confirm Password"}
          value={confirmPassword}
          onChange={setConfirmPassword}
          placeholder="Enter Your Confirm Password"
          type="password"
        />
        <PrimaryButton value={"Next"} onClick={handleNextStep} />
      </div>
    </section>
  );
};

export default PersonalDetails;
