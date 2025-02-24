import React, { useEffect } from "react";
import {  FiEdit } from "react-icons/fi";
import { Link } from "react-router-dom";
import useVoucherStore from "../../store/useVoucherStore";

const VoucherAdminPanel = () => {
  const { vouchers, fetchVoucherMe } = useVoucherStore();
  useEffect(() => {
    fetchVoucherMe();
  }, [fetchVoucherMe]);
  const header = [
    "Code",
    "Discount",
    "Start Date",
    "Expiry Date",
    "Status",
    "Action",
  ];

  return (
    <div className="flex h-screen">
      <div className="flex-1 p-10">
        <div className="flex justify-between items-center mb-10">
          <h1 className="text-3xl font-bold">Vouchers</h1>
          {/* <Link to="/admin/add-voucher">
            <button className="flex items-center px-4 py-2 bg-primary text-white rounded-lg shadow-md hover:bg-primary/60">
              <FiPlus className="mr-2" /> Add Voucher
            </button>
          </Link> */}
        </div>

        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr>
              {header.map((head, index) => (
                <th
                  key={index}
                  className="py-3 px-6 bg-gray-200 text-left text-xs font-bold uppercase border-b border-gray-200"
                >
                  {head}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {vouchers.length > 0 ? (
              vouchers.map((voucher) => (
                <tr key={voucher?._id} className="border-b border-gray-200">
                  <td className="py-4 px-6">{voucher?.redeemCode}</td>
                  <td className="py-4 px-6">{voucher?.discount}</td>
                  <td className="py-4 px-6">{voucher?.startDate}</td>
                  <td className="py-4 px-6">{voucher?.endDate}</td>
                  <td className="py-4 px-6">{voucher?.status}</td>
                  <td className="py-4 px-6 flex space-x-2">
                    <Link to={`/admin/edit-voucher/${voucher?._id}`}>
                      <button className="flex items-center px-3 py-1 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600">
                        <FiEdit className="mr-1" /> Edit
                      </button>
                    </Link>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={7}
                  className="text-center text-xl font-semibold text-red-600 py-4"
                >
                  No Vouchers found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default VoucherAdminPanel;
