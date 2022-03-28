import { ArrowCircleDown, ArrowCircleUp } from "@mui/icons-material";
import { AppBar, Box, IconButton, Toolbar, Typography } from "@mui/material";
import { COMPANY_NAME } from "constants/company.constants";
import { POSITION_TOP } from "constants/header.constants";
import { AuthBtns } from "modules/auth/auth-btns.component";
import { AuthForm } from "modules/auth/auth-form.component";
import { useHeader } from "modules/header/hooks/use-header";

export const Header = () => {
  const { authFormIsOpened, headerIsAtTopPosition, changeHeaderPosition } =
    useHeader(); // ?

  return (
    <AppBar
      data-testid="header"
      position="fixed"
      sx={{
        top: headerIsAtTopPosition ? 0 : "unset",
        bottom: headerIsAtTopPosition ? "unset" : 20,
        flexDirection: headerIsAtTopPosition ? "column" : "column-reverse",
        height: authFormIsOpened ? "100vh" : "auto",
        display: "flex",
        backgroundColor: "grey.1000",
        p: 1,
      }}
      elevation={0}
    >
      <Toolbar sx={{ boxShadow: "none" }}>
        <Typography
          data-testid="logo"
          sx={{ flex: 1 }}
          variant="h4"
          component="h1"
        >
          {COMPANY_NAME}
        </Typography>
        {!authFormIsOpened && (
          <Box flex={1} display="flex" justifyContent="center">
            <IconButton
              data-testid="change-header-position-btn"
              onClick={() =>
                changeHeaderPosition(
                  headerIsAtTopPosition ? "bottom" : POSITION_TOP
                )
              }
            >
              {headerIsAtTopPosition ? <ArrowCircleDown /> : <ArrowCircleUp />}
            </IconButton>
          </Box>
        )}
        <AuthBtns />
      </Toolbar>
      {authFormIsOpened && <AuthForm />}
    </AppBar>
  );
};
