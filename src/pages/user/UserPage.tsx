import { HStack, Tab, TabList, TabPanels, Tabs, Text } from "@chakra-ui/react";
import { MainLayout } from "layouts/MainLayout";
import React, { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { FaFileInvoice, FaUser, FaUserPlus } from "react-icons/fa";
import { FaHome, FaUniversalAccess } from "react-icons/fa";

type Props = {};

function UserPage({}: Props) {
  const navigate = useNavigate();
  const location = useLocation();

  const [tabIndex, setTabIndex] = React.useState(0);

  const handleTabsChange = (index: number) => {
    setTabIndex(index);
  };

  useEffect(() => {
    if (location.pathname.includes("/user/create")) {
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
              navigate("/user");
            }}
          >
            <HStack spacing={1}>
              <FaUser fontSize="24px" />
              <Text>List User</Text>
            </HStack>
          </Tab>
          <Tab
            onClick={() => {
              navigate("create");
            }}
          >
            <HStack spacing={1}>
              <FaUserPlus fontSize="24px" />
              <Text>Create user</Text>
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

export default React.memo(UserPage);
