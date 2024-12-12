import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useConversation } from "../zustand/useConversation";

export const useGetMessage = () => {
  const [loading, setLoading] = useState(false);
  const [messages, setAllMessages] = useState([]);
  const { selectedConversation } = useConversation();
  useEffect(() => {
    const getMessages = async () => {
      try {
        // setLoading(true); // Start loading
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

        setLoading(false);
        setAllMessages(data);
      } catch (error) {
        toast.error(error.message);
        console.log("error.message", error.message);
      } finally {
        setLoading(false); // Stop loading after try or catch
      }
    };

    if (selectedConversation._id) {
      getMessages();
    }
  }, [selectedConversation._id]);

  return { loading, messages };
};
