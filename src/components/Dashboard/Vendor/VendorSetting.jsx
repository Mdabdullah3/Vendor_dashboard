"use client";
import React from "react";
import { useState } from "react";
import OwnerForm from "./OwnerForm";
import BusinessInfo from "./BusinessInfoForm";
import BankInfoForm from "./BankInfo";
const VendorSetting = () => {
  const [activeMenu, setActiveMenu] = useState(1);
  const handleMenuClick = (id) => {
    setActiveMenu(id);
  };
  const menu = [
    {
      id: 1,
      name: "Seller Info",
    },
    {
      id: 2,
      name: "Business Info",
    },
    {
      id: 3,
      name: "Bank Info",
    },
    {
      id: 4,
      name: "Warehouse Info",
    },
    {
      id: 5,
      name: "Return Address",
    },
  ];
  return (
    <section>
      <div className="flex items-center justify-center border-b-2 gap-10 my-10">
        {menu.map((item) => (
          <button
            key={item.id}
            onClick={() => handleMenuClick(item.id)}
            className={`font-bold pb-2 ${
              activeMenu === item.id
                ? "text-primary border-b-2 border-primary"
                : ""
            }`}
          >
            {item.name}
          </button>
        ))}
      </div>
      <div>{activeMenu === 1 && <OwnerForm />}</div>
      <div>{activeMenu === 2 && <BusinessInfo />}</div>
      <div>{activeMenu === 3 && <BankInfoForm />}</div>
    </section>
  );
};

export default VendorSetting;
