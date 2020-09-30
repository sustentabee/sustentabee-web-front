import React, { Component } from 'react';
import Sidebar from '../Sidebar';
import { Container, Navbar } from 'react-bootstrap';
import MaterialIcon from "material-icons-react";
import Footer from '../Footer';
import { decodeToken } from '../../config/auth';
import { Link } from 'react-router-dom';

export default class Layout extends Component {

    state = {
        sidebar: false,
        user: decodeToken(),
    }

    toggleSidebar = () => this.setState({ sidebar: !this.state.sidebar });

    logout = () => {
        localStorage.clear();
        window.location.href = "/";
    };

    render() {
        const { sidebar } = this.state;
        const { user } = this.state.user;

        return (
            <>
                <div className="wrapper d-flex h-100 overflow-hidden">
                    <Sidebar sidebar={sidebar} />
                    <div className="d-flex align-items-center flex-column w-100">
                        <div className="w-100 mx-auto">
                            <Container fluid className="p-0">
                                <Navbar className="pt-3 pr-2">
                                    <Navbar.Brand>
                                        <span onClick={this.toggleSidebar}><MaterialIcon icon={"menu"} /></span>
                                    </Navbar.Brand>
                                    <Navbar.Text className="ml-auto">
                                        <Link to={"/selecionar-empresa"} style={{ textDecoration: "none" }}><span className="text-white text-uppercase font-weight-bold">{user.company_name}</span></Link>
                                    </Navbar.Text>
                                    <Navbar.Brand className="ml-auto">
                                        <span onClick={this.logout}><MaterialIcon icon={"power_settings_new"} /></span>
                                    </Navbar.Brand>
                                </Navbar>
                            </Container>
                        </div>
                        <div className="w-100 mx-auto overflow-auto">
                            {this.props.children}
                            <Footer />
                        </div>
                    </div>
                </div>
            </>
        );

    }
}