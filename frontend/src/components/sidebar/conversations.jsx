import React from "react";
import Conversation from "./conversation";
import { useGetConversation } from "../../hooks/useGetConversation";
import { getRandomEmojis } from "../../utilis/emoji";

const Conversations = () => {
  const { loading, conversations } = useGetConversation();
  console.log("conversations", conversations);
  return (
    <div className="flex py-2 overflow-auto flex-col ">
      {conversations?.map((item) => {
        return (
          <Conversation
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
