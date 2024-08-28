import React, { useState } from "react";
import InputField from "../common/InputField";
import PrimaryButton from "../common/PrimaryButton";
import useUserStore from "../../store/AuthStore";
import axios from "axios";
import { toast } from "react-toastify";
import { API_URL } from "../../config";

const UpdatePassword = ({ handleNextStepMove, setIsPasswordUpdated }) => {
  const storedUser = useUserStore((state) => state.storedUser);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  console.log(storedUser);
  const [formData, setFormData] = useState({
    currentPassword: storedUser?.password,
    password: "",
    confirmPassword: "",
  });

  const handleChange = (key, value) => {
    setFormData((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  };

  const handleUpdatePassword = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    try {
      const response = await axios.patch(
        `${API_URL}/auth/update-password`,
        {
          withcredentials: true,
        },
        {
          currentPassword: storedUser?.password,
          password: formData.password,
          confirmPassword: formData.confirmPassword,
        }
      );

      if (response.status === 200) {
        toast.success(response.data.message);
        handleNextStepMove(); // Move to the next step
        setIsPasswordUpdated(true);
      } else {
        toast.error(response.data.message || "Error updating password.");
        console.error("Error updating password:", response.data.message);
      }
    } catch (error) {
      // toast.error(error.response.data.message);
      console.log(error);
    }
  };

  return (
    <div className="mt-10">
      <h1 className="text-lg font-semibold">Create Your Password</h1>
      <p>
        Your password is the key to your account. Please set a secure password
        to ensure you can access your account. Without a password, login won’t
        be possible. Protect your account today.
      </p>
      <form
        className="mt-10 space-y-4  w-10/12"
        onSubmit={handleUpdatePassword}
      >
        <InputField
          label={"Password"}
          required
          value={formData.password}
          onChange={(e) => handleChange("password", e.target.value)}
          placeholder="Enter Your New Password"
          type={showPassword ? "text" : "password"}
          showPassword={showPassword}
          toggleShowPassword={() => setShowPassword(!showPassword)}
        />
        <InputField
          label={"Confirm Password"}
          required
          value={formData.confirmPassword}
          onChange={(e) => handleChange("confirmPassword", e.target.value)}
          placeholder="Confirm Your New Password"
          type={showConfirmPassword ? "text" : "password"}
          showPassword={showConfirmPassword}
          toggleShowPassword={() =>
            setShowConfirmPassword(!showConfirmPassword)
          }
        />
        <PrimaryButton value="Submit" type="submit" />
      </form>
    </div>
  );
};

export default UpdatePassword;
