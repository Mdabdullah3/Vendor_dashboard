import React, { useState } from "react";
import PrimaryButton from "../../components/common/PrimaryButton";
import VendorProducts from "../../components/Dashboard/Vendor/Products";
import VendorOrders from "../../components/Dashboard/Vendor/VendorOrders";
import VendorVouchers from "../../components/Dashboard/Vendor/VendorVouchers";
import VendorCampaign from "../../components/Dashboard/Vendor/VendorCampaign";
import VendorAds from "../../components/Dashboard/Vendor/VendorAds";
import VendorReview from "../../components/Dashboard/Vendor/VendorReview";
import VendorSetting from "../../components/Dashboard/Vendor/VendorSetting";
import { vendor } from "../../utils/constant";
const SingleVendor = () => {
  const [activeMenu, setActiveMenu] = useState(1);
  const handleMenuClick = (id) => {
    setActiveMenu(id);
  };
  const menu = [
    {
      id: 1,
      name: "Proudcts",
      items: 5,
    },
    {
      id: 2,
      name: "Orders",
      items: 5,
    },
    {
      id: 3,
      name: "Vouchers",
      items: 5,
    },
    {
      id: 4,
      name: "Campaigns",
      items: 5,
    },
    {
      id: 5,
      name: "Running Ads",
      items: 5,
    },
    {
      id: 6,
      name: "Reviews",
      items: 5,
    },
    {
      id: 7,
      name: "About Settings",
    },
  ];
  return (
    <section className="w-11/12 mx-auto my-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl text-gray-700 font-bold">Vendor</h1>
        <h2 className="text-xl font-bold">#509290323523</h2>
      </div>
      <div className="flex items-center justify-center gap-4">
        <img
          src={vendor[0].img}
          alt="vendor"
          className="w-40 px-4 py-4 shadow-lg rounded-lg border border-gray-300"
        />
        <h1 className="text-xl font-bold">{vendor[0].name}</h1>
        <PrimaryButton value="Deactive" />
        <button className="bg-blue-500 hover:bg-blue-500/70  text-white font-bold py-3 px-4 rounded-lg transition duration-300">
          Verified
        </button>
      </div>
      <div className="flex mt-8 items-center justify-center gap-10 w-10/12 mx-auto my-4 border-b-2 ">
        {menu.map((item) => (
          <>
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
          </>
        ))}
      </div>
      <div>{activeMenu === 1 && <VendorProducts />}</div>
      <div>{activeMenu === 2 && <VendorOrders />}</div>
      <div>{activeMenu === 3 && <VendorVouchers />}</div>
      <div>{activeMenu === 4 && <VendorCampaign />}</div>
      <div>{activeMenu === 5 && <VendorAds />}</div>
      <div>{activeMenu === 6 && <VendorReview />}</div>
      <div>{activeMenu === 7 && <VendorSetting />}</div>
    </section>
  );
};

export default SingleVendor;
