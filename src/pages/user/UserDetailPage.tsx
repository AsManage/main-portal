import { UserDetailContainer } from "containers/user/UserDetailContainer";
import React from "react";
function UserDetailPage() {
  return <UserDetailContainer />;
}

export default React.memo(UserDetailPage);
