import React, { useEffect, useState } from "react";
import { havePermission } from "utils/common";

type Props = {
  permission: string;
  children?: React.ReactNode;
};

export function PermissionWrapper({ permission, children }: Props) {
  const [isAllow, setIsAllow] = useState(true);

  useEffect(() => {
    const allow = havePermission(permission);
    setIsAllow(allow);
  }, [permission]);

  return <>{isAllow ? children : null}</>;
}
