import { createContext, useContext, useEffect, useState } from "react";
import io from "socket.io-client";
import { useAuthContext } from "./AuthContext";

const socketContext = createContext();
export const useSocketContext = () => {
  return useContext(socketContext);
};
let clientSocket;

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const { authUser } = useAuthContext();

  useEffect(() => {
    if (authUser && !socket) {
      clientSocket = io("http://localhost:5000", {
        query: {
          userId: authUser._id,
        },
      });
      setSocket(clientSocket);
      console.log("Context socket", clientSocket);
      clientSocket.on("getOnlineUser", (users) => {
        console.log("Context User", users);
        setOnlineUsers(users);
      });
      return () => {
        clientSocket.disconnect();
      };
    } else {
      if (clientSocket) {
        clientSocket.disconnect();
      }
    }
  }, [authUser]);

  return (
    <socketContext.Provider value={{ socket, onlineUsers }}>
      {children}
    </socketContext.Provider>
  );
};
