import React, { useState, useEffect } from "react";
import InputSearch from "../../common/InputSearch";
import TableHead from "../../../components/common/TableHead";
import { vendorProducts } from "../../../utils/constant";

const Products = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeMenu, setActiveMenu] = useState(1);
  const [filteredProducts, setFilteredProducts] = useState(vendorProducts);

  const handleMenuClick = (id) => {
    setActiveMenu(id);
  };

  const handleSearch = (value) => {
    setSearchTerm(value);
  };

  useEffect(() => {
    const filterProducts = () => {
      let filtered = vendorProducts;

      switch (activeMenu) {
        case 2:
          filtered = filtered.filter(
            (product) => product.status === "approved"
          );
          break;
        case 3:
          filtered = filtered.filter((product) => product.status === "pending");
          break;
        case 4:
          filtered = filtered.filter((product) => product.status === "suspend");
          break;
        case 5:
          filtered = filtered.filter((product) => product.status === "delete");
          break;
        default:
          break;
      }

      if (searchTerm) {
        filtered = filtered.filter((product) =>
          product.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }

      return filtered;
    };

    setFilteredProducts(filterProducts());
  }, [activeMenu, searchTerm]);

  const header = [
    "Image",
    "Product Name",
    "Sku",
    "Price",
    "Status",
    "Date",
    "Action",
  ];

  const menu = [
    { id: 1, name: "All", items: vendorProducts.length },
    {
      id: 2,
      name: "Online",
      items: vendorProducts.filter((product) => product.status === "approved")
        .length,
    },
    {
      id: 3,
      name: "Pending",
      items: vendorProducts.filter((product) => product.status === "pending")
        .length,
    },
    {
      id: 4,
      name: "Suspended",
      items: vendorProducts.filter((product) => product.status === "suspend")
        .length,
    },
    {
      id: 5,
      name: "Deleted",
      items: vendorProducts.filter((product) => product.status === "delete")
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
      <div>
        {filteredProducts.length === 0 ? (
          <>
            <h1 className="text-center text-red-600 py-4 text-2xl">
              No Products Found
            </h1>
          </>
        ) : (
          <>
            <table className="table-auto w-full overflow-auto mt-10">
              <TableHead header={header} />
              {filteredProducts.map((item) => (
                <tbody key={item.id}>
                  <tr className="border-r border-l border-gray-300 border-b">
                    <td>
                      <img
                        className="w-20 h-20 mx-auto"
                        src={item.img}
                        alt={item.name}
                      />
                    </td>
                    <td className="text-center text-dark font-medium text-secondary py-5 text-sm bg-transparent border-b border-l border-r border-gray-300">
                      {item.name}
                    </td>
                    <td className="text-center text-dark font-medium text-secondary py-5 px-2 bg-transparent border-b border-r border-gray-300">
                      {item.sku}
                    </td>
                    <td className="text-center text-dark font-medium text-secondary py-5 px-2 bg-transparent border-b border-r border-gray-300">
                      {item.price}
                    </td>
                    <td className="text-center text-dark font-medium text-secondary py-5 px-2 cursor-pointer bg-transparent border-b border-r border-gray-300">
                      {item.status}
                    </td>
                    <td className="text-center text-dark font-medium text-secondary py-5 px-2 cursor-pointer bg-transparent border-b border-r border-gray-300">
                      {item.date}
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
          </>
        )}
      </div>
    </section>
  );
};

export default Products;
