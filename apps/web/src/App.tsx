import React from "react";
import { Counter } from "components";

export const App: React.FC = () => {
  return (
    <div>
      <Counter />
      <p>{import.meta.env.VITE_GOOGLE_KEY}</p>
    </div>
  );
};
