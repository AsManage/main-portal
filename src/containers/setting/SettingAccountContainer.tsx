import { Box, HStack, Image, Text, VStack } from "@chakra-ui/react";
import { IconLabelValue } from "components/atoms/IconLabelValue";
import { PaperWrapper } from "components/atoms/PaperWrapper";
import {
  FaMailBulk,
  FaPhone,
  FaStreetView,
  FaTransgender,
  FaUser,
  FaUserCheck,
} from "react-icons/fa";
import { showData } from "utils/common";
import { HiSquare3Stack3D } from "react-icons/hi2";
import { LocalStorage } from "utils/localStorage";
import { MdDateRange } from "react-icons/md";

import moment from "moment";

type Props = {};

const storage = new LocalStorage();

export function SettingAccountContainer({}: Props) {
  const userInfo = storage.getStorageItem(storage.availableKey.ACCOUNT_INFO);
  const {} = userInfo;

  return (
    <VStack spacing="24px" w="100%" justifyContent="center" alignItems="center">
      <PaperWrapper label="Personal Information">
        <Box display="flex" alignItems="flex-start">
          <Box
            w="250px"
            h="250px"
            mr="24px"
            objectFit="scale-down"
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <Image
              w="100%"
              h="auto"
              src="/images/avatar-placeholder.jpg"
              overflow="hidden"
            />
          </Box>
          <HStack spacing="24px" alignItems="flex-start">
            <VStack spacing="12px" alignItems="flex-start">
              <IconLabelValue
                label="Full Name"
                value={`${showData(userInfo?.lastName)}  ${showData(
                  userInfo?.firstName
                )}`}
                icon={FaUser}
              />
              <IconLabelValue
                label="Gender"
                value={showData(userInfo?.gender)}
                icon={FaTransgender}
              />
              <IconLabelValue
                label="Phone"
                value={showData(userInfo?.phoneNumber)}
                icon={FaPhone}
              />

              <IconLabelValue
                label="Email"
                value={showData(userInfo?.email)}
                icon={FaMailBulk}
              />
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
            </VStack>
            <VStack spacing="12px" alignItems="flex-start">
              <IconLabelValue
                label="Working Position"
                value={showData(userInfo?.workingPosition)}
                icon={HiSquare3Stack3D}
              />
              <IconLabelValue
                label="Address"
                value={`${showData(userInfo?.location)}, ${showData(
                  userInfo?.province
                )}, ${showData(userInfo?.city)}, ${showData(userInfo.country)}`}
                icon={FaStreetView}
              />
              <IconLabelValue
                label="Role"
                value={showData(userInfo?.role)}
                icon={FaUserCheck}
              />
              <IconLabelValue
                label="Joining Date"
                value={
                  userInfo?.createdAt
                    ? moment(userInfo.createdAt).format("DD/MM/YYYY")
                    : ""
                }
                icon={MdDateRange}
              />
            </VStack>
          </HStack>
        </Box>
      </PaperWrapper>
    </VStack>
  );
}
