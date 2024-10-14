import React from "react";
import Message from "./Message";

const Messages = () => {
  return (
    <div className="px-4 overflow-auto flex-1">
      <Message />
      <Message />
      <Message />
      <Message />
      <Message />
    </div>
  );
};

export default Messages;
