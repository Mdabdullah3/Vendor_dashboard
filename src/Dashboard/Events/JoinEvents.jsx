import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import useUserStore from "../../store/AuthStore";
import { toast } from "react-toastify";
import useProductStore from "../../store/ProductStore";
import axios from "axios";
import { API_URL, SERVER } from "../../config";
import useEventStore from "../../store/EventStore";

const JoinEvents = () => {
  const { id } = useParams();
  const { user, fetchUser } = useUserStore();
  const { event, fetchEventById } = useEventStore();
  const { products, fetchProductByIdForUser } = useProductStore();
  const [selectedProducts, setSelectedProducts] = useState([]);

  useEffect(() => {
    fetchUser();
    fetchEventById(id);
    fetchProductByIdForUser(user?._id);
  }, [fetchEventById, fetchUser, id, fetchProductByIdForUser, user?._id]);

  const handleSelectProduct = (product) => {
    const currentDate = new Date();
    const eventEndDate = new Date(event?.endDate);

    if (eventEndDate < currentDate) {
      toast.error("Cannot add products, the event has already ended!");
      return;
    }

    setSelectedProducts((prev) => [...prev, product]);
  };

  const handleRemoveProduct = (productId) => {
    setSelectedProducts((prev) => prev.filter((p) => p.id !== productId));
  };

  const handleAddProductsToEvent = async () => {
    try {
      const eventProducts = selectedProducts.map((product) => ({
        product: product._id,
        user: user._id,
        event: id,
      }));
      const response = await axios.post(
        `${API_URL}/event-products`,
        eventProducts
      );
      if (response.status === 201) {
        toast.success("Products added to the event successfully!");
      }
    } catch (error) {
      toast.error("Failed to add products to the event.");
    }
  };
  const isProductInEvent = (productId) => {
    return event?.eventProducts?.some(
      (eventProduct) => eventProduct.product === productId
    );
  };
  const onPaymentProcess = () => {};
  return (
    <div className="flex h-screen">
      <div className="flex-1 p-10">
        <div className="mb-10">
          <h1 className="text-3xl font-bold mb-4">Package Details</h1>
          <div className="bg-white shadow-lg rounded-lg p-6 border border-gray-200">
            <h2 className="text-xl font-semibold mb-3 capitalize">
              {event?.name}
            </h2>
            <p>
              <span className="font-medium mb-2">Duration:</span>{" "}
              {new Date(event?.startDate).toLocaleDateString()} -{" "}
              {new Date(event?.endDate).toLocaleDateString()}
            </p>
            <p>
              <span className="font-medium mb-2">Price:</span> BDT{" "}
              {event?.price}
            </p>
            <p>
              <span className="font-medium">Status:</span> {event?.status}
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <ProductList
            isProductInEvent={isProductInEvent}
            products={products}
            selectedProducts={selectedProducts}
            onSelectProduct={handleSelectProduct}
          />
          <SelectedProducts
            event={event}
            selectedProducts={selectedProducts}
            onRemoveProduct={handleRemoveProduct}
            onPayment={handleAddProductsToEvent}
            onPaymentProcess={onPaymentProcess}
          />
        </div>
      </div>
    </div>
  );
};

const ProductList = ({
  products,
  selectedProducts,
  isProductInEvent,
  onSelectProduct,
}) => {
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
            <img
              src={`${SERVER}${product?.coverPhoto?.secure_url}`}
              alt=""
              className="w-12 h-12 rounded"
            />
            <span className="capitalize">{product?.name?.slice(0, 20)}</span>
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
                ? "Already in Event"
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
  event,
  onRemoveProduct,
  onPayment,
  onPaymentProcess,
}) => {
  return (
    <div className="bg-white shadow-lg rounded-lg p-6 border border-gray-200">
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
            <span>{product?.name.slice(0, 20)}</span>
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
        {event?.price > 0 ? (
          <button
            className="w-full px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
            onClick={onPaymentProcess}
          >
            Buy Now
          </button>
        ) : (
          <button
            className="w-full px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
            onClick={onPayment}
          >
            Add Products
          </button>
        )}
      </div>
    </div>
  );
};

export default JoinEvents;
