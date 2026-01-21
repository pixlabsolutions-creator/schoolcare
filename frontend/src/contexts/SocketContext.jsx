import { createContext, useContext, useEffect, useState } from "react";
import { io } from "socket.io-client";
import { useAuth } from "./AuthContext";

const SocketContext = createContext(null);

export const SocketProvider = ({ children }) => {
  const { user } = useAuth();
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const socketInstance = io(
      import.meta.env.VITE_SOCKET_URL || "http://localhost:5000",
      {
        transports: ["websocket"],
      }
    );

    setSocket(socketInstance);

    socketInstance.on("connect", () => {
      console.log("✅ Socket connected:", socketInstance.id);
    });

    return () => {
      socketInstance.disconnect();
    };
  }, []);

  // 🔑 join school when user ready
  useEffect(() => {
    if (socket && user?.school) {
      socket.emit("join-school", { school: user.school });
      console.log("🏫 Joined school:", user.school);
    }
  }, [socket, user?.school]);

  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => useContext(SocketContext);
