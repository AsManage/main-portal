import { Button, ButtonProps } from "@chakra-ui/react";
import React from "react";

export default function AMButton({ children, ...res }: ButtonProps) {
  return (
    <Button
      fontSize="var(--font-sm)"
      padding="11px 32px"
      borderRadius="16px"
      bg="var(--blue-01)"
      color="var(--white-01)"
      transition="0.3s"
      _hover={{
        bg: "var(--blue-01-o5)",
      }}
    >
      {children}
    </Button>
  );
}
