import AMButton from "components/atoms/AMButton";
import React from "react";
import { useTranslation } from "react-i18next";

type Props = {};

export function HomePage({}: Props) {
  const { t, i18n } = useTranslation();

  return (
    <div>
      {t("title")}
      <AMButton>Publish now</AMButton>
    </div>
  );
}
