import React from "react";
import { Route, Routes } from "react-router-dom";

import { OrganisationPage } from "../pages/organisation/OrganisationPage";
import { LoginPage } from "pages/auth/LoginPage";
import { HomePage } from "pages/HomePage";
import { TenantPage } from "pages/tenant/TenantPage";
import { NotFoundPage } from "pages/error/NotFoundPage";
import { VerifyCodeContainer } from "containers/Auth/VerifyCodeContainer";
import { ChangePasswordContainer } from "containers/Auth/ChangePasswordContainer";
import { ForgotPasswordPage } from "pages/auth/ChangePasswordPage";
import { OrganisationInfoPage } from "pages/organisation/OrganisationInfoPage";
import { TenantInfoPage } from "pages/tenant/TenantInfoPage";
import { OrganisationUnitTypePage } from "pages/organisation/OrganisationUnitTypePage";

type Props = {};

export function MainRoutes({}: Props) {
  return (
    <Routes>
      {/** AUTH ROUTE */}
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
      {/** ORGANISATION ROUTE */}
      <Route path="/organisation" element={<OrganisationPage />}>
        <Route path="" element={<OrganisationInfoPage />} />
        <Route path="unit-type" element={<OrganisationUnitTypePage />} />
      </Route>

      {/** TENANT ROUTE */}
      <Route path="/business" element={<TenantPage />}>
        <Route path="" element={<TenantInfoPage />} />
      </Route>

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
