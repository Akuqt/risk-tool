import React, { createContext, useState, useEffect, useCallback } from "react";
import { Socket, io } from "socket.io-client";

export const socketContext = createContext<Socket | null>(null);

const url =
  import.meta.env.MODE === "production"
    ? "https://api.risk-tool.xyz"
    : "http://localhost:4000";

export const SocketProvider: React.FC = ({ children }) => {
  const [socket, setSocket] = useState<Socket | null>(null);

  const connect = useCallback(() => {
    const socket_ = io(url, { path: "/api/v1/ws" });
    socket_.on("connect", () => {
      setSocket(socket_);
    });

    socket_.on("connect_error", (_e) => {
      setSocket(null);
    });
  }, []);

  useEffect(() => {
    connect();
  }, [connect]);

  return (
    <socketContext.Provider value={socket}>{children}</socketContext.Provider>
  );
};
