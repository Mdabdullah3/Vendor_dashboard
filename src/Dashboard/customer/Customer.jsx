import React, { useState } from "react";
import { customerData } from "../../utils/constant";
import InputSearch from "../../components/common/InputSearch";
import TableHead from "../../components/common/TableHead";
const Customer = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (value) => {
    setSearchTerm(value);
  };
  const header = [
    "Customer ID",
    "Name",
    "Image",
    "Active Order",
    "Total Order",
    "Join Date",
    "Action",
  ];
  return (
    <section className="px-5 mt-10">
      <div>
        <div className="flex-1">
          <InputSearch
            placeholder="Search For Vendor.."
            value={searchTerm}
            onChange={(value) => setSearchTerm(value)}
            onSearch={handleSearch}
          />
        </div>

        <table className="table-auto w-full overflow-auto mt-10">
          <TableHead header={header} />
          {customerData?.map((item) => (
            <tbody key={item.id}>
              <tr className="border-r border-l border-gray-300 border-b">
                <td className="text-center text-dark font-medium text-secondary py-5 text-sm bg-transparent border-b border-l border-r border-gray-300">
                  {item.customerId}
                </td>
                <td className="text-center text-dark font-medium text-secondary py-5 px-2 bg-transparent border-b border-r border-gray-300">
                  {item.name}
                </td>
                <td className="text-center text-dark font-medium text-secondary py-5 px-2 bg-transparent border-b border-r border-gray-300">
                  <img src={item.img} alt="" className="w-20 h-20 mx-auto" />
                </td>
                <td className="text-center text-dark font-medium text-secondary py-5 px-2 cursor-pointer bg-transparent border-b border-r border-gray-300">
                  {item.activeOrder}
                </td>
                <td className="text-center text-dark font-medium text-secondary py-5 px-2 cursor-pointer bg-transparent border-b border-r border-gray-300">
                  {item.totalOrder}
                </td>
                <td className="text-center text-dark font-medium text-secondary py-5 px-2 cursor-pointer bg-transparent border-b border-r border-gray-300">
                  {"12, 7, 2022"}
                </td>
                <td className="text-center text-dark font-medium text-secondary py-5 px-2 cursor-pointer bg-transparent border-b border-r border-gray-300">
                  <button className="bg-primary text-white px-5 py-1.5 rounded-lg">
                    More
                  </button>
                </td>
              </tr>
            </tbody>
          ))}
        </table>
      </div>
    </section>
  );
};

export default Customer;
