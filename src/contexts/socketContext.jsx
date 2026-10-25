import { createContext, useContext, useEffect, useState } from "react";
import { io } from "socket.io-client";

const SocketContext = createContext(null);

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const backendUrl = process.env.BACKEND_URL || "http://localhost:3001";
    const s = io(backendUrl, {
      transports: ["websocket", "polling"],
    });

    s.on("connect", () => {
      console.log("Connected to server:", s.id);
      setSocket(s);
    });

    s.on("connect_error", (err) => {
      console.error("Socket connection error:", err);
    });

    return () => {
      s.disconnect();
    };
  }, []);

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};

export const useSocket = () => useContext(SocketContext);
