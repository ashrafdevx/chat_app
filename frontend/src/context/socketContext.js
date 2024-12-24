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
    if (authUser) {
      // Initialize the socket connection only once per user
      if (!clientSocket || clientSocket.disconnected) {
        clientSocket = io("http://localhost:5000", {
          query: { userId: authUser._id },
        });

        setSocket(clientSocket);

        // Listen for updates to the online users
        clientSocket.on("getOnlineUser", (users) => {
          setOnlineUsers(users); // Update state with online users
        });

        // Cleanup on disconnection
        return () => {
          clientSocket.disconnect();
          setSocket(null);
          setOnlineUsers([]); // Reset the online users list
        };
      }
    } else {
      // If no authenticated user, disconnect socket if it exists
      if (clientSocket) {
        clientSocket.disconnect();
        setSocket(null);
      }
      setOnlineUsers([]);
    }
  }, [authUser]);

  // Real-time update logic for sent/received messages
  useEffect(() => {
    if (socket) {
      // Listen for message updates
      socket.on("message", (message) => {
        console.log("New message received:", message);

        // Perform state updates or side effects here if needed
        // Example: Fetch updated user list or update UI
      });
    }
  }, [socket]);

  return (
    <socketContext.Provider value={{ socket, onlineUsers }}>
      {children}
    </socketContext.Provider>
  );
};

// import { createContext, useContext, useEffect, useState } from "react";
// import io from "socket.io-client";
// import { useAuthContext } from "./AuthContext";

// const socketContext = createContext();
// export const useSocketContext = () => {
//   return useContext(socketContext);
// };
// let clientSocket;

// export const SocketProvider = ({ children }) => {
//   const [socket, setSocket] = useState(null);
//   const [onlineUsers, setOnlineUsers] = useState([]);
//   const { authUser } = useAuthContext();

//   useEffect(() => {
//     if (authUser && !socket) {
//       clientSocket = io("http://localhost:5000", {
//         query: {
//           userId: authUser._id,
//         },
//       });
//       setSocket(clientSocket);
//       clientSocket.on("getOnlineUser", (users) => {
//         setOnlineUsers(users);
//         console.log("clientSocket", users);
//       });
//       return () => {
//         clientSocket.disconnect();
//       };
//     } else {
//       if (clientSocket) {
//         clientSocket.disconnect();
//         setSocket(null);
//       }
//     }
//   }, [authUser]);

//   return (
//     <socketContext.Provider value={{ socket, onlineUsers }}>
//       {children}
//     </socketContext.Provider>
//   );
// };
