import SimpleSidebar from "components/molecules/Sidebar";
import React, { useEffect } from "react";
import { validateLogin } from "services/auth.service";
import { LocalStorage } from "utils/localStorage";

type Props = {
  children: React.ReactNode;
};
const storage = new LocalStorage();

export function MainLayout({ children }: Props) {
  useEffect(() => {
    const accessToken = storage.getStorageItem(
      storage.availableKey.ACCESS_TOKEN
    );
    (async () => {
      await validateLogin();
    })();
    if (!accessToken) window.location.href = "/login";
  }, []);

  return <SimpleSidebar>{children}</SimpleSidebar>;
}
