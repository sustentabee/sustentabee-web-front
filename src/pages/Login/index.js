import React, { Component } from "react";
import { Container, Row, Col, Image, Form, Button, Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";
import Background from "../../assets/img/background.svg";
import Logo from "../../assets/img/bee.svg";
import api from "../../config/api";

export default class Login extends Component {

    state = {
        user: {
            email: '',
            password: '',
        },
        error: false,
        load: false,
    }

    myChangeHandler = (event) => {
        let nam = event.target.name;
        let val = event.target.value;
        this.setState({
            user: {
                ...this.state.user,
                [nam]: val
            }
        });
    }

    login = async (event) => {
        event.preventDefault();
        this.setState({ load: true, error: false });
        await api.post("/login", this.state.user)
            .then(res => {
                this.setState({ load: false });
                localStorage.setItem("TOKEN_KEY", res.data.token);
                window.location.href = "/selecionar-empresa";
            }).catch(err => {
                this.setState({ error: true, load: false });
            });
    }

    render() {
        const { error = false, load = false } = this.state;

        return (
            <>
                <Container className="h-100 bg-white" fluid>
                    <Row className="h-100 justify-content-center">
                        <Col xs={12} lg={6} className="d-none d-lg-flex" style={{ background: `url(${Background})`, backgroundSize: "cover", height: "100vh", backgroundPosition: "center" }}></Col>
                        <Col xs={12} sm={8} lg={6} className="d-flex align-items-self justify-content-between flex-column mt-2">
                            <div className="d-flex align-items-center justify-content-center">
                                <Image src={Logo} className="img-fluid" width={50} />
                                <h3 className="font-weight-bold mb-0 ml-2 mt-2">Sustentabee</h3>
                            </div>
                            <div className="px-lg-5">
                                <h1 className="d-inline-flex bg-primary text-uppercase px-2 pb-0 pt-2 font-weight-bold">Fazer login</h1>
                                <p className="text-muted mb-4 mt-2 text-uppercase font-weight-bold small">Solução integrada de monitoramento de refrigeradores comerciais</p>
                                <Form onSubmit={this.login}>
                                    <Row className="mb-3">
                                        <Col xs={12}>
                                            <Form.Label className="text-muted">E-mail</Form.Label>
                                            <Form.Control type="email" name="email" size="lg" onChange={this.myChangeHandler} required />
                                        </Col>
                                    </Row>
                                    <Row className="mb-3">
                                        <Col xs={12} className="d-flex align-items-center justify-content-between">
                                            <Form.Label className="text-muted">Senha</Form.Label>
                                            <Link to={"#"} className="small text-primary">Esqueceu sua senha?</Link>
                                        </Col>
                                        <Col xs={12}>
                                            <Form.Control type="password" name="password" size="lg" onChange={this.myChangeHandler} required />
                                        </Col>
                                    </Row>
                                    <Row className="mb-3">
                                        <Col xs={12} className="d-flex align-items-center justify-content-between">
                                            {(error) ? <p className="small text-danger mb-0">E-mail e/ou senha inválidos!</p> : <>&nbsp;</>}
                                            {(load) ?
                                                <Button variant="primary" size="lg" className="d-inline-flex align-items-center rounded-0 text-white" disabled>
                                                    <Spinner
                                                        as="span"
                                                        animation="border"
                                                        size="sm"
                                                        role="status"
                                                        aria-hidden="true"
                                                    />
                                                    <span className="ml-3">Carregando...</span>
                                                </Button>
                                                : <Button type="submit" size="lg" className="text-white rounded-0">Entrar</Button>}
                                        </Col>
                                    </Row>
                                </Form>
                            </div>
                            <div className="text-muted small py-3 text-center">
                                &copy; {new Date().getFullYear()} Sustentabee - All Rights Reserved
                            </div>
                        </Col>
                    </Row>
                </Container>
            </>
        );
    }
}