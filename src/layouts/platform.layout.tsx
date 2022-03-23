import { ArrowCircleDown, ArrowCircleUp, Close } from "@mui/icons-material";
import {
  AppBar,
  Box,
  Button,
  Container,
  IconButton,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import { SignInRequestData } from "api/auth.api";
import { AuthContext } from "contexts/auth.ctx";
import { useTranslation } from "next-i18next";
import React, { useContext, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { POSITION_TOP } from "src/constants/toolbar.constants";
import { COMMON } from "src/constants/translations.constants";

export const PlatformLayout = ({ children }: { children: React.ReactNode }) => {
  // States
  const [loginOpened, setLoginOpened] = useState(false);
  const [toolbarPosition, setToolbarPosition] = useState(POSITION_TOP);

  // Hooks
  const { t } = useTranslation(COMMON);
  const { signIn, isAuthenticated, signOut, user } = useContext(AuthContext);
  const { handleSubmit, control } = useForm<SignInRequestData>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // Constants
  const toolbarIsAtTopPosition = toolbarPosition === POSITION_TOP;
  const shouldShowLoginBtn = !loginOpened && !isAuthenticated;
  const shouldShowLogoutBtn = !loginOpened && isAuthenticated;

  // Functions
  function handleSignIn({ email, password }: SignInRequestData) {
    signIn({ email, password });
  }
  function handleOpenLogin() {
    setLoginOpened(true);
  }
  function handleCloseLogin() {
    setLoginOpened(false);
  }

  return (
    <>
      <AppBar
        position="fixed"
        sx={{
          top: toolbarIsAtTopPosition ? 0 : "unset",
          bottom: toolbarIsAtTopPosition ? "unset" : 20,
          flexDirection: toolbarIsAtTopPosition ? "column" : "column-reverse",
          height: loginOpened ? "100vh" : "auto",
          display: "flex",
          backgroundColor: "grey.1000",
        }}
        elevation={0}
      >
        <Toolbar sx={{ boxShadow: "none" }}>
          <Typography sx={{ flex: 1 }} variant="h4" component="h1">
            DxEx
          </Typography>
          {!loginOpened && (
            <Box flex={1} display="flex" justifyContent="center">
              <IconButton
                onClick={() =>
                  setToolbarPosition(
                    toolbarIsAtTopPosition ? "bottom" : POSITION_TOP
                  )
                }
              >
                {toolbarIsAtTopPosition ? (
                  <ArrowCircleDown />
                ) : (
                  <ArrowCircleUp />
                )}
              </IconButton>
            </Box>
          )}
          <Box flex={1} display="flex" justifyContent="flex-end">
            {loginOpened && (
              <IconButton onClick={handleCloseLogin}>
                <Close />
              </IconButton>
            )}

            {shouldShowLoginBtn && (
              <Button
                disableElevation
                variant="contained"
                onClick={handleOpenLogin}
              >
                {t("auth.loginToolbarBtn")}
              </Button>
            )}

            {shouldShowLogoutBtn && (
              <Box display="flex" alignItems="center">
                <Typography sx={{ mr: 2 }} variant="subtitle2">
                  {user?.username}
                </Typography>
                <Button disableElevation variant="contained" onClick={signOut}>
                  {t("auth.logoutBtn")}
                </Button>
              </Box>
            )}
          </Box>
        </Toolbar>
        {loginOpened && (
          <Box
            height="100vh"
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
          >
            <Box
              mt={toolbarIsAtTopPosition ? -10 : 10}
              width={{ xs: 320, md: 420 }}
            >
              <Typography variant="h1" align="center">
                {t("auth.loginTitle")}
              </Typography>
              <Box
                component="form"
                onSubmit={handleSubmit(handleSignIn)}
                display="flex"
                flexDirection="column"
                mt={3}
              >
                <Controller
                  control={control}
                  name="email"
                  rules={{
                    required: true,
                  }}
                  render={({ field, fieldState }) => (
                    <TextField
                      sx={{ mb: 1 }}
                      {...field}
                      fullWidth
                      label="E-mail"
                      type="email"
                      error={!!fieldState.error}
                    />
                  )}
                />

                <Controller
                  control={control}
                  name="password"
                  rules={{
                    required: true,
                  }}
                  render={({ field, fieldState }) => (
                    <TextField
                      {...field}
                      label="Password"
                      type="password"
                      error={!!fieldState.error}
                    />
                  )}
                />

                <Button
                  disableElevation
                  type="submit"
                  variant="contained"
                  sx={{ mt: 2 }}
                >
                  {t("auth.loginBtn")}
                </Button>
              </Box>
            </Box>
          </Box>
        )}
      </AppBar>
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
    </>
  );
};
