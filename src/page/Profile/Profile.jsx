import { useState } from "react";
import { FaUserPlus, FaEnvelope, FaDatabase } from "react-icons/fa";
import Navbar from "../../layout/Navbar";
import { MdArrowBackIos } from "react-icons/md";
import { CgProfile } from "react-icons/cg";

const Profile = () => {
  const [activeStep, setActiveStep] = useState(0);

  const menu = [
    { label: "Profile", icon: <CgProfile /> },
    { label: "Address", icon: <FaUserPlus /> },
    { label: "Verify ID & Bank", icon: <FaEnvelope /> },
    { label: "Add Product", icon: <FaDatabase /> },
  ];

  const handleStepClick = (step) => {
    setActiveStep(step);
  };

  return (
    <section className="">
      <Navbar />
      <div>
        <h1>
          <MdArrowBackIos /> Back
        </h1>
      </div>
      <div class="p-5 w-10/12 mx-auto">
        <div class="mx-4 p-4">
          <div class="flex items-center">
            {menu.map((item, index) => (
              <>
                <div
                  class={`flex items-center  relative ${
                    activeStep === index ? "text-primary" : "text-gray-400"
                  }`}
                >
                  <div
                    class={`rounded-full transition duration-500 ease-in-out h-12 w-12 py-3 border-2 flex justify-center cursor-pointer ${
                      activeStep === index
                        ? "border-primary bg-primary text-white"
                        : "border-gray-400"
                    }`}
                    onClick={() => handleStepClick(index)}
                  >
                    {item.icon}
                  </div>
                  <div
                    class={`absolute top-0 -ml-10 text-center mt-16 w-32 text-xs font-medium uppercase  ${
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
          Please complete the todo as soon as possible, then start your business
          journey.
        </h1>
      </div>

      <form className="mt-6">{/* Form content here */}</form>
    </section>
  );
};

export default Profile;
