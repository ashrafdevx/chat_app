import React, { useEffect } from "react";
import { useSocketContext } from "../context/socketContext";
import { useConversation } from "../zustand/useConversation";
import notification from "../assets/sounds/notification.mp3";

const useListenMessage = () => {
  const { socket } = useSocketContext();
  const { sentMessage, messages } = useConversation();

  useEffect(() => {
    socket?.on("newMessage", (newMessage) => {
      if (newMessage?.message) {
        const updatedMessage = {
          ...newMessage,
          shouldShake: true,
        };

        const sound = new Audio(notification);
        sound.play();

        const allMessages = [...messages, updatedMessage];
        if (Array.isArray(messages)) {
          sentMessage(allMessages);
        } else {
          sentMessage([updatedMessage]); // Ensure it falls back to an array
        }
      }
    });

    return () => {
      socket?.off("newMessage");
    };
  }, [sentMessage, messages, socket]);
};

export default useListenMessage;
