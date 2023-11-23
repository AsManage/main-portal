import { ChangeEvent, useState } from "react";
import {
  Flex,
  Heading,
  Input,
  Button,
  InputGroup,
  Stack,
  InputLeftElement,
  chakra,
  Box,
  Link,
  FormControl,
  FormHelperText,
  InputRightElement,
} from "@chakra-ui/react";
import { FaUserAlt, FaLock } from "react-icons/fa";
import { useDispatch } from "store/store";
import { loginAction } from "store/auth";

const CFaUserAlt = chakra(FaUserAlt);
const CFaLock = chakra(FaLock);

export const LoginContainers = () => {
  const [info, setInfo] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();

  const handleShowClick = () => setShowPassword(!showPassword);

  const handleChangeInfo =
    (key: string) => (e: ChangeEvent<HTMLInputElement>) => {
      setInfo({
        ...info,
        [key]: e.target.value,
      });
    };

  const handleLogin = () => {
    dispatch(loginAction(info));
  };

  return (
    <Flex
      flexDirection="column"
      width="100wh"
      height="100vh"
      backgroundColor="gray.200"
      justifyContent="center"
      alignItems="center"
    >
      <Stack
        flexDir="column"
        mb="2"
        justifyContent="center"
        alignItems="center"
      >
        <Heading color="purple.600">Welcome to Asmanage</Heading>
        <Box minW={{ base: "90%", md: "468px" }}>
          <Stack
            spacing={4}
            p="1rem"
            backgroundColor="whiteAlpha.900"
            boxShadow="md"
          >
            <FormControl>
              <InputGroup>
                <InputLeftElement
                  pointerEvents="none"
                  children={<CFaUserAlt color="gray.300" />}
                />
                <Input
                  type="email"
                  placeholder="email address"
                  value={info.email}
                  onChange={handleChangeInfo("email")}
                />
              </InputGroup>
            </FormControl>
            <FormControl>
              <InputGroup>
                <InputLeftElement
                  pointerEvents="none"
                  color="gray.300"
                  children={<CFaLock color="gray.300" />}
                />
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  value={info.password}
                  onChange={handleChangeInfo("password")}
                />
                <InputRightElement width="4.5rem">
                  <Button h="1.75rem" size="sm" onClick={handleShowClick}>
                    {showPassword ? "Hide" : "Show"}
                  </Button>
                </InputRightElement>
              </InputGroup>
              <FormHelperText textAlign="right">
                <Link>forgot password?</Link>
              </FormHelperText>
            </FormControl>
            <Button
              borderRadius={0}
              type="submit"
              variant="solid"
              colorScheme="purple"
              width="full"
              onClick={handleLogin}
            >
              Login
            </Button>
          </Stack>
        </Box>
      </Stack>
      <Box>
        New to us?{" "}
        <Link color="purple.500" href="#">
          Sign Up
        </Link>
      </Box>
    </Flex>
  );
};
