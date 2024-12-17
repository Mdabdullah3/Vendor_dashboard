import React, { useEffect, useState } from "react";
import InputFileUpload from "../common/InputFileUpload";
import InputField from "../common/InputField";
import PrimaryButton from "../common/PrimaryButton";
import { toast } from "react-toastify";
import Select from "react-select";
import { useNavigate } from "react-router-dom";
import useUserStore from "../../store/AuthStore";

const VerifyIdBank = ({ formData, handleChange }) => {
  const { user, fetchUser, updateUser } = useUserStore();
  const [selectedBank, setSelectedBank] = useState(null);
  const [bankOption, setBankOption] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    fetchUser();
    const fetchBanks = async () => {
      const response = await fetch("bankData.json");
      const data = await response.json();
      setBankOption(data);
    };
    fetchBanks();
  }, [fetchUser]);
  console.log(user);

  const getImagePreviewUrl = (file) => {
    if (file && (file instanceof File || file instanceof Blob)) {
      return URL.createObjectURL(file);
    }
    return null;
  };
  const getBase64 = (file) => {
    return new Promise((resolve, reject) => {
      if (!(file instanceof File || file instanceof Blob)) {
        return reject(new Error("Invalid file"));
      }

      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.avatar === null || undefined) {
      toast.error("Please Upload Your Brand Image");
      return;
    }
    setLoading(true);
    try {
      const idCardFrontBase64 = formData.idCardFrontPageImage
        ? await getBase64(formData.idCardFrontPageImage)
        : null;
      const idCardBackBase64 = formData.idCardBackPageImage
        ? await getBase64(formData.idCardBackPageImage)
        : null;
      const bankStatementBase64 = formData.bankStatementImage
        ? await getBase64(formData.bankStatementImage)
        : null;
      const avatarBase64 = formData.avatar
        ? await getBase64(formData.avatar)
        : null;

      const payload = {
        ...formData,
        location: {
          state: formData.selectedDistrict,
          city: formData.selectedCity,
          address1: formData.detailAddress,
        },
        idCardFrontPageImage: idCardFrontBase64,
        idCardBackPageImage: idCardBackBase64,
        bankStatementImage: bankStatementBase64,
        avatar: avatarBase64,
      };

      updateUser(payload, navigate);
      setLoading(false);
    } catch (error) {
      toast.error(error.message || "An error occurred while uploading files.");
      console.log(error);
    }
  };

  const handleBankChange = (bank) => {
    setSelectedBank(bank);
    handleChange("bankName", bank.label);
  };
  // const handleSkip = () => {
  //   navigate("/admin");
  // };
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
        <PrimaryButton
          value={loading ? "Loading..." : "Submit"}
          disabled={loading}
          onClick={handleSubmit}
        />
        {/* <PrimaryButton value="Skip" onClick={handleSkip} /> */}
      </div>
    </section>
  );
};

export default VerifyIdBank;
