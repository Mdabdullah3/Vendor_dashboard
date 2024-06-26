import React, { useState } from "react";
import Navbar from "../../layout/Navbar";
import shopImg from "../../assets/shop.avif";
import PrimaryButton from "../../components/common/PrimaryButton";
import InputField from "../../components/common/InputField";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { Link } from "react-router-dom";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  return (
    <section>
      <Navbar />
      <div className="bg-primary text-white">
        <div className="w-10/12 mx-auto h-screen">
          <div className="flex justify-between items-start">
            <div className="hidden lg:block">
              <h1 className="text-3xl font-bold pt-10">
                Sell on Babur Hut Marketplace
              </h1>
              <h2 className="text-lg font-medium">
                Create a Babur Hut seller account in 5 minutes and reach
                millions of customers today!
              </h2>
              <img src={shopImg} alt="" />
            </div>
            <div className="mt-4 mx-4 bg-white text-black p-5 rounded-2xl w-[600px]">
              <h1 className="text-xl font-semibold mb-4">
                Login with Password
              </h1>
              <InputField
                placeholder="Mobile Number / Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <div className="relative my-4">
                <InputField
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  type={showPassword ? "text" : "password"}
                />
                <div className="absolute top-4 right-0 flex items-center pr-3">
                  {showPassword ? (
                    <AiOutlineEyeInvisible
                      onClick={() => setShowPassword(false)}
                      className="cursor-pointer"
                    />
                  ) : (
                    <AiOutlineEye
                      onClick={() => setShowPassword(true)}
                      className="cursor-pointer"
                    />
                  )}
                </div>
              </div>
              <PrimaryButton value={"Get OTP"} />
              <p className="text-end py-2 pt-4 text-blue-600 cursor-pointer">
                Reset Password?
              </p>
              <Link
                to={"/"}
                className="flex justify-end  text-blue-600 cursor-pointer"
              >
                Register?
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;