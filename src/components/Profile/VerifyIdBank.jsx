import React, { useEffect, useState } from "react";
import InputFileUpload from "../common/InputFileUpload";
import IdCardFront from "../../assets/IdFront.jpg";
import IdCardBack from "../../assets/IdBack.jpg";
import InputField from "../common/InputField";
import Select from "react-select";
import PrimaryButton from "../common/PrimaryButton";

const VerifyIdBank = ({
  setSelectedIdCard,
  setIdCardBackSide,
  idCardNumber,
  setIdCardNumber,
  setBankStatement,
  accountHolderName,
  setAccountHolderName,
  accountNumber,
  setAccountNumber,
  routingNumber,
  setRoutingNumber,
  bankName,
  setBankName,
  bankBranch,
  setBankBranch,
  handleNextStep,
}) => {
  const [bankOption, setBankOption] = useState([]);
  useEffect(() => {
    const fetchBanks = async () => {
      const response = await fetch("bankData.json");
      const data = await response.json();
      setBankOption(data);
    };
    fetchBanks();
  }, []);
  return (
    <section>
      <h1 className="text-xl font-semibold">Id and Bank Account Information</h1>
      <p className="text-gray-500 mt-3">
        Let us know about your bank Information, don't worry we will keep this
        information private
      </p>
      <h1 className="text-md font-medium mt-4 mb-2">
        Verify Identification Card
      </h1>
      <div className="flex flex-col gap-3">
        <InputFileUpload
          setSelectedFile={setSelectedIdCard}
          label={"Id Card Front Side"}
          image={IdCardFront}
        />
        <InputFileUpload
          setSelectedFile={setIdCardBackSide}
          label={"Id Card Back Side"}
          image={IdCardBack}
        />
        <InputField
          value={idCardNumber}
          placeholder={"Id Card Number"}
          onChange={(e) => setIdCardNumber(e.target.value)}
        />
      </div>
      <div className="mt-5">
        <h1 className="text-lg font-medium">Bank Account Information</h1>
        <div className="flex flex-col gap-3">
          <InputFileUpload
            setSelectedFile={setIdCardBackSide}
            label={
              "Upload the front page of your Bank Book/Statement Cheque Copy Mobile Banking Screenshot"
            }
          />
          <InputField
            value={accountHolderName}
            placeholder={"Account Holder Name"}
            onChange={(e) => setAccountHolderName(e.target.value)}
          />
          <InputField
            value={accountNumber}
            placeholder={"Account Number"}
            onChange={(e) => setAccountNumber(e.target.value)}
          />
          <InputField
            value={routingNumber}
            placeholder={"Routing Number"}
            onChange={(e) => setRoutingNumber(e.target.value)}
          />
          <Select
            id="bankName"
            options={bankOption?.map((bank) => ({
              value: bank.BankName,
              label: bank.BankName,
            }))}
            value={bankName}
            onChange={(selectedOption) => setBankName(selectedOption)}
            placeholder="Select Bank"
          />
          <InputField
            value={bankBranch}
            placeholder={"Bank Branch"}
            onChange={(e) => setBankBranch(e.target.value)}
          />
        </div>
        <div className="mt-5">
          <PrimaryButton value={"Next"} onClick={handleNextStep} />
        </div>
      </div>
    </section>
  );
};

export default VerifyIdBank;
