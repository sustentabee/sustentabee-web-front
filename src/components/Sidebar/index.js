import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { Accordion, Card } from 'react-bootstrap';
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
                        <div className="d-flex align-items-center justify-content-center px-2">
                            <Accordion className="w-100">
                                <SidebarNavLink link="/home" icon="home" name="Home" />
                                <SidebarNavLink link="/equipamentos" icon="build" name="Equipamentos" />
                                <SidebarNavLink link="/dashboard" icon="dashboard" name="Dashboards" />
                                {/* <SidebarNavDropdown icon="dashboard" name="People View" >
                                    <SidebarNavDropdownLink link="#" name="Clientes" />
                                    <SidebarNavDropdownLink link="#" name="Usuários" />
                                </SidebarNavDropdown> */}
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
                    <MaterialIcon icon={props.icon} />
                    <span className="ml-3 pt-1">{props.name}</span>
                </Accordion.Toggle>
            </Card.Header>
        </Card>
    );
}

// function SidebarNavDropdown(props) {
//     return (
//         <Card className="mb-2 rounded">
//             <Card.Header>
//                 <Accordion.Toggle as={Link} to={"#"} eventKey="0">
//                     <MaterialIcon icon={props.icon} />
//                     <span className="ml-2">{props.name}</span>
//                 </Accordion.Toggle>
//             </Card.Header>
//             <Accordion.Collapse eventKey="0">
//                 <Card.Body>
//                     {props.children}
//                 </Card.Body>
//             </Accordion.Collapse>
//         </Card>
//     );
// }

// function SidebarNavDropdownLink(props) {
//     return (
//         <Link to={props.link} className="d-flex align-items-center">
//             <MaterialIcon icon="chevron_right" />
//             <span className="ml-2">{props.name}</span>
//         </Link>
//     );
// }