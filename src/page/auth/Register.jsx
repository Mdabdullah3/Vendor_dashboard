import React, { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../../layout/Navbar";
import shopImg from "../../assets/shop.avif";
import flagBd from "../../assets/Flag-Bangladesh.webp";
import PrimaryButton from "../../components/common/PrimaryButton";
import PasswordSet from "../../components/Auth/PasswordSet";
import axios from "axios";
import { toast } from "react-toastify";
import { API_URL } from "../../config";
axios.defaults.withCredentials = true;

const Register = () => {
  const [step, setStep] = useState(1);
  const [phone, setPhone] = useState("");
  const [otpResponse, setOtpResponse] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleNextStep = () => setStep((prev) => prev + 1);

  const handlePhoneSubmit = async () => {
    const phoneRegex = /^01[3-9]\d{8}$/;
    if (!phoneRegex.test(phone)) {
      toast.error("Invalid Phone Number");
      return;
    }
    setLoading(true);
    try {
      const response = await axios.post(
        `${API_URL}/auth/send-otp`,
        { phone },
        { withCredentials: true }
      );
      toast.success(response.data.data.message);
      setOtpResponse(response.data);
      handleNextStep();
    } catch (error) {
      console.error("Failed to send OTP", error);
      toast.error("Failed to send OTP");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section>
      <Navbar />
      <div className="bg-primary text-white">
        <div className="lg:w-10/12 w-[95%] mx-auto h-screen">
          <div className="lg:grid grid-cols-5 items-start gap-5">
            <div className="hidden lg:block col-span-3">
              <h1 className="text-3xl font-bold pt-10">
                Sign up as a seller and Win!
              </h1>
              <h2 className="text-lg font-medium">
                Enter our competition and you could win US$5,000 cash, and
                US$5,000 shipping & marketing credits.
              </h2>
              <img src={shopImg} alt="Shop" />
            </div>
            <div className="col-span-2 ">
              <div className="mt-4 bg-white text-black p-3 md:p-5 rounded-2xl ">
                {step === 1 && (
                  <div>
                    <h1 className="text-xl font-semibold">
                      Sign up at Ready How
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
                        placeholder="017XXXXXXXX"
                        className="md:p-4 p-3 text-gray-900 focus:outline-none bg-white border-none rounded-lg"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                      />
                    </div>
                    <PrimaryButton
                      value={loading ? "Sending..." : "Send OTP"}
                      onClick={handlePhoneSubmit}
                      disabled={loading}
                      loading={loading}
                    />
                    <Link
                      to="/"
                      className="flex justify-end py-4 text-blue-600"
                    >
                      Login?
                    </Link>
                  </div>
                )}
                {step === 2 && (
                  <PasswordSet
                    otpData={otpResponse}
                    phone={phone}
                    onNext={handleNextStep}
                  />
                )}
                {/* {step === 3 && <EmailSet onNext={handleFinalStep} />} */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Register;
