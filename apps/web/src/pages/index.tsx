import React, { useEffect } from "react";
import { addLog, RootState, updateDriverState2 } from "../redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useSocket } from "../hooks";
import { NotFound } from "./NotFound";
import { Register } from "./Register";
import { Login } from "./Login";
import { Home } from "./Home";
import { Main } from "./Main";

export const Pages: React.FC = () => {
  const company = useSelector(
    (state: RootState) => state.companyReducer.company,
  );
  const dispatch = useDispatch();
  const socket = useSocket();

  useEffect(() => {
    socket?.on("company:newAlert", (data) => {
      if (data.company === company.id) {
        dispatch(addLog(data.log));
      }
    });
    socket?.on("disable:route", (data) => {
      if (data.company === company.id) {
        dispatch(
          updateDriverState2({
            id: data.driver,
            active: false,
            lat: company.lat,
            lng: company.lng,
          }),
        );
      }
    });
  }, [socket, company.id, company.lat, company.lng, dispatch]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/main/*" element={<Main />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};
