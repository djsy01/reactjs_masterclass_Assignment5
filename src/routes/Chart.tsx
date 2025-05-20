import { useQuery } from "@tanstack/react-query";
import { fetchCoinHistory } from "../api";
import ApexChart from "react-apexcharts";
import { useParams } from "react-router-dom";

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
  const { coinId } = useParams<{ coinId: string }>();

  const { isLoading, data } = useQuery<IHistorical[]>({
    queryKey: ["ohlcv", coinId],
    queryFn: () => fetchCoinHistory(coinId!),
    refetchInterval: 10000,
  });

  return (
    <div>
      {isLoading ? (
        "Loading chart..."
      ) : (
        <ApexChart
          type="candlestick"
          series={[
            {
              name: "Price",
              data: data?.map((price: IHistorical) => ({
                x: new Date(price.time_close).getTime(),
                y: [
                  price.open.toFixed(2),
                  price.high.toFixed(2),
                  price.low.toFixed(2),
                  price.close.toFixed(2),
                ],
              })) ?? [],
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
            },
            xaxis: {
              type: "datetime",
              labels: {
                show: true,
              },
            },
            yaxis: {
              tooltip: {
                enabled: true,
              },
            },
            theme: {
              mode: "dark",
            },
          }}
        />
      )}
    </div>
  );
}

export default Chart;
