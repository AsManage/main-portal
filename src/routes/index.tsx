import React from "react";
import { Route, Routes } from "react-router-dom";

import OrganisationPage from "../pages/organisation/OrganisationPage";
import { LoginPage } from "pages/auth/LoginPage";
import { HomePage } from "pages/HomePage";
import { TenantPage } from "pages/tenant/TenantPage";
import { NotFoundPage } from "pages/error/NotFoundPage";
import { VerifyCodeContainer } from "containers/Auth/VerifyCodeContainer";
import { ChangePasswordContainer } from "containers/Auth/ChangePasswordContainer";
import { ForgotPasswordPage } from "pages/auth/ChangePasswordPage";
import OrganisationUnitPage from "pages/organisation/OrganisationUnitPage";
import { TenantInfoPage } from "pages/tenant/TenantInfoPage";
import { OrganisationUnitTypePage } from "pages/organisation/OrganisationUnitTypePage";
import LocationPage from "pages/organisation/LocationPage";
import SettingPage from "pages/setting/SettingPage";
import SettingAccountPage from "pages/setting/SettingAccountPage";
import SettingPermissionPage from "pages/setting/SettingPermissionPage";
import { PermissionPage } from "pages/permission/PermissionPage";
import UserPage from "pages/user/UserPage";
import ListUserPage from "pages/user/ListUserPage";
import CreateUserPage from "pages/user/CreateUserPage";
import AssetPage from "pages/asset/AssetPage";
import ListAssetPage from "pages/asset/ListAssetPage";
import CreateAssetPage from "pages/asset/CreateAssetPage";
import UserDetailPage from "pages/user/UserDetailPage";
import DetailAssetPage from "pages/asset/DetailAssetPage";
import AuditPage from "pages/audit/AuditPage";
import { AuditingSessionsPage } from "pages/audit/AuditingSessionsPage";
import { AuditHistoryPage } from "pages/audit/AuditHistoryPage";
import { AuditSessionDetailPage } from "pages/audit/AuditSessionDetailPage";

type Props = {};

function MainRoutes({}: Props) {
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
        <Route path="" element={<OrganisationUnitPage />} />
        <Route path="unit-type" element={<OrganisationUnitTypePage />} />
        <Route path="location" element={<LocationPage />} />
      </Route>

      {/** TENANT ROUTE */}
      <Route path="/business" element={<TenantPage />}>
        <Route path="" element={<TenantInfoPage />} />
      </Route>

      {/** SETTING ROUTE */}
      <Route path="/setting" element={<SettingPage />}>
        <Route path="" element={<SettingAccountPage />} />
        <Route path="permission" element={<SettingPermissionPage />} />
      </Route>

      {/** PERMISSION ROUTE */}
      <Route path="/permission" element={<PermissionPage />} />

      {/** USER ROUTE */}
      <Route path="/user" element={<UserPage />}>
        <Route path="" element={<ListUserPage />} />
        <Route path="create" element={<CreateUserPage />} />
        <Route path=":userId" element={<UserDetailPage />} />
      </Route>

      {/** ASSET ROUTE */}
      <Route path="/asset" element={<AssetPage />}>
        <Route path="" element={<ListAssetPage />} />
        <Route path="create" element={<CreateAssetPage />} />
        <Route path=":assetId" element={<DetailAssetPage />} />
      </Route>

      {/** AUDIT ROUTE */}
      <Route path="/audit" element={<AuditPage />}>
        <Route path="" element={<AuditingSessionsPage />} />
        <Route path="history" element={<AuditHistoryPage />} />
        <Route path=":sessionId" element={<AuditSessionDetailPage />} />
      </Route>

      <Route path="/error/404" element={<NotFoundPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default React.memo(MainRoutes);
