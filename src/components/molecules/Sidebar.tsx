import {
  IconButton,
  Box,
  CloseButton,
  Flex,
  Icon,
  useColorModeValue,
  Text,
  Drawer,
  DrawerContent,
  useDisclosure,
  BoxProps,
  FlexProps,
  Image,
  Collapse,
  Button,
} from "@chakra-ui/react";
import {
  FaBoxOpen,
  FaBuilding,
  FaChevronDown,
  FaFileInvoice,
  FaHome,
  FaNetworkWired,
  FaUserFriends,
  FaUserLock,
} from "react-icons/fa";
import { IoMenu, IoLogOut, IoLocation } from "react-icons/io5";
import { IconType } from "react-icons";
import React, { Fragment, ReactText, useMemo, useState } from "react";
import { useDispatch, useSelector } from "store/store";
import { logout } from "store/auth";
import { useLocation, useNavigate } from "react-router-dom";
import { IoSettings } from "react-icons/io5";
import { havePermission } from "utils/common";
import { PERMISSION } from "constants/common";
import { TbPointFilled } from "react-icons/tb";
import { commonSelector, setClosedList } from "store/common";
import { TbArrowBackUp } from "react-icons/tb";
import { IoIosPaper, IoMdArrowRoundBack } from "react-icons/io";

interface LinkItemProps {
  name: string;
  icon?: IconType;
  path: string;
  isAllow: boolean;
  children?: LinkItemProps[];
}

function SimpleSidebar({ children }: any) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Box
      minH="100vh"
      overflow="auto"
      bg={useColorModeValue("gray.100", "gray.900")}
    >
      <SidebarContent
        onClose={() => onClose}
        display={{ base: "none", md: "block" }}
      />
      <Drawer
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full"
      >
        <DrawerContent>
          <SidebarContent onClose={onClose} />
        </DrawerContent>
      </Drawer>
      {/* mobilenav */}
      <MobileNav display={{ base: "flex", md: "none" }} onOpen={onOpen} />
      <Box ml={{ base: 0, md: 60 }}>{children}</Box>
    </Box>
  );
}

export default React.memo(SimpleSidebar);

interface SidebarProps extends BoxProps {
  onClose: () => void;
}

const SidebarContent = ({ onClose, ...rest }: SidebarProps) => {
  const dispatch = useDispatch();
  const LinkItems: Array<LinkItemProps> = [
    {
      name: "Business",
      icon: FaBuilding,
      path: "/business",
      isAllow: havePermission(PERMISSION.BUSINESS),
    },
    {
      name: "Organization",
      icon: FaNetworkWired,
      path: "/organisation",
      isAllow: havePermission(PERMISSION.ORGANIZATION),
      children: [
        {
          name: "Structural",
          path: "/organisation",
          isAllow: havePermission(PERMISSION.ACCESS_ORGANISATION_UNIT_TAB),
        },
        {
          name: "Unit Type",
          path: "/organisation/unit-type",
          isAllow: havePermission(PERMISSION.ACCESS_ORGANISATION_UNIT_TYPE_TAB),
        },
        {
          name: "Location",
          path: "/organisation/location",
          isAllow: havePermission(PERMISSION.ACCESS_ORGANISATION_LOCATION_TAB),
        },
      ],
    },
    {
      name: "Permission",
      icon: FaUserLock,
      path: "/permission",
      isAllow: havePermission(PERMISSION.PERMISSION),
    },
    {
      name: "User",
      icon: FaUserFriends,
      path: "/user",
      isAllow: havePermission(PERMISSION.USER),
      children: [
        {
          name: "List User",
          path: "/user",
          isAllow: havePermission(PERMISSION.ACCESS_USER_LIST),
        },
      ],
    },
    {
      name: "Asset",
      icon: FaBoxOpen,
      path: "/asset",
      isAllow: havePermission(PERMISSION.ASSET),
      children: [
        {
          name: "List Asset",
          path: "/asset",
          isAllow: havePermission(PERMISSION.ACCESS_ASSET_LIST),
        },
      ],
    },
    {
      name: "Audit",
      icon: IoIosPaper,
      path: "/audit",
      isAllow: true,
      children: [
        {
          name: "Sessions",
          path: "/audit",
          isAllow: true,
        },
        {
          name: "History",
          path: "/audit/history",
          isAllow: true,
        },
      ],
    },
    {
      name: "Setting",
      icon: IoSettings,
      path: "/setting",
      isAllow: true,
      children: [
        {
          name: "Account",
          path: "/setting",
          isAllow: true,
        },
        {
          name: "Permission",
          path: "/setting/permission",
          isAllow: true,
        },
      ],
    },
  ];
  const navigate = useNavigate();
  const { closedList } = useSelector(commonSelector);

  const handleAddCloseList = (id: string) => () => {
    if (closedList.includes(id)) {
      dispatch(setClosedList(closedList.filter((ele) => ele !== id)));
    } else {
      dispatch(setClosedList(closedList.concat([id])));
    }
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <Box
      bg={useColorModeValue("white", "gray.900")}
      borderRight="1px"
      borderRightColor={useColorModeValue("gray.200", "gray.700")}
      w={{ base: "full", md: 60 }}
      pos="fixed"
      h="full"
      {...rest}
    >
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        <Flex alignItems="center">
          <Image src="/images/logo-trans.png" h="30px" />
          <Text color="purple.500" fontWeight="bold" fontSize="18px">
            ASMANAGE
          </Text>
        </Flex>
        <CloseButton display={{ base: "flex", md: "none" }} onClick={onClose} />
      </Flex>
      <Box overflow="auto" h="calc(100% - 142px)">
        {LinkItems.map(
          (link) =>
            link.isAllow && (
              <Fragment key={link.name}>
                <NavItem
                  icon={link.icon}
                  path={
                    link.children && link.children.length > 0 ? "" : link.path
                  }
                  isOpen={!closedList.includes(link.name)}
                  haveChild={link.children && link.children.length > 0}
                  onClick={handleAddCloseList(link.name)}
                >
                  {link.name}
                </NavItem>
                {link.children && link.children.length > 0 && (
                  <Collapse in={!closedList.includes(link.name)} animateOpacity>
                    <Box bg="#f2f2f2" py="16px" mb="6px">
                      {link.children?.map((child) => {
                        return (
                          child.isAllow && (
                            <NavItem
                              key={child.name}
                              icon={TbPointFilled}
                              path={child.path}
                              p="10px"
                              paddingLeft="32px"
                            >
                              {child.name}
                            </NavItem>
                          )
                        );
                      })}
                    </Box>
                  </Collapse>
                )}
              </Fragment>
            )
        )}
      </Box>
      <Button
        colorScheme="purple"
        margin="auto"
        display="block"
        my="12px"
        variant="outline"
        onClick={handleLogout}
      >
        Log out
      </Button>
    </Box>
  );
};

interface NavItemProps extends FlexProps {
  icon?: IconType;
  children: ReactText;
  path?: string;
  isOpen?: boolean;
  haveChild?: boolean;
}
const NavItem = ({
  icon,
  children,
  path,
  haveChild,
  isOpen,
  ...rest
}: NavItemProps) => {
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = useMemo(() => {
    return path && path === `${location.pathname}`;
  }, [location.pathname, path]);

  return (
    <Box
      as="a"
      display="block"
      mb={1}
      style={{ textDecoration: "none" }}
      _focus={{ boxShadow: "none" }}
      onClick={() => {
        !haveChild && path && navigate(path);
      }}
    >
      <Flex
        align="center"
        p="4"
        mx="4"
        borderRadius="lg"
        role="group"
        position="relative"
        cursor="pointer"
        bg={isActive ? "purple.400" : "transparent"}
        color={isActive ? "white" : "black"}
        _hover={{
          bg: "purple.400",
          color: "white",
        }}
        {...rest}
      >
        {icon && (
          <Icon
            mr="4"
            fontSize="16"
            _groupHover={{
              color: "white",
            }}
            as={icon}
          />
        )}
        {children}
        {haveChild && (
          <FaChevronDown
            fontSize="16"
            style={{
              transform: `rotate(${isOpen ? 180 : 0}deg)`,
              position: "absolute",
              right: "16px",
              transition: "transform 0.3s",
            }}
          />
        )}
      </Flex>
    </Box>
  );
};

interface MobileProps extends FlexProps {
  onOpen: () => void;
}
const MobileNav = ({ onOpen, ...rest }: MobileProps) => {
  return (
    <Flex
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 24 }}
      height="20"
      alignItems="center"
      bg={useColorModeValue("white", "gray.900")}
      borderBottomWidth="1px"
      borderBottomColor={useColorModeValue("gray.200", "gray.700")}
      justifyContent="flex-start"
      {...rest}
    >
      <IconButton
        variant="outline"
        onClick={onOpen}
        aria-label="open menu"
        icon={<IoMenu />}
      />
      <Flex alignItems="center" ml={2}>
        <Text color="purple.500" fontWeight="bold">
          ASMANAGE
        </Text>
      </Flex>
    </Flex>
  );
};
