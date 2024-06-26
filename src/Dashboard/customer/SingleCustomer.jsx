import React, { useState } from "react";
import VendorOrders from "../../components/Dashboard/Vendor/VendorOrders";
import CustomerSettings from "../../components/Dashboard/CustomerSettings";
const SingleCustomer = () => {
  const [activeMenu, setActiveMenu] = useState(1);
  const handleMenuClick = (id) => {
    setActiveMenu(id);
  };
  const menu = [
    {
      id: 1,
      name: "Orders",
      items: 5,
    },
    {
      id: 2,
      name: "About & Setting's",
    },
  ];
  return (
    <section className="px-5">
      <div className="flex mt-8 items-center justify-center gap-10 w-10/12 mx-auto my-4 border-b-2 ">
        {menu.map((item) => (
          <>
            <button
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
      <div>
        {activeMenu === 1 && (
          <div>
            <VendorOrders />
          </div>
        )}
        {activeMenu === 2 && (
          <div>
            <CustomerSettings />
          </div>
        )}
      </div>
    </section>
  );
};

export default SingleCustomer;
