import { useState } from "react";
import toast from "react-hot-toast";
import { useConversation } from "../zustand/useConversation";

export const useMessage = () => {
  const [loading, setloading] = useState(false);
  const { selectedConversation, sentMessage, messages } = useConversation();

  const sendMessage = async (msg) => {
    setloading(true);
    try {
      const res = await fetch(
        `http://localhost:5000/api/message/sent/${selectedConversation._id}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include", // Include cookies
          body: JSON.stringify({ message: msg }),
        }
      );

      const result = await res.json();
      // console.log("result", result);
      if (result.error) {
        throw new Error(result.error);
      }
      sentMessage([...messages, result]);
    } catch (error) {
      toast.error(error.message);
      console.log("Send Message Hoook : ", error);
    } finally {
      setloading(false);
    }
  };
  return { loading, sendMessage };
};
