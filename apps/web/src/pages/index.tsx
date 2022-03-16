import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { NotFound } from "./NotFound";
import { Home } from "./Home";

export const Pages: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};
