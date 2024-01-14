import { Box, Button } from "@chakra-ui/react";
import SimpleSidebar from "components/molecules/Sidebar";
import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { validateLogin } from "services/auth.service";
import { LocalStorage } from "utils/localStorage";
import { IoMdArrowRoundBack } from "react-icons/io";

type Props = {
  children: React.ReactNode;
};
const storage = new LocalStorage();

export function MainLayout({ children }: Props) {
  const location = useLocation();

  useEffect(() => {
    const accessToken = storage.getStorageItem(
      storage.availableKey.ACCESS_TOKEN
    );
    (async () => {
      await validateLogin();
    })();
    if (!accessToken) window.location.href = "/auth";
  }, [location]);

  return (
    <SimpleSidebar>
      <Box>{children}</Box>
    </SimpleSidebar>
  );
}
