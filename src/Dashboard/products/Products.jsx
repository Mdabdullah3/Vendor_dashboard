import React, { useState } from "react";
import { FiPlus, FiEdit, FiTrash } from "react-icons/fi";
import { vendorProducts } from "../../utils/constant";
import { Link } from "react-router-dom";
import InputSearch from "../../components/common/InputSearch";

const ProductAdminPanel = () => {
  const [products, setProducts] = useState(vendorProducts);
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (value) => {
    setSearchTerm(value);
  };
  return (
    <section>
      <div className="flex">
        <main className="flex-1 p-6">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold mb-6">Products</h1>
            <Link
              to="/admin/add-product"
              className="bg-blue-600 text-white px-4 py-2 rounded mb-6 flex items-center"
            >
              <FiPlus className="mr-2" />
              Add Product
            </Link>
          </div>
          <div className="flex-1 mb-4">
            <InputSearch
              placeholder="Search For Products.."
              value={searchTerm}
              onChange={(value) => setSearchTerm(value)}
              onSearch={handleSearch}
            />
          </div>
          <table className="table-auto w-full bg-white shadow-lg rounded-lg overflow-hidden">
            <thead className="bg-gray-800 text-white">
              <tr>
                <th className="px-4 py-2">Image</th>
                <th className="px-4 py-2">Name</th>
                <th className="px-4 py-2">Quantity</th>
                <th className="px-4 py-2">SKU</th>
                <th className="px-4 py-2">Price</th>
                <th className="px-4 py-2">Status</th>
                <th className="px-4 py-2">Date</th>
                <th className="px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id} className="border-b">
                  <td className="px-4 py-2">
                    <img
                      src={product.img}
                      alt={product.name}
                      className="w-12 h-12 rounded"
                    />
                  </td>
                  <td className="px-4 py-2">{product.name}</td>
                  <td className="px-4 py-2">{product.quantity}</td>
                  <td className="px-4 py-2">{product.sku}</td>
                  <td className="px-4 py-2">${product.price}</td>
                  <td className="px-4 py-2 capitalize">{product.status}</td>
                  <td className="px-4 py-2">{product.date}</td>
                  <td className="px-4 py-2 flex space-x-2">
                    <button className="text-yellow-500">
                      <FiEdit />
                    </button>
                    <button className="text-red-500">
                      <FiTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </main>
      </div>
    </section>
  );
};

export default ProductAdminPanel;
