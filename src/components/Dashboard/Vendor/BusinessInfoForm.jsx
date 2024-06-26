import React from "react";
import { useState } from "react";
import InputField from "../../common/InputField";
import PrimaryButton from "../../common/PrimaryButton";
const BusinessInfoForm = () => {
  const [form, setForm] = useState({
    shopName: "",
    logo: null,
    shopAddress: "",
    tinNumber: "",
    binNumber: "",
    detailAddress: "",
  });
  return (
    <form className="grid grid-cols-1 md:grid-cols-2 gap-5">
      <InputField
        label={"Shop Name"}
        placeholder={"Shop Name"}
        required
        value={form.shopName}
        onChange={(e) => setForm({ ...form, shopName: e.target.value })}
      />
      <InputField
        label={"Shop Address"}
        placeholder={"Shop Address"}
        required
        value={form.shopAddress}
        onChange={(e) => setForm({ ...form, shopAddress: e.target.value })}
      />
      <InputField
        label={"Tin Number"}
        placeholder={"Tin Number"}
        required
        value={form.tinNumber}
        onChange={(e) => setForm({ ...form, tinNumber: e.target.value })}
      />
      <InputField
        label={"Bin Number"}
        placeholder={"Bin Number"}
        required
        value={form.binNumber}
        onChange={(e) => setForm({ ...form, binNumber: e.target.value })}
      />
      <InputField
        label={"Detail Address"}
        placeholder={"Detail Address"}
        required
        value={form.detailAddress}
        onChange={(e) => setForm({ ...form, detailAddress: e.target.value })}
      />
      <InputField
        label={"Logo"}
        type="file"
        required
        value={form.logo}
        onChange={(e) => setForm({ ...form, logo: e.target.value })}
      />

      <PrimaryButton value="Update" />
    </form>
  );
};

export default BusinessInfoForm;
