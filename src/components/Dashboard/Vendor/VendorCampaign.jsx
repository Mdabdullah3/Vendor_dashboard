"use client";
import React, { useState } from "react";
import TableHead from "../../common/TableHead";
import { vendorEvents } from "../../../utils/constant";
const VendorCampaign = () => {
  const [activeMenu, setActiveMenu] = useState(1);
  const handleMenuClick = (id) => {
    setActiveMenu(id);
  };
  const header = [
    "Event Id",
    "Payment",
    "Discount",
    "Date",
    "Status",
    "Action",
  ];
  const menu = [
    {
      id: 1,
      name: "All",
      items: 5,
    },
    {
      id: 2,
      name: "Previous Joined Event",
      items: 10,
    },
  ];
  return (
    <section className="w-11/12 mx-auto">
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
            {item.name} ({item.items})
          </button>
        ))}
      </div>
      {vendorEvents.length > 0 ? (
        <div>
          <TableHead header={header} />
          {vendorEvents.map((item) => (
            <tbody key={item.id}>
              <tr className="border-r border-l border-gray-300 border-b">
                <td className="text-center text-dark font-medium text-secondary py-5 text-sm bg-transparent border-b border-l border-r border-gray-300">
                  {item.eventId}
                </td>
                <td className="text-center text-dark font-medium text-secondary py-5 px-2 bg-transparent border-b border-r border-gray-300">
                  {item.payment}
                </td>
                <td className="text-center text-dark font-medium text-secondary py-5 px-2 bg-transparent border-b border-r border-gray-300">
                  {item.discount}
                </td>
                <td className="text-center text-dark font-medium text-secondary py-5 px-2 cursor-pointer bg-transparent border-b border-r border-gray-300">
                  Joined {item.joinDate} | Closed {item.closeDate}
                </td>
                <td className="text-center text-dark font-medium text-secondary py-5 px-2 cursor-pointer bg-transparent border-b border-r border-gray-300">
                  {item.status}
                </td>
                <td className="text-center text-dark font-medium text-secondary py-5 px-2 cursor-pointer bg-transparent border-b border-r border-gray-300">
                  <button className="bg-primary text-white px-5 py-1.5 rounded-lg">
                    Active
                  </button>
                </td>
              </tr>
            </tbody>
          ))}
        </div>
      ) : (
        <div className="text-center">No data found</div>
      )}
    </section>
  );
};

export default VendorCampaign;
