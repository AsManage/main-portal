import { Button, ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter } from "react-router-dom";
import { MainRoutes } from "./routes";

function App() {
  return (
    <ChakraProvider>
      <BrowserRouter>
        <MainRoutes />
      </BrowserRouter>
    </ChakraProvider>
  );
}

export default App;
