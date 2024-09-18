import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useOrderStore from "../../store/OrderStore";
import InputSearch from "../../components/common/InputSearch";
import Loading from "../../components/common/Loading";
import TableHead from "../../components/common/TableHead";

const CustomerOrders = ({ id }) => {
  const [activeMenu, setActiveMenu] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  const {
    userOrders,
    fetchUserOrders,
    updateOrderStatus,
    totalPages,
    loading,
    page,
    setPage,
  } = useOrderStore();

  console.log(userOrders);
  useEffect(() => {
    const status = activeMenu === "all" ? "" : activeMenu;
    fetchUserOrders(id, { status, page });
  }, [activeMenu, page, fetchUserOrders, id]);

  const handleMenuClick = (value) => {
    setActiveMenu(value);
  };

  const handleSearch = (value) => {
    setSearchTerm(value);
  };

  const handleStatusChange = (orderId, newStatus) => {
    updateOrderStatus(orderId, { status: newStatus });
  };

  // Filter orders based on search term
  const filteredOrders = userOrders?.filter((order) =>
    order?._id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const header = [
    "Order ID",
    "Order Date",
    "Payment Method",
    "Price",
    "Status",
    "Action",
  ];

  const menu = [
    { id: 1, name: "All", value: "all" },
    { id: 2, name: "Pending", value: "pending" },
    { id: 3, name: "Shipped", value: "shipped" },
    { id: 4, name: "Delivered", value: "completed" },
    { id: 5, name: "Cancelled", value: "cancelled" },
  ];

  return (
    <section className="py-5">
      <InputSearch
        placeholder="Search For Product.."
        value={searchTerm}
        onChange={handleSearch}
      />
      <div className="flex items-center justify-center border-b-2 gap-10 mt-10 flex-wrap">
        {menu.map((item) => (
          <button
            key={item.id}
            onClick={() => handleMenuClick(item.value)}
            className={`font-bold pb-2 ${
              activeMenu === item.value
                ? "text-primary border-b-2 border-primary"
                : ""
            }`}
          >
            {item.name}
          </button>
        ))}
      </div>

      {loading ? (
        <Loading />
      ) : filteredOrders.length === 0 ? (
        <h1 className="text-center text-red-600 py-4 text-2xl">
          No Orders Found
        </h1>
      ) : (
        <div className="overflow-auto">
          <table className="table-auto w-full mt-10">
            <TableHead header={header} />
            {filteredOrders.map((item) => (
              <tbody key={item?._id}>
                <tr className="border-r border-l border-gray-300 border-b">
                  <td className="text-center text-dark font-medium py-5">
                    {item?._id}
                  </td>
                  <td className="text-center text-dark font-medium py-5">
                    {item?.date}
                  </td>
                  <td className="text-center text-dark font-medium py-5">
                    {item?.paymentType}
                  </td>
                  <td className="text-center text-dark font-medium py-5">
                    {item?.price}
                  </td>
                  <td className="text-center text-dark font-medium py-5 capitalize">
                    <select
                      value={item?.status}
                      onChange={(e) =>
                        handleStatusChange(item?._id, e.target.value)
                      }
                      className="border border-gray-300 p-2 rounded"
                    >
                      <option value="pending">Pending</option>
                      <option value="shipped">Shipped</option>
                      <option value="completed">Delivered</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </td>
                  <td className="text-center text-dark font-medium py-5">
                    <Link to={`/admin/order-details/${item?._id}`}>
                      <button className="bg-primary text-white px-5 py-1.5 rounded-lg">
                        Details
                      </button>
                    </Link>
                  </td>
                </tr>
              </tbody>
            ))}
          </table>

          {/* Pagination Controls */}
          <div className="flex justify-center mt-4">
            <button
              className="px-4 py-2 mx-2 bg-gray-300 rounded hover:bg-gray-400"
              disabled={page <= 1}
              onClick={() => setPage(page - 1)}
            >
              Prev
            </button>
            {Array.from({ length: totalPages }, (_, index) => {
              const pageNumber = index + 1;
              return (
                <button
                  key={pageNumber}
                  className={`px-4 py-2 mx-2 rounded ${
                    pageNumber === page
                      ? "bg-primary text-white"
                      : "bg-gray-300 hover:bg-gray-400"
                  }`}
                  onClick={() => setPage(pageNumber)}
                >
                  {pageNumber}
                </button>
              );
            })}
            <button
              className="px-4 py-2 mx-2 bg-gray-300 rounded hover:bg-gray-400"
              disabled={page >= totalPages}
              onClick={() => setPage(page + 1)}
            >
              Next
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default CustomerOrders;
