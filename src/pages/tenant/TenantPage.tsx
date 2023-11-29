import { Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";
import { MainLayout } from "layouts/MainLayout";
import React from "react";
import { useTranslation } from "react-i18next";
import { Outlet } from "react-router-dom";

type Props = {};

export function TenantPage({}: Props) {
  const { t, i18n } = useTranslation();

  return (
    <MainLayout>
      <Tabs size="lg" variant="line" colorScheme="purple">
        <TabList bg="white">
          <Tab>Information</Tab>
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
