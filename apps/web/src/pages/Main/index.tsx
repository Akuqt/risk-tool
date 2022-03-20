import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearCompany, RootState } from "../../redux";
import { useNavigate, Navigate } from "react-router-dom";

export const Main: React.FC = () => {
  const company = useSelector(
    (state: RootState) => state.companyReducer.company,
  );
  const dispatch = useDispatch();
  const navigation = useNavigate();
  return company.token ? (
    <div>
      <p>{company.id || "NO"}</p>
      <button
        onClick={() => {
          dispatch(clearCompany());
          navigation("/login");
        }}
      >
        Exit
      </button>
    </div>
  ) : (
    <Navigate to="/login" />
  );
};
