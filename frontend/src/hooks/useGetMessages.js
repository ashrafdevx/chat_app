// import { useEffect, useState } from "react";
// import toast from "react-hot-toast";
// import { useConversation } from "../zustand/useConversation";
// import axios from "axios";
// import io from "socket.io-client"; // Import the socket.io client

// // Initialize the socket connection
// const socket = io("http://localhost:5000");

// export const useGetMessage = () => {
//   const [loading, setLoading] = useState(false);
//   const { selectedConversation, messages, sentMessage } = useConversation();

//   useEffect(() => {
//     const getMessages = async () => {
//       try {
//         setLoading(true); // Start loading

//         const res = await axios.get(
//           `http://localhost:5000/api/message/${selectedConversation?._id}`,
//           {
//             withCredentials: true, // Ensures cookies are sent with the request
//           }
//         );
//         // Check if the response is valid and has messages
//         if (!res?.data || !res.data.messages) {
//           sentMessage([]); // Return empty array if no messages
//         } else {
//           console.log("Get All Message", res.data);
//           sentMessage(res.data.messages); // Set messages if available
//         }
//       } catch (error) {
//         toast.error(error.message);
//         console.error("Error fetching messages:", error.message);
//       } finally {
//         setLoading(false); // Stop loading
//       }
//     };

//     if (selectedConversation?._id) {
//       getMessages();
//     } else {
//       sentMessage([]);
//     }
//   }, [selectedConversation, sentMessage]);

//   // Listen for new messages via WebSocket
//   useEffect(() => {
//     const handleNewMessage = (newMessage) => {
//       console.log("New message received:", newMessage);
//       // Update the messages state with the new message
//       sentMessage((prevMessages) => [...prevMessages, newMessage]);
//     };

//     // Listen to the `newMessage` event
//     socket.on("newMessage", handleNewMessage);

//     // Cleanup the listener when the component unmounts
//     return () => {
//       socket.off("newMessage", handleNewMessage);
//     };
//   }, [sentMessage]);

//   return { loading, messages };
// };

import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useConversation } from "../zustand/useConversation";
import axios from "axios";

export const useGetMessage = () => {
  const [loading, setLoading] = useState(false);

  // const [messages, sentMessage] = useState([]);
  const { selectedConversation, messages, sentMessage } = useConversation();
  useEffect(() => {
    const getMessages = async () => {
      try {
        setLoading(true);

        const res = await axios.get(
          `http://localhost:5000/api/message/${selectedConversation?._id}`,
          {
            withCredentials: true,
          }
        );

        if (!res?.data || !Array.isArray(res.data.messages)) {
          sentMessage([]); // Ensure messages is always an array
        } else {
          // console.log("Get All Messages", res.data.messages);
          sentMessage(res.data.messages); // Pass only the messages array
        }
      } catch (error) {
        toast.error(error.message);
        console.error("Error fetching messages:", error.message);
      } finally {
        setLoading(false);
      }
    };

    if (selectedConversation?._id) {
      getMessages();
    } else {
      sentMessage([]); // Reset messages when no conversation is selected
    }
  }, [selectedConversation, sentMessage]);

  return { loading, messages };
};
