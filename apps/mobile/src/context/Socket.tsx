import React, { createContext, useState, useEffect, useCallback } from "react";
import { Socket, io } from "socket.io-client";

export const socketContext = createContext<Socket | null>(null);

export const SocketProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [socket, setSocket] = useState<Socket | null>(null);

  const connect = useCallback(() => {
    const socket_ = io("http://10.0.2.2:4000", { path: "/api/v1/ws" });
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
