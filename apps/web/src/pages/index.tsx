import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { NotFound } from "./NotFound";
import { Home } from "./Home";
import { Register } from "./Register";
import { Login } from "./Login";
import { Main } from "./Main";

export const Pages: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/main" element={<Main />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};
