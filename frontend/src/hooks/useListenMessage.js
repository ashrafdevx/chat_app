import React, { useEffect } from "react";
import { useSocketContext } from "../context/socketContext";
import { useConversation } from "../zustand/useConversation";

const useListenMessage = () => {
  const { socket } = useSocketContext();
  const { sentMessage, messages } = useConversation();

  useEffect(() => {
    socket?.on("newMessage", (newMessage) => {
      sentMessage([...messages, newMessage]);
    });
    return () => socket?.off("newMessage");
  }, [sentMessage, messages, socket]);
};

export default useListenMessage;
