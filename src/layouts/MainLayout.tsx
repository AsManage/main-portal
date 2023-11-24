import { Box } from "@chakra-ui/react";
import SimpleSidebar from "components/molecules/Sidebar";
import React from "react";

type Props = {
  children: React.ReactNode;
};

export function MainLayout({ children }: Props) {
  return <SimpleSidebar>{children}</SimpleSidebar>;
}
