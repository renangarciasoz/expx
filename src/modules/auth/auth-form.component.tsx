import { Box, Button, TextField, Typography } from "@mui/material";
import { SignInRequestData } from "api/auth.api";
import { COMMON } from "constants/translations.constants";
import { useAuth } from "modules/auth/hooks/use-auth";
import { useHeader } from "modules/header/hooks/use-header";
import { useTranslation } from "next-i18next";
import { Controller, useForm } from "react-hook-form";

export const AuthForm = () => {
  const { t } = useTranslation(COMMON);
  const { handleSubmit, control } = useForm<SignInRequestData>({
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const { headerIsAtTopPosition } = useHeader();
  const { signIn, error } = useAuth(); // ?

  function handleSignIn({ email, password }: SignInRequestData) {
    signIn({ email, password });
  }

  return (
    <>
      <Box
        height="100vh"
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
      >
        <Box
          data-testid="auth-wrapper"
          mt={headerIsAtTopPosition ? -10 : 10}
          width={{ xs: 320, md: 420 }}
        >
          <Typography variant="h1" align="center">
            {t("auth.loginTitle")}
          </Typography>
          <Box
            component="form"
            data-testid="auth-form"
            onSubmit={handleSubmit(handleSignIn)}
            display="flex"
            flexDirection="column"
            alignItems="center"
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
                  sx={{ mb: 1, width: 290 }}
                  {...field}
                  fullWidth
                  inputProps={{
                    "data-testid": "email-input",
                  }}
                  label="E-mail"
                  type="email"
                  error={!!fieldState.error || !!error}
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
                  sx={{ width: 290 }}
                  inputProps={{
                    "data-testid": "password-input",
                  }}
                  label="Password"
                  type="password"
                  error={!!fieldState.error || !!error}
                />
              )}
            />
            {error && (
              <Typography
                data-testid="login-error-msg"
                variant="caption"
                sx={{ mt: 1 }}
                color="error.main"
              >
                {t(`auth.${error}`)}
              </Typography>
            )}

            <Button
              data-testid="login-submit-btn"
              disableElevation
              type="submit"
              variant="contained"
              sx={{ mt: 2, width: 100 }}
            >
              {t("auth.loginBtn")}
            </Button>
          </Box>
        </Box>
      </Box>
    </>
  );
};
