import { Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";
import { MainLayout } from "layouts/MainLayout";
import React from "react";
import { Outlet } from "react-router-dom";

type Props = {};

export function OrganisationPage({}: Props) {
  return (
    <MainLayout>
      <Tabs size="lg" variant="line" colorScheme="purple">
        <TabList bg="white">
          <Tab>Information</Tab>
          <Tab></Tab>
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
