import { MainLayout } from "layouts/MainLayout";
import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

type Props = {};

export function HomePage({}: Props) {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/business");
  }, []);

  return (
    <MainLayout>
      <p>HOME</p>
    </MainLayout>
  );
}
