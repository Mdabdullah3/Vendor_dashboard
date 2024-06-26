import React, { useState } from "react";
import InputField from "../../common/InputField";
import PrimaryButton from "../../common/PrimaryButton";
const BankInfo = () => {
  const [form, setForm] = useState({
    bankName: "",
    accountNumber: "",
    branch: "",
    accountHolder: "",
    chequeImg: "",
  });
  return (
    <form className="grid grid-cols-1 md:grid-cols-2 gap-5">
      <InputField
        label={"Bank Name"}
        placeholder={"Bank Name"}
        value={form.bankName}
        onChange={(e) => setForm({ ...form, bankName: e.target.value })}
        required
      />
      <InputField
        label={"Account Number"}
        placeholder={"Account Number"}
        value={form.accountNumber}
        onChange={(e) => setForm({ ...form, accountNumber: e.target.value })}
        required
      />
      <InputField
        label={"Branch"}
        placeholder={"Branch"}
        value={form.branch}
        onChange={(e) => setForm({ ...form, branch: e.target.value })}
        required
      />
      <InputField
        label={"Account Holder"}
        placeholder={"Account Holder"}
        value={form.accountHolder}
        onChange={(e) => setForm({ ...form, accountHolder: e.target.value })}
        required
      />
      <InputField
        label={"Cheque Image"}
        type="file"
        value={form.chequeImg}
        onChange={(e) => setForm({ ...form, chequeImg: e.target.value })}
        required
      />
      <div></div>

      <PrimaryButton value="Update" />
    </form>
  );
};

export default BankInfo;
