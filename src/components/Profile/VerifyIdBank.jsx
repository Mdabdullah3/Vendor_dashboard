import React, { useEffect, useState } from "react";
import InputFileUpload from "../common/InputFileUpload";
import InputField from "../common/InputField";
import PrimaryButton from "../common/PrimaryButton";
import axios from "axios";
import { API_URL } from "../../config";
import { toast } from "react-toastify";
import Select from "react-select";

const VerifyIdBank = ({ formData, handleChange }) => {
  const [selectedBank, setSelectedBank] = useState(null);
  const [bankOption, setBankOption] = useState([]);
  useEffect(() => {
    const fetchBanks = async () => {
      const response = await fetch("bankData.json");
      const data = await response.json();
      setBankOption(data);
    };
    fetchBanks();
  }, []);
  const getImagePreviewUrl = (file) => {
    if (file && (file instanceof File || file instanceof Blob)) {
      return URL.createObjectURL(file);
    }
    return null;
  };
  const getBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };
  const handleSubmit = async (e) => {
    console.log(formData);
    e.preventDefault();
    const idCardFrontBase64 = await getBase64(formData.idCardFrontPageImage);
    const idCardBackBase64 = await getBase64(formData.idCardBackPageImage);
    const bankStatementBase64 = await getBase64(formData.bankStatementImage);
    const avatarBase64 = await getBase64(formData.avatar);
    const payload = {
      ...formData,
      idCardFrontPageImage: idCardFrontBase64,
      idCardBackPageImage: idCardBackBase64,
      bankStatementImage: bankStatementBase64,
      avatar: avatarBase64,
    };
    try {
      const response = await axios.patch(`${API_URL}/users/me`, payload, {
        withCredentials: true,
      });
      toast.success("Profile Update Successfully");
      console.log(response);
    } catch (error) {
      toast.error(error.response?.data?.message);
    }
    console.log(payload);
  };

  const handleBankChange = (bank) => {
    setSelectedBank(bank);
    handleChange("bankName", bank.label);
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
          setSelectedFile={(file) => handleChange("idCardFrontPageImage", file)}
          label={"ID Card Front Side"}
          image={getImagePreviewUrl(formData.idCardFrontPageImage)}
        />
        <h1>Upload ID Card Back Side</h1>
        <InputFileUpload
          setSelectedFile={(file) => handleChange("idCardBackPageImage", file)}
          label={"ID Card Back Side"}
          image={getImagePreviewUrl(formData.idCardBackPageImage)}
        />
        <h1>Bank Information</h1>
        <InputFileUpload
          setSelectedFile={(file) => handleChange("bankStatementImage", file)}
          label={"Bank Statement"}
          image={getImagePreviewUrl(formData.bankStatementImage)}
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
        <Select
          id="bankName"
          options={bankOption?.map((bank) => ({
            value: bank.BankName,
            label: bank.BankName,
          }))}
          value={selectedBank}
          onChange={handleBankChange}
          placeholder="Select Bank"
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
