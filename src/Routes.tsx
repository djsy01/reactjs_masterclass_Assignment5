import { BrowserRouter, Route } from "react-router-dom";
import Coins from './routes/Coin'

function Router (){
    return <BrowserRouter>
        <Route>
            <Route path='/:coinId'></Route>
                <Coins />
            <Route path='/'>
                <Coins />
            </Route>
        </Route>
    </BrowserRouter>
}

export default Router;