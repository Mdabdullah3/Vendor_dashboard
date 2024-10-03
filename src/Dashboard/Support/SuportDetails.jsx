import React, { useState } from "react";
import { useChatStore } from "./store";

const VendorChatView = () => {
  const { selectedUser, postChat } = useChatStore();
  const [message, setMessage] = useState("");

  const handleSendMessage = () => {
    if (message.trim()) {
      postChat({
        user: selectedUser._id,
        message,
        title: "Vendor Message",
        description: "", // optional
      });
      setMessage("");
    }
  };

  if (!selectedUser) return <div>Select a chat to view the conversation.</div>;

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold">Chat with Admin</h2>
      <div className="mt-4 bg-gray-100 p-4 h-64 overflow-y-scroll">
        {selectedUser.chats.map((chat) => (
          <div key={chat._id} className="mb-2">
            <p
              className={
                chat.isAdmin ? "text-right text-blue-500" : "text-left"
              }
            >
              {chat.message}
            </p>
          </div>
        ))}
      </div>
      <div className="mt-4 flex">
        <input
          type="text"
          className="flex-grow p-2 border"
          placeholder="Type a message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button
          onClick={handleSendMessage}
          className="ml-2 bg-blue-500 text-white p-2"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default VendorChatView;
