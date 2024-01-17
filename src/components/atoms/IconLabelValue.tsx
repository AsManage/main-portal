import { As, Badge, Flex, FlexProps, Icon, Text } from "@chakra-ui/react";
import React from "react";
import { IconType } from "react-icons";

type Props = {
  label?: string;
  value?: string | React.ReactNode;
  icon?: IconType;
};
export const IconLabelValue = ({
  label,
  value,
  icon,
  ...rest
}: Props & FlexProps) => {
  return (
    <Flex alignItems="flex-start" {...rest}>
      <Flex alignItems="center">
        {icon && (
          <Icon as={icon as unknown as As} fontSize="24px" color="purple.500" />
        )}
        {/* <FaBuilding fontSize="18px" /> */}
        <Text ml="6px" fontSize="18px" color="var(--gray-01)" fontWeight="bold">
          {label}:
        </Text>
      </Flex>
      <Text ml="6px" fontSize="18px" color="var(--gray-01)" fontWeight="light">
        {value}
      </Text>
    </Flex>
  );
};
