import { Box } from "@chakra-ui/react";
import { MainLayout } from "layouts/MainLayout";
import React from "react";
import { Outlet } from "react-router-dom";

type Props = {};

function AssetPage({}: Props) {
  return (
    <MainLayout>
      <Box p="12px">
        <Outlet />
      </Box>
    </MainLayout>
  );
}

export default React.memo(AssetPage);
