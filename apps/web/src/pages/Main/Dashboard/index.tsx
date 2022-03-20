import React from "react";
import { useDispatch } from "react-redux";
import { clearCompany } from "../../../redux";

export const Dashboard: React.FC = () => {
  const dispatch = useDispatch();
  return (
    <div>
      <h1>Dashboard</h1>
      <button
        onClick={() => {
          dispatch(clearCompany());
        }}
      >
        Exit
      </button>
    </div>
  );
};
