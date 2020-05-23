import React, { Component } from 'react';
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Link } from 'react-router-dom';
import Logo from "../../assets/img/bee.svg";

const styles = {
    h1: {
        fontSize: "25px",
        color: "#211F25"
    },
    link: {
        color: "#211F25",
        "&:hover": {
            textDecoration: "underline"
        }
    }
}

export default class Login extends Component {

    state = {
        email: '',
        password: ''
    }

    myChangeHandler = (event) => {
        let nam = event.target.name;
        let val = event.target.value;
        this.setState({ [nam]: val });
    }

    login = async event => {
        event.preventDefault();
        const { email } = this.state;
        localStorage.setItem("email", email);
        window.location.href = "/selecionar-empresa";
    }

    render() {

        return (
            <>
                <Container className="h-100 bg-white" fluid>
                    <Row className="justify-content-center align-items-center h-100">
                        <Col xs={12} sm={8} lg={6}>
                            <div className="d-flex align-items-center justify-content-center mb-5">
                                <img src={Logo} alt="Sustentabee" width="80px" />
                                <h1 className="mb-0 ml-3 font-weight-bold text-center pt-3" style={styles.h1}>Sustentabee</h1>
                            </div>
                            <Form onSubmit={this.login}>
                                <Row className="mb-4">
                                    <Col xs={12}>
                                        <Form.Label className="text-success font-weight-bold">E-mail</Form.Label>
                                        <Form.Control type="email" name="email" size="lg" onChange={this.myChangeHandler} required />
                                    </Col>
                                </Row>
                                <Row className="mb-4">
                                    <Col xs={12}>
                                        <Form.Label className="text-success font-weight-bold">Senha</Form.Label>
                                        <Form.Control type="password" name="password" size="lg" onChange={this.myChangeHandler} required />
                                    </Col>
                                </Row>
                                <Row className="mb-4">
                                    <Col xs={12} className="d-flex align-items-center justify-content-between">
                                        <Link to={"#"} style={styles.link}>Esqueci minha senha</Link>
                                        <Button variant="success" type="submit" size="md">
                                            Fazer Login
                                        </Button>
                                    </Col>
                                </Row>
                            </Form>
                        </Col>
                    </Row>
                </Container>
            </>
        )
    }
}