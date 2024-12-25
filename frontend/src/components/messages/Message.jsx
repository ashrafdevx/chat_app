import React from "react";
import { useAuthContext } from "../../context/AuthContext";
import { useConversation } from "../../zustand/useConversation";
import { extractTime } from "../../utilis/extractTime";

const Message = ({ message }) => {
  const { authUser } = useAuthContext();
  const { selectedConversation } = useConversation();

  const fromMe = authUser._id === message?.senderId;
  console.log("message?.senderId", message);
  console.log("authUser._id", authUser);
  const chatStartEnd = fromMe ? "chat-end" : "chat-start";
  const chatBubble = fromMe ? "chat-bubble chat-bubble-info" : "chat-bubble";
  const profilePic = fromMe
    ? authUser.profilePic
    : selectedConversation.profilePic;
  return (
    <div>
      <div className={`chat  ${chatStartEnd} `}>
        <div className={`chat-image avatar `}>
          <div className="w-10 rounded-full">
            <img alt="Tailwind CSS chat bubble component" src={profilePic} />
          </div>
        </div>

        <div
          className={`${chatBubble} overflow-x-hidden break-words whitespace-pre-wrap`}
        >
          {message.message}
        </div>
        <div className="chat-footer opacity-50 text-gray-400">
          {extractTime(message?.createdAt)}
        </div>
      </div>
    </div>
  );
};

export default Message;
