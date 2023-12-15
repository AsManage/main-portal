import { PermissionPageWrapper } from "components/wrapper/PermissionPageWrapper";
import { PERMISSION } from "constants/common";
import { ListUserContainer } from "containers/user/ListUserContainer";
import React from "react";
function ListUserPage() {
  return (
    <PermissionPageWrapper permission={PERMISSION.ACCESS_USER_LIST}>
      <ListUserContainer />
    </PermissionPageWrapper>
  );
}

export default React.memo(ListUserPage);
