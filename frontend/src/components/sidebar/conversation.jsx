import React from "react";
import { useConversation } from "../../zustand/useConversation";

const Conversation = ({ emoji, conversations, lastIndex }) => {
  const { setSelectedConversation, selectedConversation } = useConversation();

  return (
    <div
      className={`flex items-center gap-2 ${
        selectedConversation?._id === conversations?._id ? "bg-sky-500" : ""
      } cursor-pointer p-2 py-1 rounded
      hover:bg-sky-500
      `}
      onClick={() => setSelectedConversation(conversations)}
    >
      <div className="avatar offline">
        <div className="w-12 rounded-full">
          <img src={conversations.profilePic} alt={conversations.profilePic} />
        </div>
      </div>
      <div className="flex flex-col flex-1">
        <div className="flex gap-3 justify-between">
          <p className="font-bold text-gray-200">{conversations.fullName}</p>
          <p className="text-xl">{emoji}</p>
        </div>
      </div>
    </div>
  );
};

export default Conversation;
