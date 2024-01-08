import { Box, Flex } from "@chakra-ui/react";
import { TransferCard } from "components/molecules/TransferCard";
import React from "react";

type Props = {};

export function HistoryTab({}: Props) {
  return (
    <Flex flexDirection="column" gap="12px">
      <TransferCard />
      <TransferCard />
      <TransferCard />
      <TransferCard />
      <TransferCard />
    </Flex>
  );
}
