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
                    <img src={Logo} className="img-fluid" alt="Sustentabee" width={30} />
                    <span className="font-weight-bold mb-0 ml-2 pt-1 text-primary small">Sustentabee</span>
                </Navbar.Brand>
                <Nav className="ml-auto">
                    <Nav.Link className="text-uppercase small text-primary font-weight-bold" href="/selecionar-empresa">Selecionar Empresa</Nav.Link>
                    <Nav.Link className="text-uppercase small text-primary font-weight-bold" href="/minhas-empresas">Minhas Empresas</Nav.Link>
                    <Nav.Link className="text-uppercase small text-muted font-weight-bold" onClick={() => this.logout()}>Sair</Nav.Link>
                </Nav>
            </Navbar >
        );

    }
}