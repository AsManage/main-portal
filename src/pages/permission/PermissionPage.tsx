import { Box } from "@chakra-ui/react";
import { PermissionContainer } from "containers/permission/PermissionContainer";
import { MainLayout } from "layouts/MainLayout";
import React from "react";

type Props = {};

export function PermissionPage({}: Props) {
  return (
    <MainLayout>
      <Box p="12px">
        <PermissionContainer />
      </Box>
    </MainLayout>
  );
}
