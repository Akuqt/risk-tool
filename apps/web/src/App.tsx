import React from "react";
import { SocketProvider } from "./context";
import { Home } from "./pages";

export const App: React.FC = () => {
  return (
    <SocketProvider>
      <Home />
    </SocketProvider>
  );
};
