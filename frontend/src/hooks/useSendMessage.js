import { useState } from "react";
import toast from "react-hot-toast";
import { useConversation } from "../zustand/useConversation";

export const useMessage = () => {
  const [loading, setLoading] = useState(false);
  const { selectedConversation, sentMessage, messages } = useConversation();

  const sendMessage = async (msg) => {
    setLoading(true);
    try {
      // Optimistically update the UI before waiting for the server
      const tempMessage = {
        _id: Date.now().toString(), // Temporary unique ID
        message: msg,
        conversationId: selectedConversation._id,
        senderId: "currentUserId", // Replace with the actual sender's ID
        createdAt: new Date(),
      };

      sentMessage([...messages, tempMessage]); // Add the temp message to state immediately

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

      if (result.error) {
        // Rollback the UI if there's an error
        sentMessage(messages); // Revert to the previous state
        throw new Error(result.error);
      }

      // Replace the temporary message with the server-confirmed message
      sentMessage([
        ...messages.filter((m) => m._id !== tempMessage._id), // Remove the temp message
        result, // Add the server-confirmed message
      ]);
    } catch (error) {
      toast.error(error.message);
      console.error("Send Message Hook Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return { loading, sendMessage };
};

// import { useState } from "react";
// import toast from "react-hot-toast";
// import { useConversation } from "../zustand/useConversation";

// export const useMessage = () => {
//   const [loading, setloading] = useState(false);
//   const { selectedConversation, sentMessage, messages } = useConversation();

//   const sendMessage = async (msg) => {
//     setloading(true);
//     try {
//       const res = await fetch(
//         `http://localhost:5000/api/message/sent/${selectedConversation._id}`,
//         {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           credentials: "include", // Include cookies
//           body: JSON.stringify({ message: msg }),
//         }
//       );

//       const result = await res.json();
//       // console.log("result", result);
//       if (result.error) {
//         throw new Error(result.error);
//       }
//       sentMessage([...messages, result]);
//     } catch (error) {
//       toast.error(error.message);
//       console.log("Send Message Hoook : ", error);
//     } finally {
//       setloading(false);
//     }
//   };
//   return { loading, sendMessage };
// };
