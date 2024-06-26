"use client";
import React, { useState, useEffect } from "react";
import InputSearch from "../../common/InputSearch";
import TableHead from "../../common/TableHead";
import AddNewVoucher from "./AddNewVoucher";
import { vendorVouchers } from "../../../utils/constant";
const VendorVouchers = () => {
  const [activeMenu, setActiveMenu] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredVouchers, setFilteredVouchers] = useState(vendorVouchers);

  const handleSearch = (value) => {
    setSearchTerm(value);
  };

  const handleMenuClick = (id) => {
    setActiveMenu(id);
  };

  useEffect(() => {
    const filterVouchers = () => {
      if (searchTerm === "") {
        return vendorVouchers;
      }

      return vendorVouchers.filter((voucher) =>
        voucher.voucherId.toLowerCase().includes(searchTerm.toLowerCase())
      );
    };

    setFilteredVouchers(filterVouchers());
  }, [searchTerm]);

  const menu = [
    {
      id: 1,
      name: "All",
    },
    {
      id: 2,
      name: "Add New Voucher",
    },
  ];

  const header = [
    "Voucher ID",
    "Shipped",
    "Discount",
    "Date",
    "Status",
    "Action",
  ];

  return (
    <section className="py-5">
      <div className="flex items-center justify-center border-b-2 gap-10 mb-5">
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
      {activeMenu === 1 ? (
        <>
          <InputSearch
            placeholder="Search For Voucher.."
            value={searchTerm}
            onChange={(value) => handleSearch(value)}
            onSearch={handleSearch}
          />
          <div>
            {filteredVouchers.length === 0 ? (
              <h1 className="text-center text-red-600 py-4 text-2xl">
                No Vouchers Found
              </h1>
            ) : (
              <table className="table-auto w-full overflow-auto mt-10">
                <TableHead header={header} />
                {filteredVouchers.map((item) => (
                  <tbody key={item.id}>
                    <tr className="border-r border-l border-gray-300 border-b">
                      <td className="text-center text-dark font-medium text-secondary py-5 text-sm bg-transparent border-b border-l border-r border-gray-300">
                        {item.voucherId}
                      </td>
                      <td className="text-center text-dark font-medium text-secondary py-5 px-2 bg-transparent border-b border-r border-gray-300">
                        {item.shipped}
                      </td>
                      <td className="text-center text-dark font-medium text-secondary py-5 px-2 bg-transparent border-b border-r border-gray-300">
                        {item.discount}
                      </td>
                      <td className="text-center text-dark font-medium text-secondary py-5 px-2 cursor-pointer bg-transparent border-b border-r border-gray-300">
                        {item.strdate} - {item.expirDate}
                      </td>
                      <td className="text-center text-dark font-medium text-secondary py-5 px-2 cursor-pointer bg-transparent border-b border-r border-gray-300">
                        {item.status}
                      </td>
                      <td className="text-center text-dark font-medium text-secondary py-5 px-2 cursor-pointer bg-transparent border-b border-r border-gray-300">
                        <button className="bg-primary text-white px-5 py-1.5 rounded-lg">
                          Edit
                        </button>
                      </td>
                    </tr>
                  </tbody>
                ))}
              </table>
            )}
          </div>
        </>
      ) : (
        <>
          <AddNewVoucher />{" "}
        </>
      )}
    </section>
  );
};

export default VendorVouchers;
