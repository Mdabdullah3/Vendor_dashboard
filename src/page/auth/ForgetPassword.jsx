import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../../config";
import InputField from "../../components/common/InputField";
import Navbar from "../../layout/Navbar";
const ForgetPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(`${API_URL}/auth/forgot-password`, {
        email,
      });
      if (response.status === 200) {
        toast.success(
          "Check your email for password reset Token, Enter The Token The Follwoing Fields"
        );
      }
      router("/reset-password");
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section>
      <Navbar />
      <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4">
        <h2 className="text-2xl font-semibold mb-4">Forget Password</h2>
        <InputField
          label="Email"
          id="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
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

export default ForgetPassword;
