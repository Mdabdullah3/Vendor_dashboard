import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import useProductStore from "../../store/ProductStore";
import useUserStore from "../../store/AuthStore";
import usePackageStore from "../../store/PackageStore";
import { toast } from "react-toastify";
import { API_URL, SERVER } from "../../config";
import axios from "axios";
import dayjs from "dayjs"; // for time handling
const GetPlan = () => {
  const { id } = useParams();
  const { singlePackage, fetchPackageById } = usePackageStore();
  const { user, fetchUser } = useUserStore();
  const { products, fetchProductByIdOrSlug } = useProductStore();
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [expiredProducts, setExpiredProducts] = useState([]);
  useEffect(() => {
    fetchUser();
    fetchProductByIdOrSlug(user?._id);
    fetchPackageById(id);

    const intervalId = setInterval(() => {
      if (singlePackage) {
        checkEventExpiration();
      }
    }, 60000); // Check every minute

    return () => clearInterval(intervalId);
  }, [
    fetchProductByIdOrSlug,
    fetchUser,
    fetchPackageById,
    id,
    user?._id,
    singlePackage,
  ]);

  const checkEventExpiration = () => {
    const eventCreationDate = dayjs(singlePackage?.createdAt);
    const eventDurationHours = singlePackage?.duration; // duration in hours
    const eventEndTime = eventCreationDate.add(eventDurationHours, "hour");
    const now = dayjs();

    if (now.isAfter(eventEndTime)) {
      deleteExpiredEventProducts();
    }
  };

  const deleteExpiredEventProducts = async () => {
    try {
      const expiredProductIds = singlePackage?.packageProducts?.map(
        (pkgProduct) => pkgProduct.product._id
      );

      if (expiredProductIds.length > 0) {
        await axios.post(
          `${API_URL}/package-products/${id}`,
          { id: expiredProductIds },
          { withCredentials: true }
        );
        toast.success("Expired products have been removed from the package.");
      }
    } catch (error) {
      toast.error("Failed to remove expired products.");
    }
  };

  const handleSelectProduct = (product) => {
    if (selectedProducts?.length < singlePackage?.maxProduct) {
      setSelectedProducts((prev) => [...prev, product]);
    } else {
      toast.error(
        `You can only select up to ${singlePackage?.maxProduct} products.`
      );
    }
  };

  const handleRemoveProduct = (productId) => {
    setSelectedProducts((prev) => prev.filter((p) => p.id !== productId));
  };

  const handleAddProductsToEvent = async () => {
    try {
      const eventProducts = selectedProducts.map((product) => ({
        product: product._id,
        user: user._id,
        package: id,
      }));

      const response = await axios.post(
        `${API_URL}/package-products`,
        eventProducts
      );
      if (response.status === 201) {
        toast.success("Products added to the Package successfully!");
      }
    } catch (error) {
      toast.error("Failed to add products to the event.");
    }
  };

  const onPaymentProcess = () => {
    toast.error("This Package is available for purchase!");
  };
  const isProductInEvent = (productId) => {
    return singlePackage?.packageProducts?.some(
      (pack) => pack?.product?._id === productId
    );
  };

  return (
    <div className="flex capitalize">
      <div className="flex-1 p-10">
        <div className="mb-10">
          <h1 className="text-3xl font-bold mb-4">Package Details</h1>
          <div className="bg-white shadow-lg rounded-lg p-6 border border-gray-200">
            <h2 className="text-xl font-semibold mb-3 capitalize">
              {singlePackage?.name}
            </h2>
            <p>
              <span className="font-medium mb-2">Duration:</span>
              {singlePackage?.duration} Hours
            </p>
            <p>
              <span className="font-medium mb-2">Price:</span> BDT
              {singlePackage?.price}
            </p>
            <p>
              <span className="font-medium">Max Products:</span>{" "}
              {singlePackage?.maxProduct}
            </p>
            <p>
              <span className="font-medium">Status:</span>{" "}
              {singlePackage?.status}
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <ProductList
            products={products}
            selectedProducts={selectedProducts}
            onSelectProduct={handleSelectProduct}
            isProductInEvent={isProductInEvent}
          />
          <SelectedProducts
            singlePackage={singlePackage}
            onPaymentProcess={onPaymentProcess}
            selectedProducts={selectedProducts}
            onRemoveProduct={handleRemoveProduct}
            handleAddProductsToEvent={handleAddProductsToEvent}
          />
        </div>
      </div>
    </div>
  );
};

const ProductList = ({
  products,
  selectedProducts,
  onSelectProduct,
  isProductInEvent,
}) => {
  const isProductSelected = (productId) => {
    return selectedProducts.some((product) => product.id === productId);
  };
  return (
    <div className="bg-white shadow-lg rounded-lg p-6 border capitalize border-gray-200">
      <h2 className="text-2xl font-semibold mb-4">Available Products</h2>
      <ul>
        {products.map((product) => (
          <li
            key={product.id}
            className="flex justify-between items-center py-2 border-b border-gray-200"
          >
            <img
              src={`${SERVER}${product?.coverPhoto?.secure_url}`}
              alt=""
              className="w-12 h-12 rounded"
            />
            <span className="capitalize">{product?.name.slice(0, 20)}</span>
            <button
              className={`px-4 py-2 ${
                isProductInEvent(product.id) || isProductSelected(product.id)
                  ? "bg-gray-400"
                  : "bg-blue-500"
              } text-white rounded-lg ${
                isProductInEvent(product.id)
                  ? "cursor-not-allowed"
                  : "hover:bg-blue-600"
              }`}
              onClick={() =>
                !isProductInEvent(product.id) &&
                !isProductSelected(product.id) &&
                onSelectProduct(product)
              }
              disabled={
                isProductInEvent(product.id) || isProductSelected(product.id)
              }
            >
              {isProductInEvent(product.id)
                ? "Already in Package"
                : isProductSelected(product.id)
                ? "Selected"
                : "Select"}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

const SelectedProducts = ({
  selectedProducts,
  onPaymentProcess,
  onRemoveProduct,
  handleAddProductsToEvent,
  singlePackage,
}) => {
  return (
    <div className="bg-white shadow-lg rounded-lg p-6 border border-gray-200 capitalize">
      <h2 className="text-2xl font-semibold mb-4">Selected Products</h2>
      <ul>
        {selectedProducts.map((product) => (
          <li
            key={product.id}
            className="flex justify-between items-center py-2 border-b border-gray-200 capitalize"
          >
            <img
              src={`${SERVER}${product?.coverPhoto?.secure_url}`}
              alt=""
              className="w-12 h-12 rounded"
            />
            <span>{product.name.slice(0, 20)}</span>
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
        {singlePackage?.price > 0 ? (
          <button
            className="w-full px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
            onClick={onPaymentProcess}
          >
            Buy Now
          </button>
        ) : (
          <button
            className="w-full px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
            onClick={handleAddProductsToEvent}
          >
            Add Products
          </button>
        )}
      </div>
    </div>
  );
};

export default GetPlan;
