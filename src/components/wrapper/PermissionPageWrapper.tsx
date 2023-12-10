import React, { useEffect, useState } from "react";
import { havePermission } from "utils/common";

type Props = {
  permission: string;
  children?: React.ReactNode;
};

export function PermissionPageWrapper({ permission, children }: Props) {
  const [isAllow, setIsAllow] = useState(true);

  useEffect(() => {
    const allow = havePermission(permission);
    // if (!allow) window.location.href = "/error/404";
    setIsAllow(allow);
  }, [permission]);

  return isAllow ? <>{children}</> : <h2>You don't have permission!</h2>;
}
