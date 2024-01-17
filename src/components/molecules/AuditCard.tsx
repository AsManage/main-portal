import {
  Avatar,
  AvatarBadge,
  Badge,
  Box,
  Flex,
  Link,
  Text,
  VStack,
} from "@chakra-ui/react";
import { AUDIT_STATUS } from "interfaces/auth.interface";
import React from "react";
import { useNavigate } from "react-router-dom";
import { showData } from "utils/common";

type Props = {
  status: AUDIT_STATUS;
  startDate?: string;
  endDate?: string;
  assignee?: string;
  assigner?: string;
};

export default function AuditCard({ status }: Props) {
  const navigate = useNavigate();
  return (
    <Box
      w="300px"
      borderRadius="12px"
      overflow="hidden"
      cursor="pointer"
      border="1px solid #f2f2f2"
      boxShadow="rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px"
      transition="0.3s"
      _hover={{
        boxShadow:
          "rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px;",
      }}
      onClick={() => {
        navigate("100");
      }}
    >
      <Text
        w="100%"
        bg={status === AUDIT_STATUS.UPCOMING ? "blue.400" : "green.400"}
        p="12px"
        textAlign="center"
        color="white"
        fontWeight="bold"
      >
        {status === AUDIT_STATUS.UPCOMING ? "UPCOMING" : "AUDITING"}
      </Text>
      <VStack p="12px" w="100%">
        <Text fontWeight="medium">AUDIT 2023</Text>
        <Flex
          gap="12px"
          justifyContent="space-between"
          alignItems="center"
          w="100%"
        >
          <Badge ml="1" colorScheme="blue">
            begin
          </Badge>
          <Text>20/12/2023 23:16:30</Text>
        </Flex>
        <Flex
          gap="12px"
          justifyContent="space-between"
          alignItems="center"
          w="100%"
        >
          <Badge ml="1" colorScheme="red">
            Expired
          </Badge>
          <Text>21/12/2023 23:16:30</Text>
        </Flex>
        <Flex
          gap="12px"
          justifyContent="space-between"
          alignItems="center"
          w="100%"
        >
          <Badge ml="1" colorScheme="gray">
            ASSIGNEE
          </Badge>
          <Link color="purple.400" fontWeight="bold">
            Nguyen Van A
          </Link>
        </Flex>
        <Flex
          gap="12px"
          justifyContent="space-between"
          alignItems="center"
          w="100%"
        >
          <Badge ml="1" colorScheme="gray">
            created by
          </Badge>
          <Link color="purple.400" fontWeight="bold">
            Nguyen Van B
          </Link>
        </Flex>
      </VStack>
    </Box>
  );
}
