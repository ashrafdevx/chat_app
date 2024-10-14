import React from "react";
import Conversation from "./conversation";

const Conversations = () => {
  return (
    <div className="flex py-2 overflow-auto flex-col ">
      <Conversation />
      <Conversation />
      <Conversation />
      <Conversation />
      <Conversation />
      <Conversation />
      <Conversation />
    </div>
  );
};

export default Conversations;
