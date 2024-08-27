import React, { useState } from "react";
import InputField from "../common/InputField";
import PrimaryButton from "../common/PrimaryButton";
import useAuthStore from "../../store/useAuthStore";
import axios from "axios";
import { toast } from "react-toastify";
import { API_URL } from "../../config";

const UpdatePassword = ({ handleNextStepMove }) => {
  const { user } = useAuthStore();
  console.log(user);
  const [formData, setFormData] = useState({
    currentPassword: user?.password,
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
    console.log(formData);
    e.preventDefault();
    try {
      const response = await axios.patch(`${API_URL}/auth/update-password`, {
        currentPassword: user?.password,
        password: formData.password,
        confirmPassword: formData.confirmPassword,
      });

      console.log(response);
      if (response.status === 200) {
        toast.success(response.data.message);
        // handleNextStepMove(); // Move to the next step
      } else {
        toast.error(response.data.message || "Error updating password.");
        console.error("Error updating password:", response.data.message);
      }
    } catch (error) {
      toast.error(error.response.data.message);
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
      <form className="mt-10 space-y-4" onSubmit={handleUpdatePassword}>
        {/* <InputField
          label={"Current Password"}
          required
          value={formData.currentPassword}
          onChange={(e) => handleChange("currentPassword", e.target.value)}
          placeholder="Enter Your Current Password"
          type="password"
        /> */}
        <InputField
          label={"Password"}
          required
          value={formData.password}
          onChange={(e) => handleChange("password", e.target.value)}
          placeholder="Enter Your New Password"
          type="password"
        />
        <InputField
          label={"Confirm Password"}
          required
          value={formData.confirmPassword}
          onChange={(e) => handleChange("confirmPassword", e.target.value)}
          placeholder="Confirm Your New Password"
          type="password"
        />
        <PrimaryButton value={"Next"} type="submit" />
      </form>
    </div>
  );
};

export default UpdatePassword;
