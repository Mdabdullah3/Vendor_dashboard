import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import useEventStore from "../../store/EventStore";
import useEventProductStore from "../../store/EventProductStore";
import useUserStore from "../../store/AuthStore";
import useProductStore from "../../store/ProductStore";
import { SERVER } from "../../config";

const JoinEvents = () => {
  const { id } = useParams();
  const { fetchEventById, event } = useEventStore();
  const { user, fetchUser } = useUserStore();
  const { product, fetchProductByIdForUser } = useProductStore();
  const {
    fetchEventProducts,
    createEventProduct,
    eventProducts,
    deleteEventProduct,
  } = useEventProductStore();
  useEffect(() => {
    fetchEventById(id);
    fetchEventProducts();
    fetchUser();
    fetchProductByIdForUser(user?._id);
  }, [
    fetchEventById,
    fetchProductByIdForUser,
    fetchUser,
    user?._id,
    fetchEventProducts,
    id,
  ]);

  const handleAddProduct = (productId) => {
    createEventProduct({
      user: user?._id,
      product: productId,
      event: id,
      name: event.name,
    });
  };

  const handleRemoveProduct = (productId) => {
    deleteEventProduct(productId);
  };
  const isProductAdded = (productId) => {
    return eventProducts?.some((ep) => ep.product === productId);
  };
  console.log(isProductAdded);
  return (
    <div className="flex flex-col items-center p-10 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">
        Manage Products for{" "}
        <span className="text-yellow-600">{event?.name}</span>
      </h1>
      <div className="w-full max-w-3xl bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Available Products</h2>
        <div className="">
          {product?.map((product) => (
            <div
              key={product.id}
              className="flex gap-2  items-center bg-gray-100 p-4 rounded-lg shadow-sm justify-between"
            >
              <img
                src={`${SERVER}${product?.coverPhoto.secure_url}`}
                alt={product.name}
                className="w-20 h-20 rounded-lg"
              />
              <h3 className="text-lg  mb-2">{product.name}</h3>
              {isProductAdded(product._id) ? (
                <button
                  onClick={() => handleRemoveProduct(product._id)}
                  className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                >
                  Remove
                </button>
              ) : (
                <button
                  onClick={() => handleAddProduct(product._id)}
                  className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
                >
                  Add
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default JoinEvents;
