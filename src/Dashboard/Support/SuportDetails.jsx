import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import useUserStore from "../../store/AuthStore";
import axios from "axios";
import { API_URL, SERVER } from "../../config";
import { toast } from "react-toastify";
import useReportStore from "../../store/ReportStore";

const SuportDetails = () => {
  const { user, fetchUser } = useUserStore();
  const [messages, setMessages] = useState([]); // To hold combined chats
  const { id } = useParams();
  const messagesEndRef = useRef(null); // For auto-scroll to bottom
  const [message, setMessage] = useState("");
  const { chats, loadUserChats } = useReportStore();

  // Fetch chats for the current user and conversation
  useEffect(() => {
    const fetchChats = async () => {
      try {
        const response = await axios.get(
          `https://baburhaatbd.com/api/users/${user?._id}/reports?_filter[replyTo]=${id}&chatsOnly=true`,
          {
            withCredentials: true,
          }
        );
        console.log(response.data.data);
        if (response?.data?.data) {
          const fetchedChats = response?.data?.data;

          setMessages((prevMessages) => {
            // Combine new messages with existing ones and filter duplicates
            const allMessages = [...prevMessages, ...fetchedChats, ...chats];
            // Create a Set to keep unique messages based on their IDs
            const uniqueMessages = Array.from(
              new Map(allMessages.map((msg) => [msg._id, msg])).values()
            );
            return uniqueMessages.sort(
              (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
            );
          });
        }
      } catch (error) {
        console.error("Error fetching user chats:", error);
        toast.error("Failed to load chats");
      }
    };

    if (user?._id) {
      fetchChats();
    }
  }, [user?._id, id, chats, loadUserChats]);

  // Fetch user and load chats
  useEffect(() => {
    fetchUser(id);
    const interval = setInterval(() => {
      loadUserChats(id, user?._id);
    }, 10000);

    return () => clearInterval(interval);
  }, [id, user?._id, loadUserChats, fetchUser]);

  // Auto-scroll to the bottom of the chat on new messages
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Handle sending a message
  const handleSend = async () => {
    try {
      const body = {
        message: message,
        user: user?._id,
        replyTo: id,
        title: "Chat with " + id,
        description: "Chat message description goes here",
      };

      // Make the API request
      const response = await axios.post(`${API_URL}/reports`, body, {
        withCredentials: true,
      });
      if (response) {
        toast.success("Message sent successfully");
        // Add the new message to the existing messages
        setMessages((prevMessages) => [
          ...prevMessages,
          { ...response.data.data, createdAt: new Date() },
        ]);
        console.log(response.data.data);
        setMessage(""); // Clear input after sending
      } else {
        toast.error("Failed to send message");
      }
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
    <div className="flex flex-col">
      {/* Message Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 pb-10">
        {messages?.map((chat) => (
          <div
            key={chat?._id}
            className={`flex items-start space-x-2  ${
              user?._id === chat?.user?._id || user?._id === chat?.user
                ? "justify-end"
                : "justify-start"
            }`}
          >
            {/* User Avatar */}
            {id === chat?.user?._id && (
              <img
                src={
                  chat?.user?.avatar
                    ? `${SERVER}${chat?.user?.avatar?.secure_url}`
                    : "https://via.placeholder.com/40"
                }
                alt="Avatar"
                className="w-10 h-10 rounded-full"
              />
            )}
            {/* Chat Bubble */}
            <div
              className={`max-w-xs p-4 rounded-lg shadow-md ${
                user?._id === chat?.user?._id || user?._id === chat?.user
                  ? "bg-blue-500 text-white"
                  : "bg-gray-300 text-gray-900"
              }`}
            >
              <p className="text-sm">{chat?.message}</p>
              <p className="text-xs text-right mt-2 opacity-70">
                {new Date(chat?.createdAt).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area (Fixed at the bottom) */}
      <div className="bg-white border-t border-gray-300 p-2 flex items-center fixed bottom-0 left-0 right-0 z-10 rounded-md w-[60%] mx-auto">
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

export default SuportDetails;
