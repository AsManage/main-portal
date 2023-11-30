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
      <Tabs size="lg" variant="line" colorScheme="purple">
        <TabList bg="white">
          <Tab>
            <HStack spacing={1}>
              <IoInformationCircleSharp fontSize="24px" />
              <Text>Information</Text>
            </HStack>
          </Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <Outlet />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </MainLayout>
  );
}
