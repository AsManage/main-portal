import { Box, Flex } from "@chakra-ui/react";
import { AssetCard } from "components/molecules/AssetCard";
import React from "react";

type Props = {};

export function AssetTab({}: Props) {
  return (
    <Flex flexWrap="wrap" gap="24px">
      <AssetCard />
      <AssetCard />
      <AssetCard />
      <AssetCard />
      <AssetCard />
    </Flex>
  );
}
