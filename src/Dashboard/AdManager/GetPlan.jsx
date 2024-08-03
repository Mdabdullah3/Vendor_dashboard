import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import useProductStore from "../../store/ProductStore";
import useUserStore from "../../store/AuthStore";

const GetPlan = () => {
  const packageData = [
    {
      id: 1,
      packageName: "Basic",
      duration: "1 Month",
      price: "432",
      image: "",
      maxProduct: "10",
      status: "active",
    },
  ];

  const [packageDetails, setPackageDetails] = useState(packageData[0]);
  const { id } = useParams();

  const { user } = useUserStore();
  const { products, fetchProducts } = useProductStore();
  const [selectedProducts, setSelectedProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts, user?._id]);

  const handleSelectProduct = (product) => {
    setSelectedProducts((prev) => [...prev, product]);
  };

  const handleRemoveProduct = (productId) => {
    setSelectedProducts((prev) => prev.filter((p) => p.id !== productId));
  };

  const handlePayment = () => {
    // Implement payment logic
  };

  return (
    <div className="flex h-screen">
      <div className="flex-1 p-10">
        <div className="mb-10">
          <h1 className="text-3xl font-bold mb-4">Package Details</h1>
          <div className="bg-white shadow-lg rounded-lg p-6 border border-gray-200">
            <h2 className="text-xl font-semibold mb-3">
              {packageDetails.packageName}
            </h2>
            <p>
              <span className="font-medium mb-2">Duration:</span>{" "}
              {packageDetails.duration}
            </p>
            <p>
              <span className="font-medium mb-2">Price:</span> $
              {packageDetails.price}
            </p>
            <p>
              <span className="font-medium">Max Products:</span>{" "}
              {packageDetails.maxProduct}
            </p>
            <p>
              <span className="font-medium">Status:</span>{" "}
              {packageDetails.status}
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <ProductList
            products={products}
            selectedProducts={selectedProducts}
            onSelectProduct={handleSelectProduct}
          />
          <SelectedProducts
            selectedProducts={selectedProducts}
            onRemoveProduct={handleRemoveProduct}
            onPayment={handlePayment}
          />
        </div>
      </div>
    </div>
  );
};

const ProductList = ({ products, selectedProducts, onSelectProduct }) => {
  const isProductSelected = (productId) => {
    return selectedProducts.some((product) => product.id === productId);
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-6 border border-gray-200">
      <h2 className="text-2xl font-semibold mb-4">Available Products</h2>
      <ul>
        {products.map((product) => (
          <li
            key={product.id}
            className="flex justify-between items-center py-2 border-b border-gray-200"
          >
            <span className="capitalize">{product.name}</span>
            <button
              className={`px-4 py-2 ${
                isProductSelected(product.id) ? "bg-gray-400" : "bg-blue-500"
              } text-white rounded-lg ${
                isProductSelected(product.id)
                  ? "cursor-not-allowed"
                  : "hover:bg-blue-600"
              }`}
              onClick={() =>
                !isProductSelected(product.id) && onSelectProduct(product)
              }
              disabled={isProductSelected(product.id)}
            >
              {isProductSelected(product.id) ? "Selected" : "Select"}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

const SelectedProducts = ({ selectedProducts, onRemoveProduct, onPayment }) => {
  return (
    <div className="bg-white shadow-lg rounded-lg p-6 border border-gray-200">
      <h2 className="text-2xl font-semibold mb-4">Selected Products</h2>
      <ul>
        {selectedProducts.map((product) => (
          <li
            key={product.id}
            className="flex justify-between items-center py-2 border-b border-gray-200 capitalize"
          >
            <span>{product.name}</span>
            <button
              className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
              onClick={() => onRemoveProduct(product.id)}
            >
              Remove
            </button>
          </li>
        ))}
      </ul>
      <div className="mt-6">
        <button
          className="w-full px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
          onClick={onPayment}
        >
          Proceed to Payment
        </button>
      </div>
    </div>
  );
};

export default GetPlan;
