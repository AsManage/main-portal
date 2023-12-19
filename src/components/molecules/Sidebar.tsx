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
import { Fragment, ReactText, useMemo, useState } from "react";
import { useDispatch } from "store/store";
import { logout } from "store/auth";
import { useLocation, useNavigate } from "react-router-dom";
import { IoSettings } from "react-icons/io5";
import { havePermission } from "utils/common";
import { PERMISSION } from "constants/common";

interface LinkItemProps {
  name: string;
  icon?: IconType;
  path: string;
  isAllow: boolean;
  children?: LinkItemProps[];
}

export default function SimpleSidebar({ children }: any) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Box minH="100vh" bg={useColorModeValue("gray.100", "gray.900")}>
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
      icon: FaHome,
      path: "/organisation",
      isAllow: havePermission(PERMISSION.ORGANIZATION),
      children: [
        {
          name: "Structural",
          icon: FaNetworkWired,
          path: "/organisation",
          isAllow: havePermission(PERMISSION.ACCESS_ORGANISATION_UNIT_TAB),
        },
        {
          name: "Unit Type",
          icon: FaFileInvoice,
          path: "/organisation/unit-type",
          isAllow: havePermission(PERMISSION.ACCESS_ORGANISATION_UNIT_TYPE_TAB),
        },
        {
          name: "Location",
          icon: IoLocation,
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
    },
    {
      name: "Asset",
      icon: FaBoxOpen,
      path: "/asset",
      isAllow: havePermission(PERMISSION.USER),
    },
    { name: "Setting", icon: IoSettings, path: "/setting", isAllow: true },
  ];
  const [closeList, setCloseList] = useState<string[]>([]);

  const handleAddCloseList = (id: string) => () => {
    if (closeList.includes(id)) {
      setCloseList(closeList.filter((ele) => ele !== id));
    } else {
      setCloseList(closeList.concat([id]));
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
        <IoLogOut fontSize="20px" cursor="pointer" onClick={handleLogout} />
        <CloseButton display={{ base: "flex", md: "none" }} onClick={onClose} />
      </Flex>
      {LinkItems.map(
        (link) =>
          link.isAllow && (
            <Fragment key={link.name}>
              <NavItem
                icon={link.icon}
                path={
                  link.children && link.children.length > 0 ? "" : link.path
                }
                isOpen={!closeList.includes(link.name)}
                haveChild={link.children && link.children.length > 0}
                onClick={handleAddCloseList(link.name)}
              >
                {link.name}
              </NavItem>
              {link.children && link.children.length > 0 && (
                <Collapse in={!closeList.includes(link.name)} animateOpacity>
                  <Box bg="#f2f2f2" py="16px">
                    {link.children?.map((child) => {
                      return (
                        child.isAllow && (
                          <NavItem
                            key={child.name}
                            icon={child.icon}
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
