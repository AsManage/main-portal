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
  Text,
} from "@chakra-ui/react";
import { IoMail } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { EMAIL_REGEX } from "utils/regex";
import { sendVerifyCode } from "services/auth.service";
import { useDispatch } from "store/store";
import { setEmailCached } from "store/auth";

const IoMailIcon = chakra(IoMail);

export const ForgotPasswordContainer = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");

  const handleChangeEmail = (event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handleSendVerifyCode = async () => {
    if (!EMAIL_REGEX.test(email)) {
      setEmailError("Invalid email format!");
    } else {
      setEmailError("");
      const res = await sendVerifyCode({ email });

      const { data } = res;
      if (data?.isSuccess) {
        dispatch(setEmailCached(email));
        navigate("verify");
      }
    }
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
        <Heading color="purple.600" textTransform="uppercase">
          Send Verify Code
        </Heading>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendVerifyCode();
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
                    children={<IoMailIcon color="gray.300" />}
                  />
                  <Input
                    type="email"
                    placeholder="Email address"
                    value={email}
                    isInvalid={emailError.length > 0}
                    onChange={handleChangeEmail}
                  />
                </InputGroup>
                {emailError && (
                  <Text className="error-message">{emailError}</Text>
                )}
              </FormControl>
              <Button
                borderRadius={0}
                type="submit"
                variant="solid"
                colorScheme="purple"
                width="full"
              >
                Send
              </Button>
            </Stack>
          </Box>
        </form>
      </Stack>
      <Box>
        <Link
          color="purple.500"
          onClick={() => {
            navigate("/auth");
          }}
        >
          Go to Login page
        </Link>
      </Box>
    </Flex>
  );
};

