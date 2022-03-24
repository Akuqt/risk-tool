import React, { createContext } from "react";

const url =
  import.meta.env.MODE === "production"
    ? "https://api.risk-tool.xyz/api/v1"
    : "http://localhost:4000/api/v1";

export const ApiContext = createContext<string>(url);

export const ApiProvider: React.FC = ({ children }) => {
  return <ApiContext.Provider value={url}>{children}</ApiContext.Provider>;
};
