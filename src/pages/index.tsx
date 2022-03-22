import { Container, Typography } from "@mui/material";
import { GetServerSideProps, NextPage } from "next";
import { LOGIN } from "src/constants/urls.constants";

const HomePage: NextPage = () => {
  return (
    <Container>
      <Typography variant="h1">Coming soon</Typography>
    </Container>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const UA = ctx.req.headers["user-agent"];
  const isMobile = Boolean(
    UA?.match(
      /Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i
    )
  );

  if (isMobile) {
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

export default HomePage;
