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
import { useTranslation } from "react-i18next";
import { Outlet } from "react-router-dom";
import { IoInformationCircleSharp } from "react-icons/io5";

type Props = {};

export function TenantPage({}: Props) {
  const { t, i18n } = useTranslation();

  return (
    <MainLayout>
      <Box p="12px">
        <Outlet />
      </Box>
    </MainLayout>
  );
}
