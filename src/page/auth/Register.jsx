import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../../layout/Navbar";
import shopImg from "../../assets/shop.avif";
import flagBd from "../../assets/Flag-Bangladesh.webp";
import PrimaryButton from "../../components/common/PrimaryButton";
import PasswordSet from "../../components/Auth/PasswordSet";
import EmailSet from "../../components/Auth/EmailSet";

const Register = () => {
  const [step, setStep] = useState(1);
  const navigate = useNavigate();

  const handleNextStep = () => setStep((prev) => prev + 1);
  const handleFinalStep = () => navigate("/new-route");
  console.log(step);
  return (
    <section>
      <Navbar />
      <div className="bg-primary text-white">
        <div className="lg:w-10/12 w-[95%] mx-auto h-screen">
          <div className="flex lg:justify-between items-start justify-center">
            <div className="hidden lg:block">
              <h1 className="text-3xl font-bold pt-10">
                Sign up as a seller and Win!
              </h1>
              <h2 className="text-lg font-medium">
                Enter our competition and you could win US$5,000 cash, and
                US$5,000 shipping & marketing credits.
              </h2>
              <img src={shopImg} alt="Shop" />
            </div>
            <div className="mt-4 bg-white text-black p-3 md:p-5 rounded-2xl">
              {step === 1 && (
                <div>
                  <h1 className="text-xl font-semibold">
                    Sign up at Babur Hut
                  </h1>
                  <p className="text-gray-600 text-[14px]">
                    Sign up in 2 steps
                  </p>
                  <div className="flex my-5 bg-white rounded-lg border border-gray-300">
                    <div className="my-auto text-slate-600 border-r lg:px-8 pr-4 border-r-gray-200 md:flex items-center gap-2 hidden">
                      <img
                        src={flagBd}
                        className="w-5 h-5 rounded-full"
                        alt="flag Bd"
                      />
                      <h1>+880</h1>
                    </div>
                    <input
                      placeholder="Enter your phone number"
                      className="md:p-4 p-3 text-gray-900 focus:outline-none bg-white border-none rounded-lg"
                    />
                  </div>
                  <PrimaryButton value="Get OTP" onClick={handleNextStep} />
                  <Link
                    to="/login"
                    className="flex justify-end py-4 text-blue-600"
                  >
                    Login?
                  </Link>
                </div>
              )}
              {step === 2 && <PasswordSet onNext={handleNextStep} />}
              {step === 3 && <EmailSet onNext={handleFinalStep} />}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Register;
