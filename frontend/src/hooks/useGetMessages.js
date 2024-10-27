import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useConversation } from "../zustand/useConversation";

export const useGetMessage = () => {
  const [loading, setLoading] = useState(false);
  const [messages, setAllMessages] = useState([]);
  const { selectedConversation } = useConversation();

  useEffect(() => {
    const getMessages = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `http://localhost:5000/api/message/${selectedConversation._id}`,
          {
            method: "GET",
            credentials: "include",
          }
        );
        if (!res.ok) {
          throw new Error("Failed to fetch messages");
        }
        const data = await res.json();
        console.log("data", data);
        setAllMessages(data);
      } catch (error) {
        toast.error(error.message);
        console.log("error.message", error.message);
      } finally {
        setLoading(false);
      }
    };

    if (selectedConversation?._id) {
      getMessages();
    }
  }, [selectedConversation?._id]);

  return { loading, messages };
};
