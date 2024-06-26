import React, { useState } from "react";
import InputField from "../../common/InputField";
import SelectField from "../../common/SelectField";
import PrimaryButton from "../../common/PrimaryButton";
const AddSubCategory = () => {
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
  const category = [
    {
      id: 1,
      label: "Men",
      value: "Men",
    },
    {
      id: 2,
      label: "Women",
      value: "women",
    },
  ];
  const [form, setForm] = useState({
    category: "",
    shippingCharge: "",
    status: "",
    categoryCommission: "",
    categoryVat: "",
  });
  return (
    <form className="grid grid-cols-1 md:grid-cols-2 gap-5">
      <SelectField
        label="Category"
        options={category}
        onChange={(e) => setForm({ ...form, category: e.target.value })}
        value={form.category}
        required
      />
      <InputField
        label="Shipping Charge"
        placeholder="Shipping Charge"
        required
        value={form.shippingCharge}
        onChange={(e) => setForm({ ...form, shippingCharge: e.target.value })}
      />
      <SelectField
        required
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
      <PrimaryButton value="Add Sub Category" />
    </form>
  );
};

export default AddSubCategory;
