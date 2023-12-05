import { Box, ChakraProvider, Spinner } from "@chakra-ui/react";
import { BrowserRouter } from "react-router-dom";
import MainRoutes from "./routes";
import { useSelector } from "store/store";
import { commonSelector } from "store/common";

function App() {
  const { isLoading } = useSelector(commonSelector);

  return (
    <ChakraProvider>
      <BrowserRouter>
        {isLoading && (
          <Box
            position="fixed"
            top="0"
            left="0"
            w="100vw"
            h="100vh"
            display="flex"
            alignItems="center"
            justifyContent="center"
            zIndex={1000}
            bg="rgba(0,0,0,0.6)"
          >
            <Spinner
              color="purple.500"
              size="xl"
              thickness="6px"
              emptyColor="gray.200"
            />
          </Box>
        )}
        <MainRoutes />
      </BrowserRouter>
    </ChakraProvider>
  );
}

export default App;
