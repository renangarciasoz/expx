import {
  Box,
  Button,
  Container,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { SignInRequestData } from "api/auth.api";
import { AuthContext } from "contexts/auth.ctx";
import type { NextPage } from "next";
import Head from "next/head";
import { useContext } from "react";
import { Controller, useForm } from "react-hook-form";

const Login: NextPage = () => {
  const { handleSubmit, control } = useForm<SignInRequestData>({
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const { signIn } = useContext(AuthContext);

  function handleSignIn({ email, password }: SignInRequestData) {
    signIn({ email, password });
  }

  return (
    <Container>
      <Head>
        <title>Login</title>
      </Head>

      <Paper sx={{ p: 4 }}>
        <Typography variant="h1">Welcome</Typography>
        <Box
          component="form"
          onSubmit={handleSubmit(handleSignIn)}
          display="flex"
          flexDirection="column"
          m={2}
        >
          <Controller
            control={control}
            name="email"
            render={({ field }) => <TextField {...field} type="email" />}
          />

          <Controller
            control={control}
            name="password"
            render={({ field }) => <TextField {...field} type="password" />}
          />

          <Button type="submit">Sign in</Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default Login;
