import { ChangeEvent, useEffect, useState } from "react";
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
  FormControl,
  InputRightElement,
  Text,
} from "@chakra-ui/react";
import { FaLock } from "react-icons/fa";
import { useSelector } from "store/store";
import { useNavigate } from "react-router-dom";
import { changePassword } from "services/auth.service";
import { authSelector } from "store/auth";

const CFaLock = chakra(FaLock);

export const ChangePasswordContainer = () => {
  const [info, setInfo] = useState({
    password: "",
    rePassword: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showRePassword, setShowRePassword] = useState(false);

  const { emailCached, resetTokenCached } = useSelector(authSelector);

  const handleShowClick = () => setShowPassword(!showPassword);
  const handleReShowClick = () => setShowRePassword(!showRePassword);

  const handleChangeInfo =
    (key: string) => (e: ChangeEvent<HTMLInputElement>) => {
      setInfo({
        ...info,
        [key]: e.target.value,
      });
    };

  const handleChangePassword = async () => {
    if (info.password.length < 8 || info.rePassword.length < 8) {
      setError("Password contain at least 8 character!");
    } else if (info.password !== info.rePassword) {
      setError("Password not match!");
    } else if (!info.password || !info.rePassword) {
      setError("Password cannot empty!");
    } else {
      setError("");
      const res = await changePassword({
        email: emailCached,
        password: info.password,
        resetToken: resetTokenCached,
      });
      const { data } = res;
      if (data?.isSuccess) {
        navigate("/auth");
      }
    }
  };

  useEffect(() => {
    if (!resetTokenCached || !emailCached) navigate("/auth/forgot-password");
  }, [emailCached, navigate, resetTokenCached]);

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
        <Heading color="purple.600" textTransform="uppercase">
          Change Password
        </Heading>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleChangePassword();
          }}
        >
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
                    color="gray.300"
                    children={<CFaLock color="gray.300" />}
                  />
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    isInvalid={error.length > 0}
                    value={info.password}
                    onChange={handleChangeInfo("password")}
                  />
                  <InputRightElement width="4.5rem">
                    <Button h="1.75rem" size="sm" onClick={handleShowClick}>
                      {showPassword ? "Hide" : "Show"}
                    </Button>
                  </InputRightElement>
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
                    type={showRePassword ? "text" : "password"}
                    placeholder="Re-enter password"
                    isInvalid={error.length > 0}
                    value={info.rePassword}
                    onChange={handleChangeInfo("rePassword")}
                  />
                  <InputRightElement width="4.5rem">
                    <Button h="1.75rem" size="sm" onClick={handleReShowClick}>
                      {showRePassword ? "Hide" : "Show"}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </FormControl>
              {error && <Text className="error-message">{error}</Text>}
              <Button
                borderRadius={0}
                type="submit"
                variant="solid"
                colorScheme="purple"
                width="full"
              >
                Submit
              </Button>
            </Stack>
          </Box>
        </form>
      </Stack>
    </Flex>
  );
};
