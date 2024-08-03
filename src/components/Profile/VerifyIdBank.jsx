import React from "react";
import InputFileUpload from "../common/InputFileUpload";
import InputField from "../common/InputField";
import PrimaryButton from "../common/PrimaryButton";
import axios from "axios";
import { API_URL } from "../../config";
import { toast } from "react-toastify";

const VerifyIdBank = ({ formData, handleChange }) => {
  const getImagePreviewUrl = (file) => {
    if (file && (file instanceof File || file instanceof Blob)) {
      return URL.createObjectURL(file);
    }
    return null;
  };
  const handleSubmit = async (e) => {
    console.log(formData);
    e.preventDefault();
    try {
      const response = await axios.patch(`${API_URL}/users/me`, formData, {
        withCredentials: true,
      });
      toast.success("Profile Update Successfully");
      console.log(response);
    } catch (error) {
      toast.error(error.response?.data?.message);
    }
  };
  return (
    <section>
      <h1 className="text-xl font-semibold my-2">Verify ID & Bank Details</h1>
      <div className="space-y-3">
        <InputField
          label={"ID Card Number"}
          value={formData.idCardNumber}
          onChange={(e) => handleChange("idCardNumber", e.target.value)}
          placeholder="Enter Your ID Card Number"
        />
        <h1>Upload ID Card Front Side</h1>
        <InputFileUpload
          setSelectedFile={(file) => handleChange("idCardFrontSide", file)}
          label={"ID Card Front Side"}
          image={getImagePreviewUrl(formData.idCardFrontSide)}
        />
        <h1>Upload ID Card Back Side</h1>
        <InputFileUpload
          setSelectedFile={(file) => handleChange("idCardBackSide", file)}
          label={"ID Card Back Side"}
          image={getImagePreviewUrl(formData.idCardBackSide)}
        />
        <h1>Bank Information</h1>
        <InputFileUpload
          setSelectedFile={(file) => handleChange("bankStatement", file)}
          label={"Bank Statement"}
          image={getImagePreviewUrl(formData.bankStatement)}
        />
        <InputField
          label={"Account Holder Name"}
          value={formData.accountHolderName}
          onChange={(e) => handleChange("accountHolderName", e.target.value)}
          placeholder="Enter Your Account Holder Name"
        />
        <InputField
          label={"Account Number"}
          value={formData.accountNumber}
          onChange={(e) => handleChange("accountNumber", e.target.value)}
          placeholder="Enter Your Account Number"
        />
        <InputField
          label={"Routing Number"}
          value={formData.routingNumber}
          onChange={(e) => handleChange("routingNumber", e.target.value)}
          placeholder="Enter Your Routing Number"
        />
        <InputField
          label={"Bank Name"}
          value={formData.bankName}
          onChange={(e) => handleChange("bankName", e.target.value)}
          placeholder="Enter Your Bank Name"
        />
        <InputField
          label={"Bank Branch"}
          value={formData.bankBranch}
          onChange={(e) => handleChange("bankBranch", e.target.value)}
          placeholder="Enter Your Bank Branch"
        />
        <PrimaryButton value={"Submit"} onClick={handleSubmit} />
      </div>
    </section>
  );
};

export default VerifyIdBank;
