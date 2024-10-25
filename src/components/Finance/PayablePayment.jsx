import React, { useEffect, useState } from "react";
import useOrderStore from "../../store/OrderStore";
import Loading from "../common/Loading";
import useUserStore from "../../store/AuthStore";

const PayablePayment = () => {
  const { user, fetchUser } = useUserStore();
  const { userOrders, fetchAllVendorOrders, updateOrderStatus } =
    useOrderStore();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUserAndOrders = async () => {
      setLoading(true);
      await fetchUser();
      setLoading(false);
    };
    loadUserAndOrders();
  }, [fetchUser]);

  useEffect(() => {
    if (user?._id) {
      const loadOrdersForUser = async () => {
        setLoading(true);
        await fetchAllVendorOrders(user?._id, {
          status: "",
          page: 1,
          limit: 20,
        });
        setLoading(false);
      };
      loadOrdersForUser();
    }
  }, [user, fetchAllVendorOrders]);

  const header = [
    "No",
    "Order Cost",
    "Vat",
    "Commission",
    "Transaction Fee",
    "Shipping Cost",
    "Profit",
    "Status",
    "Action",
  ];

  const handlePay = async (orderId) => {
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
            userOrders?.map((finance, index) => (
              <tr
                key={finance?._id}
                className="border-b border-gray-200 capitalize"
              >
                <td className="py-4 px-6">{index + 1}</td>
                <td className="py-4 px-6">{finance?.price}</td>
                <td className="py-4 px-6">{finance?.vat}</td>
                <td className="py-4 px-6">{finance?.commission}</td>
                <td className="py-4 px-6">{finance?.transactionCost}</td>
                <td className="py-4 px-6">{finance?.shippingCharge}</td>
                <td className="py-4 px-6">
                  {finance?.profit ? Number(finance.profit).toFixed(2) : "0.00"}
                </td>
                <td className="py-4 px-6">{finance?.status}</td>
                <td className="py-4 px-6">
                  {finance?.status === "cancelled" ? (
                    <button className="cursor-not-allowed bg-primary text-white btn">
                      Cancel
                    </button>
                  ) : finance.vendorPaid === "unpaid" ? (
                    <button
                      className="bg-green-500 text-white btn"
                      onClick={() => handlePay(finance?._id)}
                    >
                      pay
                    </button>
                  ) : (
                    <button className="bg-primary text-white btn cursor-not-allowed">
                      paid
                    </button>
                  )}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan={header.length}
                className="text-center text-xl py-6 text-primary"
              >
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
