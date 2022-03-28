import { Box, Container, Divider, Link, Typography } from "@mui/material";
import { COMMON } from "constants/translations.constants";
import { Header } from "modules/header/header.component";
import { useTranslation } from "next-i18next";
import React from "react";

export const PlatformLayout = ({ children }: { children: React.ReactNode }) => {
  const { t } = useTranslation(COMMON);

  return (
    <>
      <Header />

      <Container
        component={"main"}
        sx={{
          py: 10,
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {children}
      </Container>
      <Divider />
      <Box component="footer" textAlign="center" p={3}>
        <Typography variant="caption" component="p">
          {t("footer.allRightsReserved")}
        </Typography>
        <Typography variant="caption" component="p">
          {t("footer.madeBy")}{" "}
          <Link href="https://renangarcia.com" color="text.secondary">
            Renan Garcia
          </Link>
        </Typography>
      </Box>
    </>
  );
};
