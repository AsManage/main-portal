import { PermissionPageWrapper } from "components/wrapper/PermissionPageWrapper";
import { PERMISSION } from "constants/common";
import OrganisationUnitContainer from "containers/organisation/OrganisationUnitContainer";
import React from "react";

type Props = {};

function OrganisationUnitPage() {
  return (
    <PermissionPageWrapper permission={PERMISSION.ACCESS_ORGANISATION_UNIT_TAB}>
      <OrganisationUnitContainer />
    </PermissionPageWrapper>
  );
}

export default React.memo(OrganisationUnitPage);
