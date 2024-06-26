import React from "react";
import { useState } from "react";
import InputField from "../../common/InputField";
import PrimaryButton from "../../common/PrimaryButton";
const OwnerForm = () => {
  const [form, setForm] = useState({
    ownerName: "",
    password: "",
    birthDate: "",
    confirmPassword: "",
    image: "",
  });
  return (
    <form className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
      <InputField
        label={"Owner Name"}
        placeholder={"Owner Name"}
        value={form.ownerName}
        onChange={(e) => setForm({ ...form, ownerName: e.target.value })}
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
        value={form.birthDate}
        onChange={(e) => setForm({ ...form, birthDate: e.target.value })}
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
      <div></div>
      <PrimaryButton value="Update" />
    </form>
  );
};

export default OwnerForm;
