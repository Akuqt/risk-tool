import React, { useEffect } from "react";
import { Map } from "../components";
import { useSocket } from "../hooks";

export const Main: React.FC = () => {
  const socket = useSocket();
  useEffect(() => {
    if (socket) {
      socket.on("pong", (d) => {
        console.log("from api socket: ", d);
      });
      socket.emit("ping", { test: "something" });
    }
  }, [socket]);
  return <Map showWazeTrafficLayer />;
};
