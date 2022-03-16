import React from "react";
import { SocketProvider } from "./context";
import { Pages } from "./pages";

export const App: React.FC = () => {
  return (
    <SocketProvider>
      <Pages />
    </SocketProvider>
  );
};
