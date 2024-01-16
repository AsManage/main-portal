import { PermissionPageWrapper } from "components/wrapper/PermissionPageWrapper";
import { PERMISSION } from "constants/common";
import DetailAssetContainer from "containers/asset/DetailAssetContainer";
import React from "react";

type Props = {};

export default function DetailAssetPage({}: Props) {
  return (
    <PermissionPageWrapper permission={PERMISSION.VIEW_ASSET_DETAIL}>
      <DetailAssetContainer />
    </PermissionPageWrapper>
  );
}
