import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useConversation } from "../zustand/useConversation";
import axios from "axios";
export const useGetMessage = () => {
  const [loading, setLoading] = useState(false);
  // const [messages, sentMessage] = useState([]);
  const { selectedConversation, messages, sentMessage } = useConversation();
  // console.log("check if the all message upate or not :", messages);
  useEffect(() => {
    const getMessages = async () => {
      try {
        setLoading(true); // Start loading

        const res = await axios.get(
          `http://localhost:5000/api/message/${selectedConversation?._id}`,
          {
            withCredentials: true, // Ensures cookies are sent with the request
          }
        );
        // Check if the response is valid and has messages
        if (!res?.data || !res.data.messages) {
          sentMessage([]); // Return empty array if no messages
        } else {
          // console.log("Get All Message", res.data);
          sentMessage(res.data); // Set messages if available
        }
      } catch (error) {
        toast.error(error.message);
        console.error("Error fetching messages:", error.message);
      } finally {
        setLoading(false); // Stop loading
      }
    };

    if (selectedConversation?._id) {
      getMessages();
    } else {
      sentMessage([]);
    }
  }, [selectedConversation, sentMessage]);

  return { loading, messages };
};
