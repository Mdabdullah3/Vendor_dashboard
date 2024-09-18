import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useOrderStore from "../../store/OrderStore";
import Loading from "../common/Loading";

const PayablePayment = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const { userOrders, fetchAllVendorOrders, updateOrderStatus } =
    useOrderStore();

  useEffect(() => {
    setLoading(true);
    const loadOrdersForAllUsers = async () => {
      await fetchAllVendorOrders(id);
      setLoading(false);
    };
    loadOrdersForAllUsers();
  }, [fetchAllVendorOrders, id, userOrders]);

  console.log(loading);
  const header = [
    "No",
    "Order Cost",
    // "Name",
    // "Phone",
    "Vat",
    "Commission",
    "Transaction Fee",
    "Shipping Cost",
    "Profit",
    "Status",
    "Action",
  ];
  const activeOrders = userOrders?.filter(
    (order) => order.status !== "cancelled"
  );
  const handlePay = async (orderId) => {
    // Update order status to paid
    await updateOrderStatus(orderId, { vendorPaid: "paid" });
  };
  if (loading) {
    return <Loading />;
  }
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
          {userOrders?.length > 0 ? (
            activeOrders?.map((finance, index) => (
              <tr
                key={finance._id}
                className="border-b border-gray-200 capitalize"
              >
                <td className="py-4 px-6">{index}</td>
                <td className="py-4 px-6">{finance.price}</td>
                {/* <td className="py-4 px-6">{finance?.shippingInfo?.name}</td>
                <td className="py-4 px-6">{finance?.shippingInfo?.phone}</td> */}
                <td className="py-4 px-6">{finance?.vat}</td>
                <td className="py-4 px-6">{finance?.commission}</td>
                <td className="py-4 px-6">{finance?.transactionCost}</td>
                <td className="py-4 px-6">{finance?.shippingCharge}</td>
                <td className="py-4 px-6">
                  {finance?.profit ? Number(finance.profit).toFixed(2) : "0.00"}
                </td>
                <td className="py-4 px-6">{finance?.status}</td>
                {finance?.vendorPaid === "unpaid" ? (
                  <td className="py-4 px-6">
                    <button
                      onClick={() => handlePay(finance?._id)}
                      className="btn bg-green-500 hover:bg-green-600 text-white"
                    >
                      Pay
                    </button>
                  </td>
                ) : (
                  <td className="py-4 px-6">
                    <button className="btn bg-primary text-white ">Paid</button>
                  </td>
                )}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={8} className="text-center text-xl py-6 text-primary">
                No Data Found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default PayablePayment;
