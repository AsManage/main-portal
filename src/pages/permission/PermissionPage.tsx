import { Box } from "@chakra-ui/react";
import { PermissionPageWrapper } from "components/wrapper/PermissionPageWrapper";
import { PERMISSION } from "constants/common";
import { PermissionContainer } from "containers/permission/PermissionContainer";
import { MainLayout } from "layouts/MainLayout";
import React from "react";

type Props = {};

export function PermissionPage({}: Props) {
  return (
    <MainLayout>
      <Box p="12px">
        <PermissionPageWrapper permission={PERMISSION.ACCESS_PERMISSION}>
          <PermissionContainer />
        </PermissionPageWrapper>
      </Box>
    </MainLayout>
  );
}
