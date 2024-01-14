import {
  Box,
  Img,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
} from "@chakra-ui/react";
import { CgMenuGridO } from "react-icons/cg";

type Props = { title?: string; image?: string; onClick?: () => void };

export function AssetCard({ title, image, onClick }: Props) {
  return (
    <Box
      w="224px"
      padding="12px"
      borderRadius="8px"
      position="relative"
      boxShadow="rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px"
      transition="0.3s"
      _hover={{
        boxShadow:
          "rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px;",
      }}
      cursor="pointer"
      onClick={onClick}
    >
      <Text
        fontSize="16px"
        fontWeight="bold"
        width="calc(100% - 30px)"
        overflow="hidden"
        textOverflow="ellipsis"
        whiteSpace="nowrap"
      >
        {title}
      </Text>
      <Menu colorScheme="purple">
        <Box cursor="pointer" position="absolute" top="12px" right="12px">
          <MenuButton as={CgMenuGridO} fontSize="22px"></MenuButton>
          <MenuList>
            <MenuItem>Hand over</MenuItem>
            <MenuItem>Transfer</MenuItem>
          </MenuList>
        </Box>
      </Menu>
      <Img
        src={image ? image : "/images/img-placeholder.jpg"}
        w="200px"
        maxH="200px"
      />
    </Box>
  );
}
