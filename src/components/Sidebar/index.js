import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { Accordion, Card } from 'react-bootstrap';
// import Button from 'react-bootstrap/Button';
import Logo from "../../assets/img/bee.svg";
import MaterialIcon from "material-icons-react";

export default class Sidebar extends Component {

    render() {
        const { sidebar = true } = this.props;

        return (
            <>
                <nav id="sidebar" className={(sidebar) ? "d-flex flex-column justify-content-between active" : "d-flex flex-column justify-content-between"}>
                    <div>
                        <div className="d-flex align-items-center justify-content-center my-3 px-5 flex-column">
                            <img src={Logo} className="img-fluid px-3" alt="Sustentabee" />
                            <h3 className="font-weight-bold" style={{ color: "#211F25" }}>Sustentabee</h3>
                        </div>
                        <div className="d-flex align-items-center justify-content-center px-2 pt-5">
                            <Accordion className="w-100">
                                <SidebarNavLink link="/home" icon="home" name="Home" />
                                <SidebarNavDropdown icon="bar_chart" name="Dashboards" eventKey={0}>
                                    <SidebarNavDropdownLink link={"/dashboard-alerta"} name="Alertas" />
                                    <SidebarNavDropdownLink link={"/dashboard-manutencao"} name="Manutenções" />
                                    <SidebarNavDropdownLink link={"/dashboard-medicao"} name="Medições" />
                                </SidebarNavDropdown>
                                <SidebarNavLink link="/medicoes" icon="history" name="Medições" />
                                <SidebarNavLink link="/equipamentos" icon="sensor_window" name="Equipamentos" />
                                <SidebarNavLink link="/manutencoes" icon="handyman" name="Manutenções" />
                                <SidebarNavLink link="/User" icon="handyman" name="Usuarios" />
                                <SidebarNavLink link="/Company" icon="handyman" name="Compania" />
                            </Accordion>
                        </div>
                    </div>
                </nav>
            </>
        );

    }
}

function SidebarNavLink(props) {
    return (
        <Card className="mb-2 rounded">
            <Card.Header>
                <Accordion.Toggle as={Link} to={props.link}>
                    <span style={{ fontSize: "24px", lineHeight: 0 }}><MaterialIcon icon={props.icon} /></span>
                    <span className="ml-3 mt-1">{props.name}</span>
                </Accordion.Toggle>
            </Card.Header>
        </Card>
    );
}

function SidebarNavDropdown(props) {
    return (
        <Card className="mb-2 rounded">
            <Card.Header>
                <Accordion.Toggle as={Link} to={"#"} eventKey={props.eventKey} className="d-flex align-items-center justify-content-between">
                    <span style={{ fontSize: "24px", lineHeight: 0 }}><MaterialIcon icon={props.icon} /></span>
                    <span className="ml-3 mt-1">{props.name}</span>
                    <span className="ml-auto" style={{ fontSize: "24px", lineHeight: 0 }}><MaterialIcon icon={"keyboard_arrow_down"} /></span>
                </Accordion.Toggle>
            </Card.Header>
            <Accordion.Collapse eventKey={props.eventKey}>
                <Card.Body>
                    {props.children}
                </Card.Body>
            </Accordion.Collapse>
        </Card>
    );
}

function SidebarNavDropdownLink(props) {
    return (
        <Link to={props.link} className="d-flex align-items-center">
            <span style={{ color: "transparent", fontSize: "24px", lineHeight: 0 }}><MaterialIcon icon="chevron_right" /></span>
            <span className="ml-3 mt-1">{props.name}</span>
        </Link>
    );
}