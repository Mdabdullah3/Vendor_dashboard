import React, { useEffect, useState } from "react";
import InputField from "../../components/common/InputField";
import SelectField from "../../components/common/SelectField";
import PrimaryButton from "../../components/common/PrimaryButton";
import useVoucherStore from "../../store/useVoucherStore";
import { useParams } from "react-router-dom";

const EditVoucher = () => {
  const { id } = useParams();
  const { fetchVoucherById, voucher, updateVoucher } = useVoucherStore();

  const [form, setForm] = useState({
    user: "",
    redeemCode: "",
    startDate: "",
    endDate: "",
    discount: "",
    status: "",
  });

  useEffect(() => {
    fetchVoucherById(id);
  }, [id, fetchVoucherById]);

  useEffect(() => {
    if (voucher) {
      setForm({
        user: voucher.user?._id || "",
        redeemCode: voucher.redeemCode || "",
        startDate: voucher.startDate
          ? new Date(voucher.startDate).toISOString().split("T")[0]
          : "",
        endDate: voucher.endDate
          ? new Date(voucher.endDate).toISOString().split("T")[0]
          : "",
        discount: voucher.discount || "",
        status: voucher.status || "",
      });
    }
  }, [voucher]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    await updateVoucher(id, form);
    setForm({
      redeemCode: "",
      startDate: "",
      endDate: "",
      discount: "",
      status: "",
    });
  };

  return (
    <section className="mt-5">
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <InputField
            label="Redeem Code"
            value={form.redeemCode}
            placeholder="Enter Redeem Code"
            onChange={(e) => setForm({ ...form, redeemCode: e.target.value })}
            required
          />
          <InputField
            label="Discount"
            value={form.discount}
            placeholder="Enter Discount"
            onChange={(e) => setForm({ ...form, discount: e.target.value })}
            required
          />
          <InputField
            label="Start Date"
            type="date"
            value={form.startDate}
            placeholder="Enter Start Date"
            onChange={(e) => setForm({ ...form, startDate: e.target.value })}
            required
          />
          <InputField
            label="End Date"
            type="date"
            value={form.endDate}
            placeholder="Enter End Date"
            onChange={(e) => setForm({ ...form, endDate: e.target.value })}
            required
          />
          <SelectField
            label="Status"
            id="status"
            name="status"
            value={form.status}
            onChange={(e) => setForm({ ...form, status: e.target.value })}
            options={[
              { value: "active", label: "Active" },
              { value: "expired", label: "Expired" },
            ]}
            required
          />
        </div>
        <PrimaryButton value={"Update Voucher"} />
      </form>
    </section>
  );
};

export default EditVoucher;
