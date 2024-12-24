import React from "react";
import Conversation from "./conversation";
import { useGetConversation } from "../../hooks/useGetConversation";
import { getRandomEmojis } from "../../utilis/emoji";
import { useSocketContext } from "../../context/socketContext";

const Conversations = () => {
  const { onlineUsers } = useSocketContext();
  const { loading, conversations } = useGetConversation();

  const onlineStatus = conversations.map((user) => {
    return {
      ...user,
      isOnline: onlineUsers.includes(user._id),
    };
  });

  return (
    <div className="flex py-2 overflow-auto flex-col ">
      {onlineStatus?.map((item, ind) => {
        return (
          <Conversation
            key={ind}
            conversations={item}
            emoji={getRandomEmojis()}
            lastIndex={item.length - 1}
          />
        );
      })}
      {loading && <span className="loading loading-spinner loading-md"></span>}
    </div>
  );
};

export default Conversations;
