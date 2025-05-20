// Router.tsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Coin from './routes/Coin';
import Coins from './routes/Coins';

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Coins />} />
        {/* 하위 경로 처리를 위해 /* 붙임 */}
        <Route path=":coinId/*" element={<Coin />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;