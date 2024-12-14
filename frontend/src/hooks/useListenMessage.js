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
        console.log("newMessage", updatedMessage);
        // Update the messages array
        const allMesages = [...messages, updatedMessage];
        sentMessage(allMesages);
      }
    });

    // Cleanup listener on component unmount or dependency change
    return () => {
      socket?.off("newMessage");
    };
  }, [sentMessage, messages, socket]);
};

export default useListenMessage;
