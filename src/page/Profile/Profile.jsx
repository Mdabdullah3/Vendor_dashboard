import React, { useState } from "react";
import { FaDatabase, FaRegAddressCard } from "react-icons/fa";
import { MdArrowBackIos } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { RiBankCardLine } from "react-icons/ri";
import Addresset from "../../components/Profile/Addresset";
import VerifyIdBank from "../../components/Profile/VerifyIdBank";
import ProductSet from "../../components/Profile/ProductSet";
import Navbar from "../../layout/Navbar";

const Profile = () => {
  const [activeStep, setActiveStep] = useState(1);
  const [selectedDistrict, setSelectedDistrict] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);
  const [detailAddress, setDetailAddress] = useState("");
  const [returnAddress, setReturnAddress] = useState(true);
  // verify id and Bank
  const [idCardFrontSide, setSelectedIdCard] = useState(null);
  const [idCardBackSide, setIdCardBackSide] = useState(null);
  const [idCardNumber, setIdCardNumber] = useState("");
  const [bankStatement, setBankStatement] = useState(null);
  const [accountHolderName, setAccountHolderName] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [routingNumber, setRoutingNumber] = useState("");
  const [bankName, setBankName] = useState("");
  const [bankBranch, setBankBranch] = useState("");

  const menu = [
    { label: "Profile", icon: <CgProfile /> },
    { label: "Address", icon: <FaRegAddressCard /> },
    { label: "Verify ID & Bank", icon: <RiBankCardLine /> },
    { label: "Add Product", icon: <FaDatabase /> },
  ];

  const handleStepClick = (step) => {
    setActiveStep(step);
  };

  const handleNextStep = () => {
    setActiveStep((prevStep) =>
      prevStep + 1 < menu.length ? prevStep + 1 : prevStep
    );
  };
  const handlePreviousStep = () => {
    setActiveStep((prevStep) => (prevStep > 0 ? prevStep - 1 : prevStep));
  };

  return (
    <section className="">
      <Navbar />
      <div className="p-5 w-10/12 mx-auto">
        <div>
          {activeStep > 0 && (
            <h1
              className="flex items-center gap-2 mb-4 cursor-pointer"
              onClick={handlePreviousStep}
            >
              <MdArrowBackIos /> Back
            </h1>
          )}
        </div>
        <div className="">
          <div className="mx-4 p-4">
            <div className="flex items-center">
              {menu.map((item, index) => (
                <React.Fragment key={index}>
                  <div
                    className={`flex items-center relative ${
                      activeStep === index ? "text-primary" : "text-gray-400"
                    }`}
                  >
                    <div
                      className={`rounded-full transition duration-500 ease-in-out h-12 w-12 py-3 border-2 flex justify-center cursor-pointer ${
                        activeStep === index
                          ? "border-primary bg-primary text-white"
                          : "border-gray-400"
                      }`}
                      onClick={() => handleStepClick(index)}
                    >
                      {item.icon}
                    </div>
                    <div
                      className={`absolute top-0 -ml-10 text-center mt-16 w-32 text-xs font-medium uppercase ${
                        activeStep === index ? "text-primary" : "text-gray-500"
                      }`}
                    >
                      {item.label}
                    </div>
                  </div>
                  {index < menu.length - 1 && (
                    <div
                      className={`flex-auto border-t-2 transition duration-500 ease-in-out ${
                        activeStep >= index + 1
                          ? "border-primary"
                          : "border-gray-300"
                      }`}
                    ></div>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
          <h1 className="mt-10">
            Please complete the todo as soon as possible, then start your
            business journey.
          </h1>
        </div>

        <form className="mt-6">
          {activeStep === 1 && (
            <Addresset
              handleNextStep={handleNextStep}
              setSelectedCity={setSelectedCity}
              selectedDistrict={selectedDistrict}
              setSelectedDistrict={setSelectedDistrict}
              setDetailAddress={setDetailAddress}
              detailAddress={detailAddress}
              setReturnAddress={setReturnAddress}
              returnAddress={returnAddress}
            />
          )}
          {activeStep === 2 && (
            <VerifyIdBank
              handleNextStep={handleNextStep}
              setSelectedIdCard={setSelectedIdCard}
              setIdCardBackSide={setIdCardBackSide}
              idCardNumber={idCardNumber}
              setIdCardNumber={setIdCardNumber}
              setBankStatement={setBankStatement}
              accountHolderName={accountHolderName}
              setAccountHolderName={setAccountHolderName}
              accountNumber={accountNumber}
              setAccountNumber={setAccountNumber}
              routingNumber={routingNumber}
              setRoutingNumber={setRoutingNumber}
              bankName={bankName}
              setBankName={setBankName}
              bankBranch={bankBranch}
              setBankBranch={setBankBranch}
            />
          )}
          {activeStep === 3 && <ProductSet />}
        </form>
      </div>
    </section>
  );
};

export default Profile;
