import {
  Box,
  HStack,
  Tab,
  TabList,
  TabPanels,
  Tabs,
  Text,
} from "@chakra-ui/react";
import { MainLayout } from "layouts/MainLayout";
import React, { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { FaFileInvoice, FaUser } from "react-icons/fa";
import { FaHome, FaUniversalAccess } from "react-icons/fa";

type Props = {};

function SettingPage({}: Props) {
  return (
    <MainLayout>
      <Box p="12px">
        <Outlet />
      </Box>
    </MainLayout>
  );
}

export default React.memo(SettingPage);
