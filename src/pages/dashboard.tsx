import { Box, Grid, Paper, Typography } from "@mui/material";
import { Graph } from "@types/graph";
import { getGraphByName } from "api/graph.api";
import { format } from "date-fns";
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
import { TOKEN_NAME } from "src/constants/auth.constants";
import { COMMON } from "src/constants/translations.constants";
import { HOME } from "src/constants/urls.constants";
import { PlatformLayout } from "src/layouts/platform.layout";

const ONE_BILLION = 1000000000;
const formatValue = (value: number, minimumFractionDigits = 2) =>
  Intl.NumberFormat("en", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits,
  }).format(value);

const formatBillionValue = (value: string) =>
  `${formatValue(parseFloat(value) / ONE_BILLION)}b`;

const DashboardPage = ({ graphData }: { graphData: Graph }) => {
  const { t } = useTranslation(COMMON);
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
        <title>{t("dashboard.pageTitle")}</title>
      </Head>

      <Box display="flex" flexDirection="column" alignItems="center">
        <Grid container sx={{ width: "90vw", py: 2 }}>
          <Grid item xs={12}>
            <Paper
              elevation={0}
              sx={{
                m: 3,
                p: 2,
                borderSize: 1,
                borderStyle: "solid",
                borderColor: "text.disabled",
              }}
            >
              <Typography variant="h2" align="left">
                {protocol}
              </Typography>
              <Typography variant="h4" align="left" sx={{ mt: 2 }}>
                Chain {chain}
              </Typography>
              <Typography>
                APY {apy} ${name}
              </Typography>
              <Typography>TVL {formatBillionValue(tvl.toString())}</Typography>

              <Typography color="success.main" sx={{ mt: 2 }}>
                Reward {formatValue(reward)}
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12}>
            <ResponsiveContainer width="100%" height={400}>
              <AreaChart
                data={data}
                margin={{ top: 30, bottom: 30, left: 30, right: 30 }}
              >
                <defs>
                  <linearGradient id="color" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#8884d8" stopOpacity="0.4" />
                    <stop offset="75%" stopColor="#8884d8" stopOpacity="0.05" />
                  </linearGradient>
                </defs>
                <Tooltip content={<CustomTooltip />} />
                <Area dataKey="tvl" stroke="#8884d8" fill="url(#color)" />
                <YAxis
                  orientation="right"
                  axisLine={false}
                  tickLine={false}
                  tickCount={8}
                  tickFormatter={(value) => formatBillionValue(value)}
                />
                <XAxis
                  dataKey="date"
                  axisLine={false}
                  tickLine={false}
                  dy={20}
                  tickFormatter={(date) => format(new Date(date), "MMM, y")}
                />
                <CartesianGrid opacity={0.1} vertical={false} />
              </AreaChart>
            </ResponsiveContainer>
          </Grid>
        </Grid>
      </Box>
    </PlatformLayout>
  );
};

function CustomTooltip({ active, label, payload }: any) {
  if (active && payload?.[0]?.value && payload?.[0]?.payload.apy) {
    return (
      <Paper sx={{ p: 2 }}>
        <Typography>{format(new Date(label), "eeee, d MMM, yyyy")}</Typography>
        <Typography variant="caption" component="p">
          APY {parseFloat(payload[0].payload.apy.value).toFixed(3)} $
          {payload[0].payload.apy.name}
        </Typography>
        <Typography variant="caption" component="p">
          TVL {formatBillionValue(payload[0].value)}
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
