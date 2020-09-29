import React, { Component } from 'react';
import { Nav, Navbar } from "react-bootstrap";
import Logo from "../../assets/img/bee.svg";

export default class NavbarCompany extends Component {

    logout = () => {
        localStorage.clear();
        window.location.href = "/";
    };

    render() {
        const { className } = this.props;

        return (
            <Navbar bg="white" className={"d-flex align-items-center justify-content-between " + className} >
                <Navbar.Brand className="d-flex align-items-center">
                    <img src={Logo} className="img-fluid" alt="Sustentabee" width={50} />
                    <span className="font-weight-bold mb-0 ml-2 pt-1" style={{ color: "#211F25" }}>Sustentabee</span>
                </Navbar.Brand>
                <Nav className="ml-auto">
                    <Nav.Link className="text-uppercase small" href="/selecionar-empresa">Selecionar Empresa</Nav.Link>
                    <Nav.Link className="text-uppercase small" href="/minhas-empresas">Minhas Empresas</Nav.Link>
                    <Nav.Link className="text-uppercase small" onClick={() => this.logout()}>Sair</Nav.Link>
                </Nav>
            </Navbar >
        );

    }
}