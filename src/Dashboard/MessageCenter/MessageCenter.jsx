import React, { useEffect, useState } from "react";
import { formatDistanceToNow } from "date-fns";
import useUserStore from "../../store/AuthStore";
import useProductStore from "../../store/ProductStore";
import { SERVER } from "../../config";

const MessageCenter = () => {
  const { user, fetchUser } = useUserStore();
  const { products, fetchProductByIdForUser } = useProductStore();
  const [commentsWithReplies, setCommentsWithReplies] = useState([]);
  useEffect(() => {
    const fetchProductsAndReviews = async () => {
      await fetchUser();
      const userId = user?._id;
      if (userId) {
        await fetchProductByIdForUser(userId);

        const allReviews = products
          .filter((product) => product.reviews && product.reviews.length > 0)
          .flatMap((product) => product.reviews);

        const groupedComments = allReviews
          .filter((review) => !review.replyTo) // Filter only top-level comments
          .map((comment) => ({
            ...comment,
            replies: allReviews.filter(
              (reply) => reply.replyTo?._id === comment._id
            ), // Attach replies to each comment
          }));

        setCommentsWithReplies(groupedComments);
      }
    };

    fetchProductsAndReviews();
  }, [fetchUser, fetchProductByIdForUser, user?._id, products]);

  const handleReply = (productId) => {
    const url = `https://readyhow.com/products/${productId}`;
    window.open(url, "_blank");
  };

  const formatCommentDate = (date) => {
    return formatDistanceToNow(new Date(date), { addSuffix: true });
  };
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Product Comments and Replies</h1>
      <div className="grid grid-cols-3 gap-5 items-start">
        {commentsWithReplies.length > 0 ? (
          commentsWithReplies.map((comment, index) => (
            <div
              key={index}
              className="bg-white shadow-lg rounded-lg p-6 mb-6"
              style={{ transition: "0.3s ease-in-out", marginBottom: "20px" }}
            >
              {/* Main Comment */}
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <img
                    src={
                      comment?.user?.avatar?.public_id &&
                      comment?.user?.avatar?.secure_url.startsWith("/")
                        ? `${SERVER}${comment?.user?.avatar?.secure_url}`
                        : comment?.user?.avatar?.secure_url
                    }
                    className="w-12 h-12 rounded-full mr-4"
                    alt="Avatar"
                  />
                  <div>
                    <p className="text-gray-900  capitalize">
                      {comment.user.name}
                    </p>
                  </div>
                </div>
                {/* Date Display */}
                <p className="text-gray-500 text-sm">
                  {formatCommentDate(comment.createdAt)}{" "}
                  {/* Modern relative date */}
                </p>
              </div>
              <p className="text-gray-700 capitalize my-2 font-semibold">
                {comment.comment}
              </p>
              <hr />
              {/* Replies Section */}
              {comment.replies.length > 0 && (
                <div className="ml-10 mt-4">
                  <p className="text-gray-900 font-medium">
                    {comment.replies.length}{" "}
                    {comment.replies.length > 1 ? "Replies" : "Reply"}:
                  </p>
                  {comment.replies.map((reply, replyIndex) => (
                    <div key={replyIndex} className="mt-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <img
                            src={
                              reply?.user?.avatar?.public_id &&
                              reply?.user?.avatar?.secure_url.startsWith("/")
                                ? `${SERVER}${reply?.user?.avatar?.secure_url}`
                                : reply?.user?.avatar?.secure_url
                            }
                            alt="Reply Avatar"
                            className="w-8 h-8 rounded-full mr-4"
                          />
                          <div>
                            <p className="text-gray-900 capitalize">
                              {reply.user.name}
                            </p>
                          </div>
                        </div>
                        {/* Date Display for Replies */}
                        <p className="text-gray-500 text-[13px]">
                          {formatCommentDate(reply.createdAt)}
                        </p>
                      </div>
                      <p className="text-gray-700 capitalize font-semibold my-2">
                        {reply.comment}
                      </p>
                      {replyIndex < comment.replies.length - 1 && <hr />}
                    </div>
                  ))}
                </div>
              )}

              {/* Reply Button */}
              <div className="mt-6">
                <button
                  className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600"
                  onClick={() => handleReply(comment?.product)}
                >
                  Reply
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>No reviews with comments found.</p>
        )}
      </div>
    </div>
  );
};

export default MessageCenter;
