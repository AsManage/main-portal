import { PermissionPageWrapper } from "components/wrapper/PermissionPageWrapper";
import { PERMISSION } from "constants/common";
import CreateAssetContainer from "containers/asset/CreateAssetContainer";
import React from "react";

type Props = {};

export default function CreateAssetPage({}: Props) {
  return (
    <PermissionPageWrapper permission={PERMISSION.ADD_ASSET}>
      <CreateAssetContainer />
    </PermissionPageWrapper>
  );
}
