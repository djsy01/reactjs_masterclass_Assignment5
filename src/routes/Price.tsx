import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchCoinTickers } from "../api";

interface PriceUSD {
  price: number;
  percent_change_24h: number;
  volume_24h: number;
}

interface PriceData {
  quotes: {
    USD: PriceUSD;
  };
}

function Price() {
  const { coinId } = useParams<{ coinId: string }>();

  const { isLoading, data } = useQuery<PriceData>({
    queryKey: ["tickers", coinId],
    queryFn: () => fetchCoinTickers(coinId!),
  });

  return (
    <div>
      <h2>Price Info</h2>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <>
          <p>Current Price: ${data?.quotes.USD.price.toFixed(2)}</p>
          <p>24h Change: {data?.quotes.USD.percent_change_24h}%</p>
          <p>24h Volume: ${data?.quotes.USD.volume_24h.toLocaleString()}</p>
        </>
      )}
    </div>
  );
}

export default Price;