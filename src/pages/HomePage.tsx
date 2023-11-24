import { MainLayout } from "layouts/MainLayout";
import React from "react";
import { useTranslation } from "react-i18next";

type Props = {};

export function HomePage({}: Props) {
  const { t, i18n } = useTranslation();

  return (
    <MainLayout>
      <p>ahihi</p>
    </MainLayout>
  );
}
