import { useState } from "react";
import { FaDatabase, FaRegAddressCard } from "react-icons/fa";
import Navbar from "../../layout/Navbar";
import { MdArrowBackIos } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { RiBankCardLine } from "react-icons/ri";
import Addresset from "../../components/Profile/Addresset";

const Profile = () => {
  const [activeStep, setActiveStep] = useState(1);

  const menu = [
    { label: "Profile", icon: <CgProfile /> },
    { label: "Address", icon: <FaRegAddressCard /> },
    { label: "Verify ID & Bank", icon: <RiBankCardLine /> },
    { label: "Add Product", icon: <FaDatabase /> },
  ];

  const handleStepClick = (step) => {
    setActiveStep(step);
  };

  return (
    <section className="">
      <Navbar />
      <div className="p-5 w-10/12 mx-auto">
        <div>
          <h1 className="flex items-center gap-2 mb-4">
            <MdArrowBackIos /> Back
          </h1>
        </div>
        <div className="">
          <div className="mx-4 p-4">
            <div className="flex items-center">
              {menu.map((item, index) => (
                <>
                  <div
                    className={`flex items-center  relative ${
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
                      className={`absolute top-0 -ml-10 text-center mt-16 w-32 text-xs font-medium uppercase  ${
                        activeStep === index ? "text-primary" : "text-gray-500"
                      }`}
                    >
                      {item.label}
                    </div>
                  </div>
                  {index < menu.length - 1 && (
                    <div
                      className={`flex-auto border-t-2 transition duration-500 ease-in-out ${
                        activeStep === index
                          ? "border-primary"
                          : "border-gray-300"
                      }`}
                    ></div>
                  )}
                </>
              ))}
            </div>
          </div>
          <h1 className="mt-10">
            Please complete the todo as soon as possible, then start your
            business journey.
          </h1>
        </div>

        <form className="mt-6">{activeStep === 1 && <Addresset />}</form>
      </div>
    </section>
  );
};

export default Profile;
