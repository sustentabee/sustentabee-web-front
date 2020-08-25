import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Login from './pages/Login';
import SelectCompany from './pages/SelectCompany';
import Home from "./pages/Home";
import Equipment from "./pages/Equipment";
import EquipmentDashboard from "./pages/EquipmentDashboard";
import Dashboard from "./pages/Dashboard";
import Maintenance from "./pages/Maintenance";
import Measurement from "./pages/Measurement";
import DashboardAlert from "./pages/_dashboards/DashboardAlert";
import DashboardMaintenance from "./pages/_dashboards/DashboardMaintenance";
import DashboardMeasurement from "./pages/_dashboards/DashboardMeasurement";
import User from "./pages/User";
import Company from "./pages/company";
const Routes = () => (
    <BrowserRouter>
        <Switch>
            <Route exact path="/" component={Login} />
            <Route exact path="/selecionar-empresa" component={SelectCompany} />
            <Route exact path="/home" component={Home} />
            <Route exact path="/equipamentos" component={Equipment} />
            <Route exact path="/equipamento/:nome/dashboard" component={EquipmentDashboard} />
            <Route exact path="/manutencoes" component={Maintenance} />
            <Route exact path="/medicoes" component={Measurement} />
            <Route exact path="/dashboard" component={Dashboard} />
            <Route exact path="/dashboard-alerta" component={DashboardAlert} />
            <Route exact path="/dashboard-manutencao" component={DashboardMaintenance} />
            <Route exact path="/dashboard-medicao" component={DashboardMeasurement} />
            <Route exact path="/User" component={User} />
            <Route exact path="/Company" component={Company} />
            <Route exact path="*" component={() => <h1>Page not found</h1>} />
        </Switch>
    </BrowserRouter>
);

export default Routes;