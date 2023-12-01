import { useCallback, useEffect, useMemo, useState } from "react";
import {
  Flex,
  Heading,
  Button,
  Stack,
  Box,
  Link,
  Text,
  HStack,
  PinInput,
  PinInputField,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { sendVerifyCode, verifyCode } from "services/auth.service";
import { useDispatch, useSelector } from "store/store";
import { authSelector, setResetTokenCached } from "store/auth";
import Countdown from "react-countdown";

export const VerifyCodeContainer = () => {
  const navigate = useNavigate();
  const [restartKey, setRestartKey] = useState(0);
  const [code, setCode] = useState("");
  const [codeError, setCodeError] = useState("");
  const { emailCached } = useSelector(authSelector);
  const dispatch = useDispatch();

  const handleChangeCode = (value: string) => {
    setCode(value);
  };

  const timeExpired = useMemo(() => {
    return Date.now() + 1000 * 60;
  }, [restartKey]);

  const handleSendVerifyCode = async () => {
    setRestartKey(restartKey + 1);
    await sendVerifyCode({ email: emailCached });
  };

  const handleChangeVerify = async () => {
    if (code.length < 6) setCodeError("Verify code must have 6 digits!");
    else {
      const res = await verifyCode({ email: emailCached, code });
      const { data } = res;
      if (data?.isSuccess) {
        dispatch(setResetTokenCached(data?.result?.resetToken));
        navigate("/auth/change-password");
      }
      setCodeError("");
    }
  };

  const renderer = useCallback(
    ({ hours, minutes, seconds, completed }: any) => {
      if (completed) {
        return <Text className="error-message">Verify code is expired!</Text>;
      } else {
        return (
          <Text>
            Verify code will expired after {String(minutes).padStart(2, "0")}:
            {String(seconds).padStart(2, "0")}
          </Text>
        );
      }
    },
    []
  );

  useEffect(() => {
    if (!emailCached) navigate(-1);
  }, [emailCached, navigate]);

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
          VERIFY CODE
        </Heading>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleChangeVerify();
          }}
        >
          <Box minW={{ base: "90%", md: "468px" }}>
            <Stack
              spacing={4}
              p="1rem"
              backgroundColor="whiteAlpha.900"
              boxShadow="md"
            >
              <HStack justifyContent="center">
                <PinInput
                  type="alphanumeric"
                  value={code}
                  isInvalid={codeError.length > 0}
                  onChange={handleChangeCode}
                >
                  <PinInputField />
                  <PinInputField />
                  <PinInputField />
                  <PinInputField />
                  <PinInputField />
                  <PinInputField />
                </PinInput>
              </HStack>
              {codeError && (
                <Text className="error-message" margin="auto">
                  {codeError}
                </Text>
              )}
              <Box textAlign="center">
                <Countdown
                  key={restartKey}
                  renderer={renderer}
                  autoStart
                  date={timeExpired}
                />
              </Box>
              <Button
                borderRadius={0}
                type="submit"
                variant="solid"
                colorScheme="purple"
                width="full"
              >
                Verify
              </Button>
            </Stack>
          </Box>
        </form>
      </Stack>

      <Box>
        <Link color="purple.500" onClick={handleSendVerifyCode}>
          Resend
        </Link>
      </Box>
    </Flex>
  );
};

