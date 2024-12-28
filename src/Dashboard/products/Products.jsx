import React, { useEffect } from "react";
import { FiPlus, FiEdit } from "react-icons/fi";
import { Link } from "react-router-dom";
import InputSearch from "../../components/common/InputSearch";
import useProductStore from "../../store/ProductStore";
import { SERVER } from "../../config";
import useUserStore from "../../store/AuthStore";
const ProductAdminPanel = () => {
  const { user, fetchUser } = useUserStore();
  const {
    products,
    fetchProductByIdForUser,
    totalPages,
    limit,
    searchTerm,
    setSearchTerm,
    page,
    setPage,
  } = useProductStore();
  useEffect(() => {
    fetchUser();
    if (user?._id) {
      fetchProductByIdForUser(user._id, page, limit, searchTerm);
    }
  }, [user?._id, fetchUser, page, limit, searchTerm, fetchProductByIdForUser]);

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
  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
    }
  };
  return (
    <section>
      <div className="flex">
        <main className="flex-1 md:p-6">
          <div className="flex justify-between items-center">
            <h1 className="lg:text-3xl text-xl font-bold mb-6">Products</h1>
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
          <div className="overflow-auto">
            <table className="table-auto w-full bg-white shadow-lg rounded-lg ">
              <thead className="bg-gray-800 text-white">
                <tr>
                  <th className="px-4 py-2">Image</th>
                  <th className="px-4 py-2">Name</th>
                  <th className="px-4 py-2">Quantity</th>
                  <th className="px-4 py-2">Status</th>
                  <th className="px-4 py-2">Price</th>
                  <th className="px-4 py-2">Date</th>
                  <th className="px-4 py-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {products?.length > 0 ? (
                  products?.map((product) => (
                    <tr key={product?._id} className="border-b">
                      <td className="px-4 py-2">
                        <img
                          src={`${SERVER}${product?.coverPhoto?.secure_url}`}
                          alt={product?.name}
                          className="w-12 h-12 rounded"
                        />
                      </td>
                      <td className="px-4 py-2">{product?.name}</td>
                      <td className="px-4 py-2">
                        {product?.productVariants
                          ? product?.productVariants[0]?.quantity
                          : 0}
                      </td>
                      <td className="px-4 py-2">{product?.status}</td>
                      <td className="px-4 py-2">
                        BDT{" "}
                        {product?.productVariants
                          ? product?.productVariants[0]?.price
                          : 0}
                      </td>
                      <td className="px-4 py-2">
                        {formatDate(product?.createdAt)}
                      </td>
                      <td className="px-4 py-2 ">
                        <Link to={`/admin/edit-product/${product?._id}`}>
                          <div className="flex items-center space-x-2 cursor-pointer">
                            <button className="text-yellow-500">
                              <FiEdit />
                            </button>
                            <h1>Edit</h1>
                          </div>
                        </Link>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={7}
                      className="px-4 py-2 text-center my-3 text-semibold text-red-500"
                    >
                      No Products Found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          <div className="flex justify-center items-center mt-12">
            {/* Previous Button */}
            <button
              className="px-4 py-2 mx-1 text-sm bg-primary rounded hover:bg-primary/70 text-white"
              onClick={() => handlePageChange(page - 1)}
              disabled={page <= 1}
            >
              Previous
            </button>

            {/* Page Numbers */}
            {Array.from({ length: totalPages }, (_, index) => {
              const pageNumber = index + 1;
              return (
                <button
                  key={pageNumber}
                  className={`px-4 py-2 mx-1 text-sm rounded ${
                    pageNumber === page
                      ? "bg-primary text-white"
                      : "bg-gray-300 hover:bg-gray-400"
                  }`}
                  onClick={() => handlePageChange(pageNumber)}
                  disabled={pageNumber === page} // Disable the active page button
                >
                  {pageNumber}
                </button>
              );
            })}

            {/* Next Button */}
            <button
              className="px-4 py-2 mx-1 text-sm bg-primary rounded hover:bg-primary/70 text-white"
              onClick={() => handlePageChange(page + 1)}
              disabled={page >= totalPages}
            >
              Next
            </button>
          </div>
        </main>
      </div>
    </section>
  );
};

export default ProductAdminPanel;
