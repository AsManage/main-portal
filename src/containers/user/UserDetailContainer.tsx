import {
  Box,
  Flex,
  FormControl,
  FormLabel,
  Image,
  Input,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from "@chakra-ui/react";
import { PaperWrapper } from "components/atoms/PaperWrapper";
import { useEffect } from "react";
import "react-responsive-pagination/themes/classic.css";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "store/store";
import { getUserDetailAction, userSelector } from "store/user";
import { showData } from "utils/common";
import { AssetTab } from "./userDetailTabs/AssetTab";
import { PermissionPageWrapper } from "components/wrapper/PermissionPageWrapper";
import { PERMISSION } from "constants/common";

type Props = {};

export const UserDetailContainer = (props: Props) => {
  const dispatch = useDispatch();
  const { userId } = useParams();
  const { userDetail } = useSelector(userSelector);

  useEffect(() => {
    dispatch(getUserDetailAction({ userId: Number(userId || 0) }));
  }, [dispatch, userId]);

  return (
    <Box>
      <PaperWrapper
        label={`${userDetail?.firstName} ${userDetail?.lastName}`}
        w="100%"
      >
        <Flex gap="24px">
          <Box
            boxShadow="rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px"
            borderRadius="12px"
            overflow="hidden"
            width="200px"
            height="200px"
          >
            <Image
              width="100%"
              h="100%"
              objectFit="cover"
              src={
                userDetail?.image
                  ? userDetail?.image
                  : "/images/avatar-placeholder.jpg"
              }
            />
          </Box>
          <Flex direction="column" gap="12px" flexWrap="wrap">
            <Flex w="100%">
              <Flex gap="6px" w="50%">
                <Text fontWeight="bold">First Name:</Text>
                <Text>{showData(userDetail?.firstName)}</Text>
              </Flex>
              <Flex gap="6px" w="50%">
                <Text fontWeight="bold">Last Name:</Text>
                <Text>{showData(userDetail?.lastName)}</Text>
              </Flex>
            </Flex>
            <Flex w="100%">
              <Flex gap="6px" w="50%">
                <Text fontWeight="bold">Location:</Text>s
                <Text>{showData(userDetail?.location)}</Text>
              </Flex>
              <Flex gap="6px" w="50%">
                <Text fontWeight="bold">Province:</Text>

                <Text>{showData(userDetail?.province)}</Text>
              </Flex>
            </Flex>

            <Flex w="100%">
              <Flex gap="6px" w="50%">
                <Text fontWeight="bold">City:</Text>

                <Text>{showData(userDetail?.city)}</Text>
              </Flex>
              <Flex gap="6px" w="50%">
                <Text fontWeight="bold">Working Position:</Text>
                <Text>{showData(userDetail?.workingPosition)}</Text>
              </Flex>
            </Flex>
            <Flex w="100%">
              <Flex gap="6px" w="50%">
                <Text fontWeight="bold">Phone Number:</Text>
                <Text>{showData(userDetail?.phoneNumber)}</Text>
              </Flex>
              <Flex gap="6px" w="50%">
                <Text fontWeight="bold">Email:</Text>
                <Text>{showData(userDetail?.email)}</Text>
              </Flex>
            </Flex>
            <Flex w="100%">
              <Flex gap="6px" w="50%">
                <Text fontWeight="bold">Gender:</Text>
                <Text>{showData(userDetail?.gender)}</Text>
              </Flex>
              <Flex gap="6px" w="50%">
                <Text fontWeight="bold">Role:</Text>
                <Text>{showData(userDetail?.role?.name)}</Text>
              </Flex>
            </Flex>
            <Box display="flex" alignItems="center">
              <Box className="circle"></Box>
              <Text
                ml="12px"
                fontSize="18px"
                color="var(--gray-01)"
                fontWeight="light"
              >
                Active
              </Text>
            </Box>
          </Flex>
        </Flex>
        <Box mt="12px">
          <Tabs variant="enclosed" colorScheme="purple">
            <TabList>
              <Tab>Assigned Assets</Tab>
            </TabList>

            <TabPanels border="1px solid var(--chakra-colors-gray-200)">
              <TabPanel>
                <PermissionPageWrapper
                  permission={PERMISSION.VIEW_ASSIGNED_ASSET_OF_USER}
                >
                  <AssetTab />
                </PermissionPageWrapper>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Box>
      </PaperWrapper>
    </Box>
  );
};
