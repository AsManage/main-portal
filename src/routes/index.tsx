import React from "react";
import { Route, Routes } from "react-router-dom";
import { HomePage } from "../pages/HomePage";
import { AboutPage } from "../pages/AboutPage";
import { LoginPage } from "pages/LoginPage";

type Props = {};

export function MainRoutes({}: Props) {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="about" element={<AboutPage />} />
    </Routes>
  );
}
