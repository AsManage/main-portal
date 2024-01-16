import { PermissionPageWrapper } from "components/wrapper/PermissionPageWrapper";
import { PERMISSION } from "constants/common";
import { UserDetailContainer } from "containers/user/UserDetailContainer";
import React from "react";
function UserDetailPage() {
  return (
    <PermissionPageWrapper permission={PERMISSION.VIEW_DETAIL_USER}>
      <UserDetailContainer />
    </PermissionPageWrapper>
  );
}

export default React.memo(UserDetailPage);
