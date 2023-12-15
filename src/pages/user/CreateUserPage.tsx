import { PermissionPageWrapper } from "components/wrapper/PermissionPageWrapper";
import { PERMISSION } from "constants/common";
import { CreateUserContainer } from "containers/user/CreateUserContainer";
import React from "react";

function CreateUserPage() {
  return (
    <PermissionPageWrapper permission={PERMISSION.ADD_USER}>
      <CreateUserContainer />
    </PermissionPageWrapper>
  );
}

export default React.memo(CreateUserPage);
