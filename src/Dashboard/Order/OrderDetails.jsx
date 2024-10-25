import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import useOrderStore from "../../store/OrderStore";
import { SERVER } from "../../config";

const OrderDetails = () => {
  const { id } = useParams();
  const { fetchOrderById, singleOrder } = useOrderStore();

  useEffect(() => {
    fetchOrderById(id);
  }, [id, fetchOrderById]);

  if (!singleOrder) {
    return <div>Loading...</div>;
  }

  const {
    shippingInfo,
    product,
    variantId,
    status,
    price,
    currency,
    paymentType,
    quantity,
    transactionId,
  } = singleOrder;

  const orderedVariant = product?.productVariants.find(
    (variant) => variant._id === variantId
  );

  return (
    <div className="container mx-auto p-6 capitalize">
      {/* Order Details Header */}
      <div>
        <h1 className="text-3xl font-bold mb-4 text-center">Order Details</h1>
      </div>
      <div className="text-center mb-6">
        <span
          className={`status-badge ${
            status === "cancelled" ? "bg-red-500" : "bg-green-500"
          } text-white py-1 px-3 rounded`}
        >
          {status.toUpperCase()}
        </span>
        <p className="mt-2 text-sm text-gray-600">Order ID: {id}</p>
      </div>

      {/* Shipping Information */}
      <div className="bg-white shadow rounded-lg p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Shipping Information</h2>
        <p>
          <strong>Name:</strong> {shippingInfo.name}
        </p>
        <p>
          <strong>Email:</strong> {shippingInfo.email}
        </p>
        <p>
          <strong>Phone:</strong> {shippingInfo.phone}
        </p>
        <p>
          <strong>Address:</strong>{" "}
          {`${shippingInfo.address1}, ${shippingInfo.city}, ${shippingInfo.state}, ${shippingInfo.postcode}, ${shippingInfo.country}`}
        </p>
        <p>
          <strong>Delivery Method:</strong> {shippingInfo.method}
        </p>
        <p>
          <strong>Delivery Fee:</strong> {shippingInfo.deliveryFee} {currency}
        </p>
      </div>

      {/* Product Information */}
      <div className="bg-white shadow rounded-lg p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Product Information</h2>
        <div className="flex items-center">
          <img
            src={`${SERVER}${product?.coverPhoto?.secure_url}`}
            alt={product?.name}
            className="w-32 h-32 object-cover mr-4 rounded"
          />
          <div>
            <p className="font-bold text-lg ">{product?.name}</p>
            <p className="text-gray-600 mt-2">{product?.summary}</p>
          </div>
        </div>
      </div>

      <div className="bg-white shadow rounded-lg p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Ordered Variant</h2>
        {orderedVariant ? (
          <div className="flex items-center">
            <img
              src={`${SERVER}${orderedVariant?.image?.secure_url}`}
              alt={`${product?.name}`}
              className="w-32 h-32 object-cover mr-4 rounded"
            />
            <div>
              <p>
                <strong>Color:</strong> {orderedVariant?.color}
              </p>
              <p>
                <strong>Size:</strong> {orderedVariant?.size}
              </p>
              <p>
                <strong>Quantity:</strong> {quantity}
              </p>
              <p>
                <strong>Price:</strong> {parseFloat(price * quantity)}{" "}
                {currency}
              </p>
            </div>
          </div>
        ) : (
          <p>No variant data available.</p>
        )}
      </div>

      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Payment Information</h2>
        <p>
          <strong>Payment Type:</strong> {paymentType}
        </p>
        <p>
          <strong>Total Price:</strong> {price} {currency}
        </p>
      </div>
    </div>
  );
};

export default OrderDetails;
