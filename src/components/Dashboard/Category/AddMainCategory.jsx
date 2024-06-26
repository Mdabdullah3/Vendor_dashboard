import React, { useState } from "react";
import InputField from "../../common/InputField";
import SelectField from "../../common/SelectField";
import PrimaryButton from "../../common/PrimaryButton";
const AddMainCategory = () => {
  const status = [
    {
      id: 1,
      label: "Active",
      value: "active",
    },
    {
      id: 2,
      label: "Inactive",
      value: "inactive",
    },
  ];
  const [form, setForm] = useState({
    categoryName: "",
    shippingCharge: "",
    status: "",
    categoryCommission: "",
    categoryVat: "",
  });
  return (
    <form className="grid grid-cols-1 md:grid-cols-2 gap-5">
      <InputField
        label="Category Name"
        placeholder="Category Name"
        required
        value={form.categoryName}
        onChange={(e) => setForm({ ...form, categoryName: e.target.value })}
      />
      <InputField
        label="Shipping Charge"
        placeholder="Shipping Charge"
        required
        value={form.shippingCharge}
        onChange={(e) => setForm({ ...form, shippingCharge: e.target.value })}
      />
      <SelectField
        label="Status"
        options={status}
        onChange={(e) => setForm({ ...form, status: e.target.value })}
        value={form.status}
      />
      <InputField
        label="Category Commission"
        value={form.categoryCommission}
        onChange={(e) =>
          setForm({ ...form, categoryCommission: e.target.value })
        }
        placeholder={"Category Commission"}
        required
      />
      <InputField
        label="Category VAT"
        value={form.categoryVat}
        onChange={(e) => setForm({ ...form, categoryVat: e.target.value })}
        placeholder={"Category VAT"}
        required
      />
      <div></div>
      <PrimaryButton value="Add Main Category" />
    </form>
  );
};

export default AddMainCategory;
