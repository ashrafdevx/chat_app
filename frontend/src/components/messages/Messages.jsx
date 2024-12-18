import React, { useEffect, useRef } from "react";
import Message from "./Message";
import { useGetMessage } from "../../hooks/useGetMessages";
import Skeleton from "../../utilis/Skeleton";

const Messages = () => {
  const { loading, messages } = useGetMessage(); // Ensure message is correctly named in the hook

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
        !loading && messages?.length === 0 ? (
          <p>Select to start conversation</p>
        ) : (
          messages?.map((msg) => (
            <div ref={lastMessage} key={msg._id}>
              <Message message={msg} />
            </div>
          ))
        )
      ) : (
        <Skeleton />
      )}
    </div>
  );
};

export default Messages;
