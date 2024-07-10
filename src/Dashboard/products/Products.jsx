import React, { useEffect } from "react";
import { FiPlus, FiEdit } from "react-icons/fi";
import { Link } from "react-router-dom";
import InputSearch from "../../components/common/InputSearch";
import useProductStore from "../../store/ProductStore";
import { SERVER } from "../../config";
import Loading from "../../components/common/Loading";

const ProductAdminPanel = () => {
  const {
    products,
    fetchProducts,
    totalProducts,
    page,
    limit,
    searchTerm,
    setPage,
    setLimit,
    setSearchTerm,
    setSort,
    loading,
  } = useProductStore();

  useEffect(() => {
    fetchProducts();
  }, [page, limit, searchTerm, setSort]);

  const handleSearch = (value) => {
    setSearchTerm(value);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };
  if (loading) return <Loading />;

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
              onChange={(value) => handleSearch(value)}
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
                <th className="px-4 py-2">Date</th>
                <th className="px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product._id} className="border-b">
                  <td className="px-4 py-2">
                    <img
                      src={`${SERVER}${product?.coverPhoto.secure_url}`}
                      alt={product.name}
                      className="w-12 h-12 rounded"
                    />
                  </td>
                  <td className="px-4 py-2">{product.name}</td>
                  <td className="px-4 py-2">{product.quantity}</td>
                  <td className="px-4 py-2">{product.vendorId}</td>
                  <td className="px-4 py-2">${product.price}</td>
                  <td className="px-4 py-2">{formatDate(product.createdAt)}</td>
                  <td className="px-4 py-2 ">
                    <Link to={`/admin/update-product/${product._id}`}>
                      <div className="flex items-center space-x-2 cursor-pointer">
                        <button className="text-yellow-500">
                          <FiEdit />
                        </button>
                        <h1>Edit</h1>
                      </div>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="mt-8 flex justify-center">
            <div>
              <button
                onClick={() => setPage(page - 1)}
                disabled={page === 1}
                className="bg-gray-300 px-4 py-2 rounded"
              >
                Previous
              </button>
              <span className="mx-2 px-4 py-2 border-gray-400 border rounded-lg ">
                {page}
              </span>
              <button
                onClick={() => setPage(page + 1)}
                disabled={page * limit >= totalProducts}
                className="bg-gray-300 px-4 py-2 rounded"
              >
                Next
              </button>
            </div>
          </div>
        </main>
      </div>
    </section>
  );
};

export default ProductAdminPanel;
