import React from "react";
import { Route, Routes } from "react-router-dom";
import { HomePage } from "../pages/HomePage";
import { AboutPage } from "../pages/AboutPage";

type Props = {};

export function MainRoutes({}: Props) {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="about" element={<AboutPage />} />
    </Routes>
  );
}
