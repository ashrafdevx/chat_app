import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export const useGetConversation = () => {
  const [loading, setloading] = useState(false);
  const [conversations, setconversations] = useState([]);

  useEffect(() => {
    const getConversation = async () => {
      setloading(true);
      try {
        const res = await fetch("http://localhost:5000/api/user", {
          method: "GET",
          credentials: "include",
        });

        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }

        const data = await res.json();
        setconversations(data);
      } catch (error) {
        toast.error(error.message);
        console.log("Get Hook Error :", error.message);
      } finally {
        setloading(false);
      }
    };

    getConversation();
    // return () => {
    //   setconversations(null);
    // };
  }, []);

  return { loading, conversations };
};
