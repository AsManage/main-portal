import { HStack, Tab, TabList, TabPanels, Tabs, Text } from "@chakra-ui/react";
import { MainLayout } from "layouts/MainLayout";
import React, { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { FaFileInvoice, FaUser } from "react-icons/fa";
import { FaHome, FaUniversalAccess } from "react-icons/fa";

type Props = {};

function SettingPage({}: Props) {
  const navigate = useNavigate();
  const location = useLocation();

  const [tabIndex, setTabIndex] = React.useState(0);

  const handleTabsChange = (index: number) => {
    setTabIndex(index);
  };

  useEffect(() => {
    if (location.pathname.includes("/setting/permission")) {
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
              navigate("/setting");
            }}
          >
            <HStack spacing={1}>
              <FaUser fontSize="24px" />
              <Text>Account</Text>
            </HStack>
          </Tab>
          <Tab
            onClick={() => {
              navigate("permission");
            }}
          >
            <HStack spacing={1}>
              <FaUniversalAccess fontSize="24px" />
              <Text>Permission</Text>
            </HStack>
          </Tab>
        </TabList>
        <TabPanels p="16px">
          <Outlet />
        </TabPanels>
      </Tabs>
    </MainLayout>
  );
}

export default React.memo(SettingPage);
