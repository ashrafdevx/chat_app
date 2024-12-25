import React, { useEffect, useRef } from "react";
import Message from "./Message";
import { useGetMessage } from "../../hooks/useGetMessages";
import Skeleton from "../../utilis/Skeleton";
import useListenMessage from "../../hooks/useListenMessage";

const Messages = () => {
  const { loading, messages } = useGetMessage(); // Ensure message is correctly named in the hook
  useListenMessage();
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
        Array.isArray(messages) && messages.length === 0 ? (
          <p>Select to start conversation</p>
        ) : Array.isArray(messages) ? (
          messages.map((msg) => (
            <div ref={lastMessage} key={msg._id}>
              <Message message={msg} />
            </div>
          ))
        ) : (
          <p>Invalid messages format</p>
        )
      ) : (
        <Skeleton />
      )}
    </div>
  );
};

export default Messages;
