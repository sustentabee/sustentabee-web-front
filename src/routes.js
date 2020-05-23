import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Login from './pages/Login';
import SelectCompany from './pages/SelectCompany';
import Home from "./pages/Home";
import Equipment from "./pages/Equipment";

const Routes = () => (
    <BrowserRouter>
        <Switch>
            <Route exact path="/" component={Login} />
            <Route exact path="/selecionar-empresa" component={SelectCompany} />
            <Route exact path="/home" component={Home} />
            <Route exact path="/equipamentos" component={Equipment} />
            <Route exact path="*" component={() => <h1>Page not found</h1>} />
        </Switch>
    </BrowserRouter>
);

export default Routes;