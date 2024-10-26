import React, { useEffect, useRef } from "react";
import Message from "./Message";
import { useGetMessage } from "../../hooks/useGetMessages";
import Skeleton from "../../utilis/Skeleton";

const Messages = () => {
  const { loading, messages } = useGetMessage(); // Ensure message is correctly named in the hook

  console.log("loading", loading);
  console.log("messages", messages.messages);

  // Scroll View
  const lastMessage = useRef();

  useEffect(() => {
    setTimeout(() => {
      lastMessage?.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  }, [messages]);

  return (
    <div className="px-4 overflow-auto flex-1">
      {!loading ? (
        messages.messages?.length > 0 ? (
          messages.messages.map((msg) => (
            <div ref={lastMessage} key={msg._id}>
              <Message message={msg} />
            </div>
          ))
        ) : (
          <p>Select to start conversation</p>
        )
      ) : (
        <Skeleton />
      )}
    </div>
  );
};

export default Messages;
