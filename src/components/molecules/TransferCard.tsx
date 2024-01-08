import { Box, Flex, Link, Text } from "@chakra-ui/react";
import React from "react";
import { FaArrowRightLong } from "react-icons/fa6";

type Props = {};

export function TransferCard({}: Props) {
  return (
    <Flex alignItems="center" gap="12px">
      <Text>
        <span
          style={{
            fontWeight: "bold",
          }}
        >
          [12/02/2000:12:03:16]
        </span>
        <Link color="var(--chakra-colors-purple-500)"> Nguyen Van A</Link>
      </Text>
      <FaArrowRightLong />
      <Text>
        <Link color="var(--chakra-colors-purple-500)"> Nguyen Van A</Link> (Cho
        muon)
      </Text>
    </Flex>
  );
}
