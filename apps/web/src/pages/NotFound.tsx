import React from "react";
import { useNavigate } from "react-router-dom";

export const NotFound: React.FC = () => {
  const navigation = useNavigate();
  return (
    <div>
      <h1>404</h1>
      <button
        onClick={() => {
          navigation("/");
        }}
      >
        Home
      </button>
    </div>
  );
};
