import React from "react";
import InputFileUpload from "../common/InputFileUpload";
import InputField from "../common/InputField";
import PrimaryButton from "../common/PrimaryButton";

const PersonalDetails = ({ formData, handleChange, handleNextStep }) => {
  // Function to get Object URL if valid File or Blob
  const getImagePreviewUrl = (file) => {
    if (file && (file instanceof File || file instanceof Blob)) {
      return URL.createObjectURL(file);
    }
    return null;
  };

  return (
    <section>
      <h1 className="text-xl font-semibold my-2">
        Update Your Personal Information
      </h1>
      <div>
        <h1 className="my-2">Upload Your Brand Photo</h1>
        <InputFileUpload
          setSelectedFile={(file) => handleChange("avatar", file)}
          label={"Brand Logo"}
          image={getImagePreviewUrl(formData.avatar)}
        />

        <h2 className="my-2">Upload Your Brand Cover Photo</h2>
        <InputFileUpload
          setSelectedFile={(file) => handleChange("coverPhoto", file)}
          label={"Brand Cover Photo"}
          image={getImagePreviewUrl(formData.coverPhoto)}
        />
      </div>
      <div className="w-10/12 mt-4 space-y-3">
        <InputField
          label={"Brand Name"}
          value={formData.name}
          required
          onChange={(e) => handleChange("name", e.target.value)}
          placeholder="Enter Your Brand Name"
        />
        <InputField
          label={"Email Address"}
          required
          value={formData.email}
          onChange={(e) => handleChange("email", e.target.value)}
          placeholder="Enter Your Email"
        />
        <InputField
          label={"Phone Number"}
          required
          value={formData.phone}
          onChange={(e) => handleChange("phone", e.target.value)}
          placeholder="Enter Your Phone"
        />
        <InputField
          label={"Password"}
          required
          value={formData.password}
          onChange={(e) => handleChange("password", e.target.value)}
          placeholder="Enter Your Password"
          type="password"
        />
        <InputField
          label={"Confirm Password"}
          required
          value={formData.confirmPassword}
          onChange={(e) => handleChange("confirmPassword", e.target.value)}
          placeholder="Enter Your Confirm Password"
          type="password"
        />
        <PrimaryButton value={"Next"} onClick={handleNextStep} />
      </div>
    </section>
  );
};

export default PersonalDetails;
