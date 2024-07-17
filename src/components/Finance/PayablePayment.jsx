import React from "react";
import { financeData } from "../../utils/constant";

const PayablePayment = () => {
  const header = [
    "No",
    "Order Cost",
    "Name",
    "Phone",
    "Gmail",
    "Vendor Profit",
    "Vendor",
    "Action",
  ];
  return (
    <div>
      <table className="min-w-full bg-white border border-gray-200 mt-10">
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
          {financeData?.map((finance, index) => (
            <tr key={finance.id} className="border-b border-gray-200">
              <td className="py-4 px-6">{index}</td>
              <td className="py-4 px-6">{finance.orderCost}</td>
              <td className="py-4 px-6">{finance.brand}</td>
              <td className="py-4 px-6">{finance.phone}</td>
              <td className="py-4 px-6">{finance.email}</td>
              <td className="py-4 px-6">{finance.paymentRecive}</td>
              <td className="py-4 px-6">{finance.paymentPending}</td>
              <td>
                <button className="btn btn-primary">Request</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PayablePayment;
