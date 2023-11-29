import { Box, Image, Text, VStack } from "@chakra-ui/react";
import { IconLabelValue } from "components/atoms/IconLabelValue";
import { PaperWrapper } from "components/atoms/PaperWrapper";
import { SiOpenstreetmap } from "react-icons/si";
import { AiFillPrinter } from "react-icons/ai";
import { IoMail } from "react-icons/io5";
import { MdDateRange } from "react-icons/md";
import { GrStatusGoodSmall } from "react-icons/gr";

import React, { useEffect } from "react";
import { FaBarcode, FaBuilding, FaCity, FaFlag } from "react-icons/fa";
import { showData } from "utils/common";
import { useDispatch, useSelector } from "store/store";
import { getTenantInfoAction, organisationSelector } from "store/organisation";
import moment from "moment";

type Props = {};

export function TenantInfoContainer({}: Props) {
  const dispatch = useDispatch();
  const { tenantInfo } = useSelector(organisationSelector);

  useEffect(() => {
    dispatch(getTenantInfoAction());
  }, []);

  return (
    <VStack spacing="24px" w="100%" justifyContent="center" alignItems="center">
      <PaperWrapper label="Business Information">
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
              src="/images/img-placeholder.jpg"
              overflow="hidden"
            />
          </Box>
          <VStack spacing="12px" alignItems="flex-start">
            <IconLabelValue
              label="Name"
              value={showData(tenantInfo?.name)}
              icon={FaBuilding}
            />
            <IconLabelValue
              label="Business Code"
              value={showData(tenantInfo?.businessRegistrationCode)}
              icon={FaBarcode}
            />
            <IconLabelValue
              label="Fax Code"
              value={showData(tenantInfo?.fax)}
              icon={AiFillPrinter}
            />
            <IconLabelValue
              label="Establish"
              value={showData(
                tenantInfo?.dateOfEstablishment
                  ? moment(tenantInfo.dateOfEstablishment).format("DD/MM/YYYY")
                  : null
              )}
              icon={MdDateRange}
            />
            <Box display="flex" alignItems="center">
              <GrStatusGoodSmall fontSize="24px" color="#26d826" />
              <Text
                ml="6px"
                fontSize="18px"
                color="var(--gray-01)"
                fontWeight="light"
              >
                Active
              </Text>
            </Box>
          </VStack>
        </Box>
      </PaperWrapper>
      <PaperWrapper
        label="Contract Information"
        display="flex"
        alignItems="center"
      >
        <VStack spacing="12px" alignItems="flex-start">
          <IconLabelValue
            label="Location"
            value={showData(tenantInfo?.location)}
            icon={SiOpenstreetmap}
          />
          <IconLabelValue
            label="Province"
            value={showData(tenantInfo?.province)}
            icon={FaCity}
          />

          <IconLabelValue
            label="City"
            value={showData(tenantInfo?.city)}
            icon={FaCity}
          />
          <IconLabelValue
            label="Country"
            value={showData(tenantInfo?.country)}
            icon={FaFlag}
          />
          <IconLabelValue
            label="Email"
            value={showData(tenantInfo?.email)}
            icon={IoMail}
          />
        </VStack>
      </PaperWrapper>
    </VStack>
  );
}
