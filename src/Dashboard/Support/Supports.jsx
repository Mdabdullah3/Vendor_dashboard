import React, { useEffect } from "react";
import useUserStore from "../../store/AuthStore";
import { useNavigate } from "react-router-dom";

const ChatCenterAdminView = () => {
  const { users, fetchAdminUser } = useUserStore();
  const navigate = useNavigate();
  useEffect(() => {
    fetchAdminUser();
  }, [fetchAdminUser]);
  const handleViewChat = (id) => {
    navigate(`/admin/chat-center/${id}`);
  };
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Vendor Chat Center</h1>
      <ul className="mt-4">
        {users?.map((chat) => (
          <li
            key={chat?._id}
            className="flex items-center justify-between p-4 border-b"
          >
            <span>{chat?.name}</span>
            <button
              className="text-blue-500"
              onClick={() => handleViewChat(chat?._id)}
            >
              View Chat
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ChatCenterAdminView;
