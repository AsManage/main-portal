import {
  Avatar,
  AvatarBadge,
  Badge,
  Box,
  Card,
  CardBody,
  Flex,
  Link,
  Text,
  VStack,
} from "@chakra-ui/react";
import { PaperWrapper } from "components/atoms/PaperWrapper";
import AuditCard from "components/molecules/AuditCard";
import { AUDIT_STATUS } from "interfaces/auth.interface";
import React from "react";
import { showData } from "utils/common";

type Props = {};

export default function AuditSessionDetailContainer({}: Props) {
  return (
    <PaperWrapper label="Audit Lab 03/2023">
      <VStack spacing="12px">
        <Flex
          gap="12px"
          //   justifyContent="space-between"
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
          //   justifyContent="space-between"
          alignItems="center"
          w="100%"
        >
          <Badge ml="1" colorScheme="red">
            Expired
          </Badge>
          <Text>20/12/2023 23:16:30</Text>
        </Flex>
        <Flex gap="12px" alignItems="center" w="100%">
          <Badge ml="1" colorScheme="gray">
            Assignee
          </Badge>
          <Link color="purple.400" fontWeight="bold">
            Nguyen Van A
          </Link>
        </Flex>
        <Flex gap="12px" alignItems="center" w="100%">
          <Badge ml="1" colorScheme="gray">
            Created by
          </Badge>
          <Link color="purple.400" fontWeight="bold">
            Nguyen Van A
          </Link>
        </Flex>
        <Flex gap="12px" alignItems="flex-start" w="100%">
          <Badge ml="1" colorScheme="gray">
            Note
          </Badge>
          <Text>
            Lorem ipsum is the filler text that typically demonstrates the font
            and style of a text in a document or visual demonstration. It serves
            as a place holder indicating where the text will be in the final
            iteration. Originally from Latin, Lorem ipsum has no intelligible
            meaning.
          </Text>
        </Flex>
        <Card>
          <CardBody>
            <Text>
              View a summary of all your customers over the last month.
            </Text>
          </CardBody>
        </Card>
      </VStack>
    </PaperWrapper>
  );
}
