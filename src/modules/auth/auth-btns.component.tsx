import { Close } from "@mui/icons-material";
import { Box, Button, IconButton, Typography } from "@mui/material";
import { COMMON } from "constants/translations.constants";
import { useHeader } from "modules/header/hooks/use-header";
import { useTranslation } from "next-i18next";
import { useAuth } from "./hooks/use-auth";

export const AuthBtns = () => {
  const { t } = useTranslation(COMMON);

  const { signOut, user, isAuthenticated } = useAuth();
  const { authFormIsOpened, closeAuthForm, openAuthForm } = useHeader();

  const shouldShowLoginBtn = !authFormIsOpened && !isAuthenticated;
  const shouldShowLogoutBtn = !authFormIsOpened && user;

  return (
    <>
      <Box flex={1} display="flex" justifyContent="flex-end">
        {authFormIsOpened && (
          <IconButton onClick={closeAuthForm} data-testid="close-login-btn">
            <Close />
          </IconButton>
        )}

        {shouldShowLoginBtn && (
          <Button
            data-testid="login-btn"
            disableElevation
            variant="contained"
            onClick={openAuthForm}
          >
            {t("auth.loginToolbarBtn")}
          </Button>
        )}

        {shouldShowLogoutBtn && (
          <Box display="flex" alignItems="center">
            <Typography
              sx={{ mr: 2 }}
              variant="subtitle2"
              data-testid="username"
            >
              {user.username}
            </Typography>
            <Button
              disableElevation
              variant="contained"
              onClick={signOut}
              data-testid="logout-btn"
            >
              {t("auth.logoutBtn")}
            </Button>
          </Box>
        )}
      </Box>
    </>
  );
};
