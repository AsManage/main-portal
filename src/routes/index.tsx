import React from "react";
import { Route, Routes } from "react-router-dom";

import { OrganisationPage } from "../pages/OrganisationPage";
import { LoginPage } from "pages/LoginPage";
import { HomePage } from "pages/HomePage";
import { TenantPage } from "pages/TenantPage";

type Props = {};

export function MainRoutes({}: Props) {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/tenant" element={<TenantPage />} />
      <Route path="/organisation" element={<OrganisationPage />} />
    </Routes>
  );
}
