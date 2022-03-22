import { Button, Container, Typography } from "@mui/material";
import { AuthContext } from "contexts/auth.ctx";
import { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { destroyCookie, parseCookies } from "nookies";
import { useContext } from "react";
import { TOKEN_NAME } from "src/constants/auth.constants";
import { LOGIN } from "src/constants/urls.constants";

const DashboardPage: NextPage = () => {
  const { user } = useContext(AuthContext);
  const router = useRouter();

  if (user?.avatar_url) {
    return (
      <Container>
        <Head>
          <title>Dashboard</title>
        </Head>

        <Typography variant="h1">Dashboard</Typography>
        <Image
          width={100}
          height={100}
          src={user?.avatar_url}
          alt="user picture"
        />
        <Button
          onClick={() => {
            destroyCookie(undefined, TOKEN_NAME);
            router.push(LOGIN);
          }}
        >
          Logout
        </Button>
      </Container>
    );
  }

  return null;
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  console.log(ctx.req.cookies);
  const { [TOKEN_NAME]: token } = parseCookies(ctx);

  if (!token) {
    return {
      redirect: {
        permanent: false,
        destination: LOGIN,
      },
    };
  }

  return {
    props: {},
  };
};

export default DashboardPage;
