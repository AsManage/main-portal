import { PermissionPageWrapper } from "components/wrapper/PermissionPageWrapper";
import { PERMISSION } from "constants/common";
import LocationContainer from "containers/organisation/LocationContainer";
import React from "react";

type Props = {};

function LocationPage() {
  return (
    <PermissionPageWrapper
      permission={PERMISSION.ACCESS_ORGANISATION_LOCATION_TAB}
    >
      <LocationContainer />
    </PermissionPageWrapper>
  );
}

export default React.memo(LocationPage);
