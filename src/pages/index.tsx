import { Typography } from "@mui/material";
import { NextPage } from "next";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { parseCookies } from "nookies";
import { TOKEN_NAME } from "src/constants/auth.constants";
import { COMMON } from "src/constants/translations.constants";
import { DASHBOARD } from "src/constants/urls.constants";
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

export const getServerSideProps = async ({
  locale,
  ...ctx
}: {
  locale: string;
}) => {
  const { [TOKEN_NAME]: token } = parseCookies(ctx);

  if (token) {
    return {
      redirect: {
        permanent: false,
        destination: DASHBOARD,
      },
    };
  }

  return {
    props: {
      locale,
      ...(await serverSideTranslations(locale, [COMMON])),
    },
  };
};

export default HomePage;
