import React, { useEffect } from "react";
import useProductStore from "../../store/ProductStore";
import useUserStore from "../../store/AuthStore";

const MessageCenter = () => {
  const { user, fetchUser } = useUserStore();
  const { products, fetchProductByIdForUser } = useProductStore();
  const { fetchReviewsByProduct, reviews } = useProductStore();

  useEffect(() => {
    fetchUser();
    fetchProductByIdForUser(user._id);
    fetchReviewsByProduct();
  });
  return (
    <div>
      <h1>Message Center</h1>
    </div>
  );
};

export default MessageCenter;
