import React, { Component } from 'react';
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import IconBusiness from "../../assets/img/business-black.svg";
import NavbarCompany from '../../components/NavbarCompany';
import api from "../../config/api";
import { decodeToken } from '../../config/auth';

export default class SelectCompany extends Component {

    state = {
        companies: [],
        user: decodeToken(),
        company: []
    }

    componentDidMount() {
        this.getCompanies();
    }

    myChangeHandler = (event) => {
        let nam = event.target.name;
        let val = event.target.value;
        this.setState({ [nam]: val });
    }

    getCompanies = async () => {
        const response = await api.get("/company");
        this.setState({ companies: response.data });
    }

    setCompany = async (event) => {
        event.preventDefault();
        const { company = [] } = this.state;
        await api.post("/select-company", { company_id: company })
            .then((res) => {
                localStorage.setItem("TOKEN_KEY", res.data.token);
                window.location.href = "/home";
            })
            .catch(() => {

            })
    }

    render() {
        const { companies = [] } = this.state;
        const { user } = this.state.user;

        return (
            <>
                <NavbarCompany className="fixed-top" />
                <Container className="h-100">
                    <Row className="justify-content-center align-items-center h-100">
                        <Col xs={12} lg={6}>
                            <div className="d-flex align-items-center justify-content-center mx-auto mb-4" style={{ background: "#7FFF7F", borderRadius: "50%", width: "80px", height: "80px" }}>
                                <img src={IconBusiness} alt="Empresa" width="50px" />
                            </div>
                            <p className="text-center mb-2">Você está logado como:</p>
                            <h3 className="m-0 font-weight-bold text-center" style={{ fontSize: "25px", color: "#211F25" }}>{user.email}</h3>
                            <Form onSubmit={this.setCompany} className="pt-5">
                                <Row className="mb-4">
                                    <Col xs={12}>
                                        <Form.Label className="text-success font-weight-bold">Selecionar empresa:</Form.Label>
                                        <Form.Control as="select" name="company" size="lg" onChange={this.myChangeHandler} required>
                                            <option></option>
                                            {companies.map((company, index) => (
                                                <option value={company.id} key={index}>{company.name}</option>
                                            ))}
                                        </Form.Control>
                                    </Col>
                                </Row>
                                <Row className="mb-4">
                                    <Col xs={12} className="d-flex align-items-center justify-content-end">
                                        <Button variant="success" type="submit" size="md">
                                            Continuar
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