import { Typography } from "@mui/material";
import { NextPage } from "next";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { COMMON } from "src/constants/translations.constants";
import { PlatformLayout } from "src/layouts/platform.layout";

const HomePage: NextPage = () => {
  const { t } = useTranslation(COMMON);

  return (
    <PlatformLayout>
      <Typography variant="h1" align="center">
        {t("home.comingSoon")}
      </Typography>
    </PlatformLayout>
  );
};

export const getServerSideProps = async ({ locale }: { locale: string }) => {
  return {
    props: {
      locale,
      ...(await serverSideTranslations(locale, [COMMON])),
    },
  };
};

export default HomePage;
