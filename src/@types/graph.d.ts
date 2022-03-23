export type Graph = {
  name: string;
  chain: string;
  protocol: string;
  base: number;
  reward: number;
  rewards: {};
  apy: number;
  apy_7_day: number | null;
  tvl: number;
  risk: {};
  series: [
    {
      date: string;
      apy: string;
      tvl: string;
    }
  ];
};
