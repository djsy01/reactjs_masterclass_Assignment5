import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { fetchCoinHistory } from "../api";

function Chart() {
  const { coinId } = useParams() as { coinId: string };

  const { isLoading } = useQuery({
    queryKey: ["ohlcv", coinId],
    queryFn: () => fetchCoinHistory(coinId),
    enabled: !!coinId,
  });

  if (isLoading) return <h2>Loading chart...</h2>;

  return <h1>Chart for {coinId}</h1>;
}

export default Chart;
