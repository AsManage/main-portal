import {
  Box,
  HStack,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from "@chakra-ui/react";
import { MainLayout } from "layouts/MainLayout";
import React from "react";
import { Outlet } from "react-router-dom";
type Props = {};

function OrganisationPage({}: Props) {
  return (
    <MainLayout>
      <Box p="12px">
        <Outlet />
      </Box>
    </MainLayout>
  );
}

export default React.memo(OrganisationPage);
