import { createContext, useContext, useEffect, useState } from "react";
import { io } from "socket.io-client";

const SocketContext = createContext(null);

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const s = io("https://code-names-back-end-v1-old-4.onrender.com"); // <--- استخدم IP جهازك الحقيقي
    // const s = io("http://192.168.43.242:3000"); // <--- استخدم IP جهازك الحقيقي
    s.on("connect", () => {
      console.log("Connected to server:", s.id);

      setSocket(s);
    });
    s.on("connect_error", (err) => {
      console.error("Socket connection error:", err);
    });

    return () => {
      s.disconnect();
      console.log("disconnect:", s);
    };
  }, []);

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};

export const useSocket = () => useContext(SocketContext);
