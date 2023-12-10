import { PermissionPageWrapper } from "components/wrapper/PermissionPageWrapper";
import { PERMISSION } from "constants/common";
import { TenantInfoContainer } from "containers/tenant/TenantListContainer";
import React from "react";

type Props = {};

export function TenantInfoPage({}: Props) {
  return (
    <PermissionPageWrapper permission={PERMISSION.VIEW_BUSINESS_INFORMATION}>
      <TenantInfoContainer />
    </PermissionPageWrapper>
  );
}
