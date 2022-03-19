import { socketContext } from "../context";
import { useContext } from "react";

export const useSocket = () => {
  const socket = useContext(socketContext);
  return socket;
};
