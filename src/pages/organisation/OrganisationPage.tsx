import {
  HStack,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from "@chakra-ui/react";
import { MainLayout } from "layouts/MainLayout";
import React, { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { FaFileInvoice } from "react-icons/fa";
import { IoInformationCircleSharp } from "react-icons/io5";
import { FaHome } from "react-icons/fa";

type Props = {};

export function OrganisationPage({}: Props) {
  const navigate = useNavigate();
  const location = useLocation();

  const [tabIndex, setTabIndex] = React.useState(0);

  const handleTabsChange = (index: number) => {
    setTabIndex(index);
  };

  useEffect(() => {
    if (location.pathname.includes("/organisation/unit-type")) {
      handleTabsChange(1);
    } else handleTabsChange(0);
  }, [location.pathname]);

  return (
    <MainLayout>
      <Tabs
        size="lg"
        variant="line"
        colorScheme="purple"
        index={tabIndex}
        onChange={handleTabsChange}
      >
        <TabList bg="white">
          <Tab
            onClick={() => {
              navigate("/organisation");
            }}
          >
            <HStack spacing={1}>
              <FaHome fontSize="24px" />
              <Text>Organisation</Text>
            </HStack>
          </Tab>
          <Tab
            onClick={() => {
              navigate("unit-type");
            }}
          >
            <HStack spacing={1}>
              <FaFileInvoice fontSize="24px" />
              <Text>Unit Type</Text>
            </HStack>
          </Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <Outlet />
          </TabPanel>
          <TabPanel>
            <Outlet />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </MainLayout>
  );
}
