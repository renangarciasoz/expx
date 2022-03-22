import { Box, Typography } from "@mui/material";
import { AuthContext } from "contexts/auth.ctx";
import { GetServerSideProps, NextPage } from "next";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Head from "next/head";
import { parseCookies } from "nookies";
import { useContext } from "react";
import { TOKEN_NAME } from "src/constants/auth.constants";
import { COMMON } from "src/constants/translations.constants";
import { HOME } from "src/constants/urls.constants";
import { PlatformLayout } from "src/layouts/platform.layout";

const DashboardPage: NextPage = () => {
  const { user } = useContext(AuthContext);
  const { t } = useTranslation(COMMON);

  return (
    <PlatformLayout>
      <Head>
        <title>{t("dashboard.pageTitle")}</title>
      </Head>

      <Box display="flex" flexDirection="column" alignItems="center">
        <Typography variant="h1">{t("dashboard.welcome")}</Typography>
        <Typography variant="h2">{user?.username}</Typography>
      </Box>
    </PlatformLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({
  locale,
  ...ctx
}: {
  locale: string;
} & any) => {
  const { [TOKEN_NAME]: token } = parseCookies(ctx);

  if (!token) {
    return {
      redirect: {
        permanent: false,
        destination: HOME,
      },
    };
  }

  return {
    props: {
      locale: locale,
      ...(await serverSideTranslations(locale, [COMMON])),
    },
  };
};

export default DashboardPage;
