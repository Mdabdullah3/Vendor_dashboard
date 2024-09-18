import React, { useEffect, useState } from "react";
import { FaRegAddressCard } from "react-icons/fa";
import { MdArrowBackIos } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { RiBankCardLine, RiLockPasswordFill } from "react-icons/ri";
import Addresset from "../../components/Profile/Addresset";
import VerifyIdBank from "../../components/Profile/VerifyIdBank";
// import ProductSet from "../../components/Profile/ProductSet";
import Navbar from "../../layout/Navbar";
import PersonalDetails from "../../components/Profile/PersonalDetails";
import useAuthStore from "../../store/AuthStore";
import { SERVER } from "../../config";
import UpdatePassword from "../../components/Profile/UpdatePassword";
import { toDataURL } from "../../utils/DataUrl";
const Profile = () => {
  const { user, fetchUser } = useAuthStore();
  useEffect(() => {
    fetchUser();
  }, [fetchUser]);
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({
    selectedDistrict: null,
    selectedCity: null,
    detailAddress: "",
    idCardFrontPageImage: null,
    idCardBackPageImage: null,
    idCardNumber: "",
    bankStatementImage: null,
    accountHolderName: "",
    accountNumber: "",
    routingNumber: "",
    bankName: "",
    bankBranch: "",
    avatar: null,
    // coverPhoto: null,
    name: "",
    email: "",
    phone: "",
  });

  useEffect(() => {
    if (user) {
      setFormData({
        ...formData,
        role: "vendor",
        name: user?.name,
        email: user?.email,
        phone: user?.phone,
        // coverPhoto: userData.coverPhoto,
        selectedDistrict: user?.location.state,
        selectedCity: user?.location.city,
        detailAddress: "",
        idCardNumber: user?.idCardNumber,
        accountHolderName: user?.accountHolderName,
        accountNumber: user?.accountNumber,
        routingNumber: user?.routingNumber,
        bankName: user?.bankName,
        bankBranch: user?.bankBranch,
        idCardFrontPageImage: user?.idCardFrontPageImage,
        idCardBackPageImage: user?.idCardBackPageImage,
        bankStatementImage: user?.bankStatementImage,
      });
    }
    // if (user?.avatar?.secure_url) {
    //   const coverImageUrl = `${SERVER}${user?.avatar?.secure_url}`;
    //   toDataURL(coverImageUrl).then((base64) => {
    //     setFormData((prevForm) => ({
    //       ...prevForm,
    //       avatar: base64,
    //     }));
    //   });
    // }
  }, [user]);

  const menu = [
    { label: "Password", icon: <RiLockPasswordFill /> },
    { label: "Profile", icon: <CgProfile /> },
    { label: "Address", icon: <FaRegAddressCard /> },
    { label: "Verify ID & Bank", icon: <RiBankCardLine /> },
  ];

  const handleStepClick = (step) => setActiveStep(step);
  const handleNextStep = () =>
    setActiveStep((prevStep) =>
      prevStep + 1 < menu.length ? prevStep + 1 : prevStep
    );
  const handlePreviousStep = () =>
    setActiveStep((prevStep) => (prevStep > 0 ? prevStep - 1 : prevStep));
  const handleChange = (field, value) => {
    setFormData((prevState) => ({
      ...prevState,
      [field]: value,
    }));
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
          {/* <h1 className="mt-10">
            Please complete the todo as soon as possible, then start your
            business journey.
          </h1> */}
        </div>
        <section className="mt-6">
          {activeStep === 0 && (
            <UpdatePassword handleNextStep={handleNextStep} />
          )}
          {activeStep === 1 && (
            <PersonalDetails
              formData={formData}
              handleChange={handleChange}
              handleNextStep={handleNextStep}
            />
          )}
          {activeStep === 2 && (
            <Addresset
              formData={formData}
              handleChange={handleChange}
              handleNextStep={handleNextStep}
            />
          )}
          {activeStep === 3 && (
            <VerifyIdBank
              formData={formData}
              handleChange={handleChange}
              handleNextStep={handleNextStep}
            />
          )}
          {/* {activeStep === 3 && <ProductSet />} */}
        </section>
      </div>
    </section>
  );
};

export default Profile;
