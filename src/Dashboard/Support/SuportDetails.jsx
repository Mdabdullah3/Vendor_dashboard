import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useUserStore from "../../store/AuthStore";
import axios from "axios";
import { API_URL } from "../../config";
import { toast } from "react-toastify";

const VendorChatView = () => {
  const { user, fetchUser } = useUserStore();
  const { id } = useParams();
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);
  const handleSend = async () => {
    try {
      const body = {
        message: message,
        user: user?._id,
        title: "Chat with " + id,
        description: "Chat message description goes here",
      };

      // Make the API request
      const response = await axios.post(`${API_URL}/reports`, body, {
        withCredentials: true, // Make sure the server supports this if needed
      });
      console.log(response);

      // Check for successful response
      if (response) {
        toast.success("Message sent successfully");
      } else {
        toast.error("Failed to send message");
      }

      setMessage("");
    } catch (error) {
      if (error.response && error.response.status === 400) {
        toast.error("Bad Request: Please check your input.");
      } else {
        toast.error("An unexpected error occurred.");
      }
      console.error("Error sending message:", error);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100 relative">
      {/* Message Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4"></div>

      {/* Input Area (Fixed at the bottom) */}
      <div className="bg-white border-t border-gray-300 p-4 flex items-center fixed bottom-0 left-0 right-0">
        <textarea
          className="flex-1 resize-none p-3 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-100 max-h-36"
          rows="1"
          placeholder="Type a message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button
          className="bg-blue-500 text-white p-3 rounded-full ml-2 transition duration-300 hover:bg-blue-600"
          onClick={handleSend}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default VendorChatView;
