import React, { useState, useEffect } from "react";
import InputSearch from "../../components/common/InputSearch";
import TableHead from "../../components/common/TableHead";
import { vendorOrder } from "../../utils/constant";

const OrderReview = () => {
  const [activeMenu, setActiveMenu] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredOrders, setFilteredOrders] = useState(vendorOrder);

  const handleMenuClick = (id) => {
    setActiveMenu(id);
  };

  const handleSearch = (value) => {
    setSearchTerm(value);
  };

  useEffect(() => {
    const filterOrders = () => {
      let orders = vendorOrder;

      switch (activeMenu) {
        case 2:
          orders = orders.filter((order) => order.status === "pending");
          break;
        case 3:
          orders = orders.filter((order) => order.status === "way");
          break;
        case 4:
          orders = orders.filter((order) => order.status === "Shipping");
          break;
        case 5:
          orders = orders.filter((order) => order.status === "delivered");
          break;
        case 6:
          orders = orders.filter((order) => order.status === "cancel");
          break;
        case 7:
          orders = orders.filter((order) => order.status === "return");
          break;
        case 8:
          orders = orders.filter((order) => order.status === "failed");
          break;
        default:
          break;
      }

      if (searchTerm) {
        orders = orders.filter((order) =>
          order.orderId.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }

      setFilteredOrders(orders);
    };

    filterOrders();
  }, [activeMenu, searchTerm]);

  const header = [
    "Order ID",
    "Order Date",
    "Payment Method",
    "Price",
    "Status",
    "Action",
  ];

  const menu = [
    { id: 1, name: "All", items: vendorOrder.length },
    {
      id: 2,
      name: "Pending",
      items: vendorOrder.filter((product) => product.status === "pending")
        .length,
    },
    {
      id: 3,
      name: "Ready To Ship",
      items: vendorOrder.filter((product) => product.status === "way").length,
    },
    {
      id: 4,
      name: "Shipping",
      items: vendorOrder.filter((product) => product.status === "Shipping")
        .length,
    },
    {
      id: 5,
      name: "Delivered",
      items: vendorOrder.filter((product) => product.status === "delivered")
        .length,
    },
    {
      id: 6,
      name: "Cancelled",
      items: vendorOrder.filter((product) => product.status === "cancel")
        .length,
    },
    {
      id: 7,
      name: "Return",
      items: vendorOrder.filter((product) => product.status === "return")
        .length,
    },
    {
      id: 8,
      name: "Failed",
      items: vendorOrder.filter((product) => product.status === "failed")
        .length,
    },
  ];

  return (
    <section className="py-5">
      <InputSearch
        placeholder="Search For Product.."
        value={searchTerm}
        onChange={(value) => handleSearch(value)}
        onSearch={handleSearch}
      />
      <div className="flex items-center justify-center border-b-2 gap-10 mt-10">
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
      {filteredOrders.length === 0 ? (
        <h1 className="text-center text-red-600 py-4 text-2xl">
          No Orders Found
        </h1>
      ) : (
        <table className="table-auto w-full overflow-auto mt-10">
          <TableHead header={header} />
          {filteredOrders.map((item) => (
            <tbody key={item.id}>
              <tr className="border-r border-l border-gray-300 border-b">
                <td className="text-center text-dark font-medium text-secondary py-5 text-sm bg-transparent border-b border-l border-r border-gray-300">
                  {item.orderId}
                </td>
                <td className="text-center text-dark font-medium text-secondary py-5 px-2 bg-transparent border-b border-r border-gray-300">
                  {item.date}
                </td>
                <td className="text-center text-dark font-medium text-secondary py-5 px-2 bg-transparent border-b border-r border-gray-300">
                  {item.paymentMethod}
                </td>
                <td className="text-center text-dark font-medium text-secondary py-5 px-2 cursor-pointer bg-transparent border-b border-r border-gray-300">
                  {item.total}
                </td>
                <td className="text-center text-dark font-medium text-secondary py-5 px-2 cursor-pointer bg-transparent border-b border-r border-gray-300">
                  {item.status}
                </td>
                <td className="text-center text-dark font-medium text-secondary py-5 px-2 cursor-pointer bg-transparent border-b border-r border-gray-300">
                  <button className="bg-primary text-white px-5 py-1.5 rounded-lg">
                    Details
                  </button>
                </td>
              </tr>
            </tbody>
          ))}
        </table>
      )}
    </section>
  );
};

export default OrderReview;
