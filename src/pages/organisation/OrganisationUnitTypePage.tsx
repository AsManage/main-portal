import { PermissionPageWrapper } from "components/wrapper/PermissionPageWrapper";
import { PERMISSION } from "constants/common";
import { OrganisationUnitTypeContainer } from "containers/organisation/OrganisationUnitTypeContainer";
import React from "react";

type Props = {};

export function OrganisationUnitTypePage({}: Props) {
  return (
    <PermissionPageWrapper
      permission={PERMISSION.ACCESS_ORGANISATION_UNIT_TYPE_TAB}
    >
      <OrganisationUnitTypeContainer />
    </PermissionPageWrapper>
  );
}
