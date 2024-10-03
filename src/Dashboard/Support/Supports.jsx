import React, { useEffect } from "react";
import useChatStore from "../../store/ChatStore";
import useUserStore from "../../store/AuthStore";

const ChatCenterAdminView = () => {
  const { users, fetchAdminUser } = useUserStore();
  const { setSelectedUser } = useChatStore();

  useEffect(() => {
    fetchAdminUser();
  }, [fetchAdminUser]);
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
              onClick={() => setSelectedUser(chat.user)}
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
