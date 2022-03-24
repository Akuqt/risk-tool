import { ApiContext } from "../context";
import { useContext } from "react";

export const useApiUrl = () => {
  const apiUrl = useContext(ApiContext);
  return apiUrl;
};
