import { Tag, TagProps } from "@chakra-ui/react";
import { ASSET_STATUS } from "constants/common";
import React from "react";

type Props = {
  status: string;
};

export function AssetStatusTag({ status, ...res }: Props & TagProps) {
  return (
    <Tag
      textTransform="uppercase"
      colorScheme={status === ASSET_STATUS.AVAILABLE ? "green" : "gray"}
      {...res}
    >
      {status}
    </Tag>
  );
}
