import { Box, BoxProps, Text } from "@chakra-ui/react";
import React from "react";

type Props = {
  label?: string;
  children: React.ReactNode;
};

export function PaperWrapper({ label, children, ...rest }: Props & BoxProps) {
  return (
    <Box
      w="100%"
      bg="white"
      boxShadow="rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px"
      borderRadius="4px"
      p="24px"
    >
      <Text
        fontSize="24px"
        color="var(--gray-01)"
        fontWeight="bold"
        pb="12px"
        borderBottom="1px solid var(--gray-01)"
      >
        {label}
      </Text>
      <Box w="100%" mt="12px" {...rest}>
        {children}
      </Box>
    </Box>
  );
}
