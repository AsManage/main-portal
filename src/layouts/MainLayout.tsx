import {
  Avatar,
  AvatarBadge,
  Badge,
  Box,
  Button,
  Flex,
  Input,
  InputGroup,
  InputLeftElement,
  Link,
  Text,
} from "@chakra-ui/react";
import SimpleSidebar from "components/molecules/Sidebar";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { validateLogin } from "services/auth.service";
import { LocalStorage } from "utils/localStorage";
import { IoMdArrowRoundBack } from "react-icons/io";
import { showData } from "utils/common";
import { TbPhoneIncoming } from "react-icons/tb";
import { CgLock, CgSearch } from "react-icons/cg";
import { FaClock } from "react-icons/fa";
import moment from "moment";

type Props = {
  children: React.ReactNode;
};
const storage = new LocalStorage();

const currentDateTime = () => {
  return `${moment().format("DD/MM/YYYY HH:mm:ss")}`;
};

export function MainLayout({ children }: Props) {
  const location = useLocation();
  const navigate = useNavigate();
  const userInfo = storage.getStorageItem(storage.availableKey.ACCOUNT_INFO);
  const [date, setDate] = useState<any>(currentDateTime());

  useEffect(() => {
    const accessToken = storage.getStorageItem(
      storage.availableKey.ACCESS_TOKEN
    );
    (async () => {
      await validateLogin();
    })();
    if (!accessToken) window.location.href = "/auth";
  }, [location]);

  useEffect(() => {
    const interval = setInterval(() => {
      setDate(currentDateTime());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <SimpleSidebar>
      <Flex
        width="100%"
        alignItems="center"
        justifyContent="space-between"
        bg="var(--chakra-colors-white)"
        paddingY="12px"
        paddingX="24px"
      >
        <Box
          w="32px"
          h="32px"
          borderRadius="25px"
          bg="purple.400"
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <IoMdArrowRoundBack
            fontSize="32px"
            cursor="pointer"
            color="white"
            onClick={() => {
              navigate(-1);
            }}
          />
        </Box>
        <InputGroup width="250px">
          <InputLeftElement pointerEvents="none">
            <FaClock color="gray.300" />
          </InputLeftElement>
          <Input
            type="text"
            textAlign="center"
            variant="filled"
            value={date}
            pointerEvents="none"
            placeholder="Enter something..."
            focusBorderColor="purple.400"
          />
        </InputGroup>
        <Flex
          cursor="pointer"
          onClick={() => {
            navigate("/setting");
          }}
        >
          <Avatar
            size="md"
            name={`${showData(userInfo?.lastName)}  ${showData(
              userInfo?.firstName
            )}`}
            src={userInfo?.image}
          >
            <AvatarBadge boxSize="1.25em" bg="green.500" />
          </Avatar>
          <Box ml="3">
            <Text fontWeight="bold">{`${showData(
              userInfo?.lastName
            )}  ${showData(userInfo?.firstName)}`}</Text>
            <Badge
              ml="1"
              colorScheme={userInfo?.role === "ROOT" ? "red" : "green"}
            >
              {showData(userInfo?.role)}
            </Badge>
          </Box>
        </Flex>
      </Flex>
      <Box>{children}</Box>
    </SimpleSidebar>
  );
}
