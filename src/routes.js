import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { isAuthenticated } from "./config/auth";
import Login from './pages/Login';
import SelectCompany from './pages/SelectCompany';
import Home from "./pages/Home";
import Equipment from "./pages/Equipment";
import EquipmentDashboard from "./pages/EquipmentDashboard";
import Maintenance from "./pages/Maintenance";
import Measurement from "./pages/Measurement";
import DashboardAlert from "./pages/_dashboards/DashboardAlert";
import DashboardMaintenance from "./pages/_dashboards/DashboardMaintenance";
import DashboardMeasurement from "./pages/_dashboards/DashboardMeasurement";
import MyCompany from "./pages/MyCompany";
import Settings from "./pages/Settings";

const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route
        {...rest}
        render={props =>
            isAuthenticated() ? (
                <Component {...props} />
            ) : (
                    <Redirect to={{ pathname: "/", state: { from: props.location } }} />
                )
        }
    />
);

const Routes = () => (
    <BrowserRouter>
        <Switch>
            <Route exact path="/" component={Login} />
            <PrivateRoute exact path="/selecionar-empresa" component={SelectCompany} />
            <PrivateRoute exact path="/minhas-empresas" component={MyCompany} />
            <PrivateRoute exact path="/home" component={Home} />
            <PrivateRoute exact path="/equipamentos" component={Equipment} />
            <PrivateRoute exact path="/equipamento/:id/dashboard" component={EquipmentDashboard} />
            <PrivateRoute exact path="/manutencoes" component={Maintenance} />
            <PrivateRoute exact path="/medicoes" component={Measurement} />
            <PrivateRoute exact path="/dashboard-manutencao" component={DashboardMaintenance} />
            <PrivateRoute exact path="/dashboard-alerta" component={DashboardAlert} />
            <PrivateRoute exact path="/dashboard-medicao" component={DashboardMeasurement} />
            <PrivateRoute exact path="/configuracoes" component={Settings} />
            <Route exact path="*" component={() => <h1>Page not found</h1>} />
        </Switch>
    </BrowserRouter>
);

export default Routes;