import {
  Avatar,
  AvatarBadge,
  Badge,
  Box,
  BoxProps,
  Flex,
  Link,
  Text,
  VStack,
} from "@chakra-ui/react";
import { AUDIT_STATUS } from "constants/common";
import React, { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { showData } from "utils/common";
import { LocalStorage } from "utils/localStorage";

type Props = {
  name?: string;
  status: AUDIT_STATUS;
  startDate?: string;
  endDate?: string;
  assignee?: string;
  assigner?: string;
  assigneeId?: number;
  assignerId?: number;
  sessionId: number;
};

const storage = new LocalStorage();

export default function AuditCard({
  status,
  name,
  startDate,
  endDate,
  assignee,
  assigner,
  assigneeId,
  assignerId,
  sessionId,
  ...nest
}: Props & BoxProps) {
  const navigate = useNavigate();
  const userInfo = storage.getStorageItem(storage.availableKey.ACCOUNT_INFO);

  const tabColor = useMemo(() => {
    switch (status) {
      case AUDIT_STATUS.UPCOMING:
        return "blue.400";
      case AUDIT_STATUS.AUDITING:
        return "green.400";
      case AUDIT_STATUS.CANCELED:
        return "red.400";
      case AUDIT_STATUS.FINISHED:
        return "gray.400";

      default:
        return "gray.400";
    }
  }, [status]);
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
        navigate(String(sessionId));
      }}
      {...nest}
    >
      <Text
        w="100%"
        bg={tabColor}
        p="12px"
        textAlign="center"
        color="white"
        fontWeight="bold"
      >
        {status}
      </Text>
      <VStack p="12px" w="100%">
        <Text fontWeight="medium">{showData(name)}</Text>
        <Flex
          gap="12px"
          justifyContent="space-between"
          alignItems="center"
          w="100%"
        >
          <Badge ml="1" colorScheme="blue">
            begin
          </Badge>
          <Text>{showData(startDate)}</Text>
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
          <Text>{showData(endDate)}</Text>
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
          <Link
            color={userInfo?.id == assigneeId ? "gray.400" : "purple.400"}
            fontWeight="bold"
            onClick={(e) => {
              e.stopPropagation();
              if (userInfo?.id != assigneeId) {
                navigate(`/user/${assigneeId}`);
              }
            }}
          >
            {userInfo?.id == assigneeId ? "YOU" : showData(assignee)}
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
          <Link
            color={userInfo?.id == assignerId ? "gray.400" : "purple.400"}
            fontWeight="bold"
            onClick={(e) => {
              e.stopPropagation();
              if (userInfo?.id != assignerId) {
                navigate(`/user/${assignerId}`);
              }
            }}
          >
            {userInfo?.id == assignerId ? "YOU" : showData(assigner)}
          </Link>
        </Flex>
      </VStack>
    </Box>
  );
}
