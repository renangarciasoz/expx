import {
  Box,
  Button,
  Grid,
  Paper,
  Theme,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { Graph } from "@types";
import { getGraphByName } from "api/graph.api";
import { TOKEN_NAME } from "constants/auth.constants";
import { COMPANY_NAME } from "constants/company.constants";
import { COMMON } from "constants/translations.constants";
import { HOME } from "constants/urls.constants";
import { format } from "date-fns";
import { PlatformLayout } from "layouts/platform.layout";
import { GetServerSideProps } from "next";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Head from "next/head";
import { parseCookies } from "nookies";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { formatBillionValue, formatValue } from "utils/number";

const DashboardPage = ({ graphData }: { graphData: Graph }) => {
  const { t } = useTranslation(COMMON);
  const isMobile = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down("sm")
  );
  const { protocol, tvl, name, chain, apy, reward } = graphData;

  const data = graphData.series.map(({ date, tvl, apy }) => ({
    date,
    apy: {
      value: apy,
      name,
    },
    tvl,
  }));

  return (
    <PlatformLayout>
      <Head>
        <title>
          {t("dashboard.pageTitle")} | {COMPANY_NAME}
        </title>
      </Head>

      <Box display="flex" flexDirection="column" alignItems="center">
        <Grid container sx={{ width: "90vw", py: 2 }}>
          <Grid item xs={12} sx={{ my: 4, p: 1 }}>
            <Box display="flex" alignItems="center">
              <Box
                height={80}
                width={80}
                minWidth={80}
                borderRadius={80}
                mr={2}
                bgcolor="#CCC"
              />
              <Typography variant="h1" align="left">
                {protocol} $LDO
              </Typography>
            </Box>
          </Grid>
        </Grid>
        <Grid container spacing={2} sx={{ width: "90vw" }}>
          <Grid item xs={12} md={3}>
            <Box
              sx={{
                width: "100%",
                borderSize: 1,
                borderRadius: 3,
                borderStyle: "solid",
                borderColor: "text.disabled",
                p: 3,
              }}
            >
              <Typography variant="h6">
                {t("dashboard.totalValueLocked")}
              </Typography>
              <Typography>
                {chain} {formatBillionValue(tvl.toString(), 3)}
              </Typography>
              <Typography sx={{ mt: 2 }} variant="h6">
                {t("dashboard.apy")}
              </Typography>
              <Typography>
                {apy} ${name}
              </Typography>

              <Typography variant="h6" color="success.main" sx={{ mt: 2 }}>
                {t("dashboard.reward")} {formatValue(reward)}
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={9}>
            <Box
              sx={{
                width: "100%",
                height: "100%",
                borderSize: 1,
                borderRadius: 3,
                borderStyle: "solid",
                borderColor: "text.disabled",
              }}
            >
              <Box px={3} mt={2}>
                <Typography variant="h3" sx={{ mb: 2 }}>
                  {t("dashboard.chain")} {chain}
                </Typography>
                <Box
                  mr={1}
                  display="flex"
                  flexDirection={{ xs: "column", sm: "row" }}
                >
                  <Box>
                    <Button variant="contained" size="small" sx={{ mr: 1 }}>
                      {t("dashboard.all")}
                    </Button>
                    <Button variant="outlined" size="small" disabled>
                      {t("dashboard.lastYear")}
                    </Button>
                  </Box>
                  <Box>
                    <Button
                      variant="contained"
                      size="small"
                      sx={{ mr: 1, ml: isMobile ? 0 : 3, mt: isMobile ? 1 : 0 }}
                    >
                      USD
                    </Button>
                    <Button
                      variant="outlined"
                      size="small"
                      disabled
                      sx={{ mt: isMobile ? 1 : 0 }}
                    >
                      ETH
                    </Button>
                  </Box>
                </Box>
              </Box>
              <ResponsiveContainer width="100%" height={isMobile ? 250 : 450}>
                <AreaChart
                  data={data}
                  margin={{
                    bottom: isMobile ? 0 : 30,
                    right: isMobile ? 0 : 20,
                  }}
                >
                  <defs>
                    <linearGradient id="color" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#1979FF" stopOpacity="0.4" />
                      <stop
                        offset="75%"
                        stopColor="#1979FF"
                        stopOpacity="0.05"
                      />
                    </linearGradient>
                  </defs>
                  <Tooltip content={<CustomTooltip />} />
                  <Area dataKey="tvl" stroke="#1979FF" fill="url(#color)" />
                  <YAxis
                    orientation="right"
                    axisLine={false}
                    tickLine={false}
                    stroke="#FFFFFF"
                    dx={isMobile ? 0 : 10}
                    tickFormatter={(value) => formatBillionValue(value, 1)}
                    style={{ ...(isMobile && { fontSize: "0.8rem" }) }}
                  />
                  <XAxis
                    dataKey="date"
                    axisLine={false}
                    tickLine={false}
                    tickCount={4}
                    minTickGap={isMobile ? 50 : 150}
                    dy={isMobile ? 5 : 20}
                    dx={-30}
                    stroke="#FFFFFF"
                    tickFormatter={(date) => format(new Date(date), "MMM y")}
                    style={{ ...(isMobile && { fontSize: "0.8rem" }) }}
                  />
                  <CartesianGrid opacity={0.1} vertical={false} />
                </AreaChart>
              </ResponsiveContainer>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </PlatformLayout>
  );
};

function CustomTooltip({ active, label, payload }: any) {
  const { t } = useTranslation(COMMON);

  if (active && payload?.[0]?.value && payload?.[0]?.payload.apy) {
    return (
      <Paper sx={{ p: 2 }}>
        <Typography>{format(new Date(label), "eeee, d MMM, yyyy")}</Typography>
        <Typography variant="caption" component="p" color="info.main">
          {t("dashboard.apy")}{" "}
          {parseFloat(payload[0].payload.apy.value).toFixed(3)} $
          {payload[0].payload.apy.name}
        </Typography>
        <Typography variant="caption" component="p" color="success.main">
          {t("dashboard.tvl")} {formatBillionValue(payload[0].value)}
        </Typography>
      </Paper>
    );
  }

  return null;
}

export const getServerSideProps: GetServerSideProps = async ({
  locale,
  ...ctx
}: {
  locale: string;
} & any) => {
  const { [TOKEN_NAME]: token } = parseCookies(ctx);

  const graphData = await getGraphByName();

  if (!token) {
    return {
      redirect: {
        permanent: false,
        destination: HOME,
      },
    };
  }

  return {
    props: {
      graphData,
      locale: locale,
      ...(await serverSideTranslations(locale, [COMMON])),
    },
  };
};

export default DashboardPage;
