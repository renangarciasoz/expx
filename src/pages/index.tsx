import { Box, Grid, Theme, Typography, useMediaQuery } from "@mui/material";
import { TOKEN_NAME } from "constants/auth.constants";
import { COMPANY_NAME } from "constants/company";
import { COMMON } from "constants/translations.constants";
import { DASHBOARD } from "constants/urls.constants";
import { PlatformLayout } from "layouts/platform.layout";
import animationData from "lotties/diamond.json";
import { NextPage } from "next";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Head from "next/head";
import { parseCookies } from "nookies";
import Lottie from "react-lottie";

const HomePage: NextPage = () => {
  const { t } = useTranslation(COMMON);
  const isMobile = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down("sm")
  );

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <PlatformLayout>
      <Head>
        <title>Home page | {COMPANY_NAME}</title>
      </Head>
      <Grid container sx={{ mt: -12 }}>
        <Grid item xs={12}>
          <Box
            width="100%"
            height={320}
            overflow="hidden"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <Lottie
              options={defaultOptions}
              height={isMobile ? 250 : 320}
              width={isMobile ? 250 : 320}
              style={{ margin: -100 }}
            />
          </Box>
          <Typography
            variant="h1"
            align="center"
            color="text.secondary"
            sx={{
              mt: -10,
              mb: 2,
            }}
          >
            {t("home.comingSoon")}
          </Typography>
          <Typography align="center" variant="h6" color="text.secondary">
            {t("home.subtitle")}
          </Typography>
        </Grid>
      </Grid>
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
