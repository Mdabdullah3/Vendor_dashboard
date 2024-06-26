import React, { useState } from "react";
import InputField from "../common/InputField";
import PrimaryButton from "../common/PrimaryButton";

const CustomerSettings = () => {
  const [form, setForm] = useState({
    customerName: "",
    shippingAddress: "",
    password: "",
    birthdate: "",
    additionAddress: "",
    confirmPassword: "",
    image: "",
    phoneNumber: "",
    email: "",
  });
  return (
    <form className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
      <InputField
        label={"Customer Name"}
        placeholder={"Customer Name"}
        value={form.customerName}
        onChange={(e) => setForm({ ...form, customerName: e.target.value })}
        required
      />
      <InputField
        label={"Shipping Address"}
        placeholder={"Shipping Address"}
        value={form.shippingAddress}
        onChange={(e) => setForm({ ...form, shippingAddress: e.target.value })}
        required
      />
      <InputField
        label={"Password"}
        placeholder={"Password"}
        value={form.password}
        onChange={(e) => setForm({ ...form, password: e.target.value })}
        required
      />
      <InputField
        label={"Birth Date"}
        type="date"
        placeholder={"Birth Date"}
        value={form.birthdate}
        onChange={(e) => setForm({ ...form, birthdate: e.target.value })}
        required
      />
      <InputField
        label={"Addition Address"}
        placeholder={"Addition Address"}
        value={form.additionAddress}
        onChange={(e) => setForm({ ...form, additionAddress: e.target.value })}
        required
      />
      <InputField
        label={"Confirm Password"}
        placeholder={"Confirm Password"}
        value={form.confirmPassword}
        onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
        required
      />
      <InputField
        label={"Image"}
        placeholder={"Image"}
        type="file"
        value={form.image}
        onChange={(e) => setForm({ ...form, image: e.target.value })}
        required
      />
      <InputField
        label={"Phone Number"}
        type="number"
        placeholder={"Phone Number"}
        value={form.phoneNumber}
        onChange={(e) => setForm({ ...form, phoneNumber: e.target.value })}
        required
      />
      <InputField
        label={"Email"}
        placeholder={"Email"}
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
        required
      />
      <div></div>
      <PrimaryButton value="Update" />
    </form>
  );
};

export default CustomerSettings;
