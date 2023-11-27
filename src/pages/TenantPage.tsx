import { Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";
import { TenantListContainer } from "containers/Tenant/TenantListContainer";
import { MainLayout } from "layouts/MainLayout";
import React from "react";
import { useTranslation } from "react-i18next";

type Props = {};

export function TenantPage({}: Props) {
  const { t, i18n } = useTranslation();

  return (
    <MainLayout>
      <Tabs size="lg" variant="line" colorScheme="purple">
        <TabList bg="white">
          <Tab>Tenant list</Tab>
          <Tab>Tenant Config</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <TenantListContainer />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </MainLayout>
  );
}
