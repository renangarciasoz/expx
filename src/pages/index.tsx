import { Box, Grid, Theme, Typography, useMediaQuery } from "@mui/material";
import { NextPage } from "next";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { parseCookies } from "nookies";
import Lottie from "react-lottie";
import { TOKEN_NAME } from "src/constants/auth.constants";
import { COMMON } from "src/constants/translations.constants";
import { DASHBOARD } from "src/constants/urls.constants";
import { PlatformLayout } from "src/layouts/platform.layout";
import animationData from "src/lotties/diamond.json";

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
            Your best way to invest in the crypto world.
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
