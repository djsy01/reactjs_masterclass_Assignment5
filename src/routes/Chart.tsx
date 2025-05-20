import { useQuery } from "@tanstack/react-query";
import { fetchCoinHistory } from "../api";
import ApexChart from "react-apexcharts";
import { useParams } from "react-router-dom";
import { useTheme } from "styled-components";

interface IHistorical {
  time_open: string;
  time_close: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  market_cap: number;
}

function Chart() {
  const theme = useTheme();
  const { coinId } = useParams<{ coinId: string }>();

  const { isLoading, data } = useQuery<IHistorical[]>({
    queryKey: ["ohlcv", coinId],
    queryFn: () => fetchCoinHistory(coinId!),
    refetchInterval: 10000,
  });

  if (isLoading) {
    return <div>Loading chart...</div>;
  }

  if (!data || data.length === 0) {
    return <div>No chart data available.</div>;
  }

  return (
    <ApexChart
      type="candlestick"
      series={[
        {
          name: "Price",
          data: data.map((price) => ({
            x: new Date(price.time_close).getTime(),
            y: [
              price.open,
              price.high,
              price.low,
              price.close,
            ],
          })),
        },
      ]}
      options={{
        chart: {
          type: "candlestick",
          height: 350,
          background: "transparent",
          toolbar: {
            show: false,
          },
          foreColor: theme.textColor,
        },
        xaxis: {
          type: "datetime",
          labels: {
            show: true,
            style: {
              colors: theme.textColor,
            },
          },
        },
        yaxis: {
          tooltip: {
            enabled: true,
          },
          labels: {
            style: {
              colors: theme.textColor,
            },
          },
        },
        theme: {
          mode: theme.bgColor === "#2f3640" ? "dark" : "light",
        },
      }}
    />
  );
}

export default Chart;
