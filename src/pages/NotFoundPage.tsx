import { Box, Button, Img } from "@chakra-ui/react";

import { useNavigate } from "react-router-dom";

export function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <Box
      w="100vw"
      h="100vh"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
    >
      <Img src="/images/404.png" w="auto" height="auto" />
      <Button
        colorScheme="purple"
        onClick={() => {
          navigate(-1);
        }}
      >
        Go Back
      </Button>
    </Box>
  );
}
