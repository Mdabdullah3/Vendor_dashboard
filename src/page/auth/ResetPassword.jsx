import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Navbar from "../../layout/Navbar";
import { API_URL } from "../../config";
import InputField from "../../components/common/InputField";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [resetToken, setResetToken] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await axios.patch(`${API_URL}/auth/reset-password`, {
        resetToken,
        password,
        confirmPassword,
      });
      toast.success(
        "Password reset successfully. You can now log in with your new password."
      );
      navigate("/");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to reset password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section>
      <Navbar />
      <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4 space-y-3">
        <h2 className="text-2xl font-semibold mb-4">Reset Password</h2>
        <InputField
          label="Enter Reset Token"
          id="resetToken"
          name="resetToken"
          type="text"
          value={resetToken}
          onChange={(e) => setResetToken(e.target.value)}
          placeholder="Enter your reset token"
          required
        />
        <InputField
          label="New Password"
          id="password"
          name="password"
          type={showPassword ? "text" : "password"}
          showPassword={showPassword}
          toggleShowPassword={() => setShowPassword(!showPassword)}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your new password"
          required
        />
        <InputField
          label="Confirm New Password"
          id="confirmPassword"
          name="confirmPassword"
          type={showConfirmPassword ? "text" : "password"}
          showPassword={showConfirmPassword}
          toggleShowPassword={() =>
            setShowConfirmPassword(!showConfirmPassword)
          }
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Confirm your new password"
          required
        />
        <button
          type="submit"
          className="btn btn-primary mt-4 text-white w-full"
          disabled={loading}
        >
          {loading ? "Submitting..." : "Submit"}
        </button>
      </form>
    </section>
  );
};

export default ResetPassword;
