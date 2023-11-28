import React from "react";
import { Route, Routes } from "react-router-dom";

import { OrganisationPage } from "../pages/OrganisationPage";
import { LoginPage } from "pages/LoginPage";
import { HomePage } from "pages/HomePage";
import { TenantPage } from "pages/TenantPage";
import { NotFoundPage } from "pages/NotFoundPage";
import { VerifyCodeContainer } from "containers/Auth/VerifyCodeContainer";
import { ChangePasswordContainer } from "containers/Auth/ChangePasswordContainer";
import { ForgotPasswordPage } from "pages/ChangePasswordPage";

type Props = {};

export function MainRoutes({}: Props) {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/auth" element={<LoginPage />} />
      <Route path="/auth/forgot-password" element={<ForgotPasswordPage />} />
      <Route
        path="/auth/forgot-password/verify"
        element={<VerifyCodeContainer />}
      />
      <Route
        path="/auth/change-password"
        element={<ChangePasswordContainer />}
      />
      <Route path="/tenant" element={<TenantPage />} />
      <Route path="/organisation" element={<OrganisationPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
