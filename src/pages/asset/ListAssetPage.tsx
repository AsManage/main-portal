import { PermissionPageWrapper } from "components/wrapper/PermissionPageWrapper";
import { PERMISSION } from "constants/common";
import ListAssetContainer from "containers/asset/ListAssetContainer";
import React from "react";

type Props = {};

export default function ListAssetPage({}: Props) {
  return (
    <PermissionPageWrapper permission={PERMISSION.VIEW_ACCESS_LIST}>
      <ListAssetContainer />
    </PermissionPageWrapper>
  );
}
