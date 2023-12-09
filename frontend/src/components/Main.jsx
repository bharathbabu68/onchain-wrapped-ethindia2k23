import {  BrowserRouter,  Switch, Route, Link, } from "react-router-dom";
import Home from "./Home";


const Main = () => {
  return (
    <>
    <BrowserRouter>
        <Switch>
            <Route path="/" exact component={Home}/>
        </Switch>
    </BrowserRouter>
    </>
  )
}

export default Main