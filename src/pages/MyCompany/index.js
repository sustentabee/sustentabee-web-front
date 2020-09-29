import React, { Component } from 'react';
import { Container, Row, Col, Form, Button, Card } from "react-bootstrap";
import NavbarCompany from '../../components/NavbarCompany';
import api from "../../config/api";
import { decodeToken } from '../../config/auth';
import MaterialIcon from "material-icons-react";

export default class MyCompany extends Component {

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
        this.setState({
            company: {
                ...this.state.company,
                [nam]: val
            }
        });
    }

    getCompanies = async () => {
        const response = await api.get("/company");
        this.setState({ companies: response.data });
    }

    edit = async (company) => this.setState({ company });

    save = async (event) => {
        event.preventDefault();
        const { company = [] } = this.state;

        if (company.id !== undefined) {
            await api.put(`/company/${company.id}`, company)
                .then(() => {
                    this.getCompanies();
                })
                .catch(error => {
                    console.log({ error })
                })
        } else {
            console.log(company)
            await api.post(`/company`, company)
                .then(() => {
                    this.getCompanies();
                })
                .catch(error => {
                    console.log({ error })
                })
        }
        this.setState({ company: [] })
        this.clear();
    }

    delete = async (company) => {
        await api.delete(`/company/${company.id}`)
            .then(() => {
                this.getCompanies();
            })
            .catch(error => {
                console.log({ error })
            })
    }

    clear = () => {
        this.setState({
            company: {
                name: "",
                document_number: "",
                phone: ""
            }
        })
    }

    render() {
        const { companies = [], company } = this.state;

        return (
            <>
                <NavbarCompany />
                <Container className="mt-3">
                    <Row>
                        <Col xs={12}>
                            <h2 className="text-muted">Minhas empresas</h2>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={12} lg={4}>
                            {companies.map((company, index) => (
                                <Card key={index} className="border-0 shadow-sm mb-2">
                                    <Card.Body>
                                        <Row>
                                            <Col xs={9}>
                                                <h6 className="mb-0">{company.name}</h6>
                                                <p className="text-muted mb-0 small">{company.document_number} - {company.phone}</p>
                                            </Col>
                                            <Col xs={3} className="d-flex align-items-center justify-content-end">
                                                <span onClick={() => this.edit(company)} className="ml-2"><MaterialIcon icon="edit" /></span>
                                                <span onClick={() => this.delete(company)} className="ml-2"><MaterialIcon icon="close" /></span>
                                            </Col>
                                        </Row>
                                    </Card.Body>
                                </Card>
                            ))}
                        </Col>
                        <Col xs={12} lg={8}>
                            <Form onSubmit={this.save} >
                                <Row>
                                    <Col xs={12} className="mb-4">
                                        <Form.Label className="text-muted text-uppercase mb-1 small font-weight-bold">Nome</Form.Label>
                                        <Form.Control type="text" name="name" value={company.name} onChange={this.myChangeHandler} required />
                                    </Col>
                                    <Col xs={12} className="mb-4">
                                        <Form.Label className="text-muted text-uppercase mb-1 small font-weight-bold">CNPJ</Form.Label>
                                        <Form.Control type="text" name="document_number" value={company.document_number} onChange={this.myChangeHandler} required />
                                    </Col>
                                    <Col xs={12} className="mb-4">
                                        <Form.Label className="text-muted text-uppercase mb-1 small font-weight-bold">Telefone</Form.Label>
                                        <Form.Control type="text" name="phone" value={company.phone} onChange={this.myChangeHandler} required />
                                    </Col>
                                    <Col xs={12} className="mb-4 text-right" >
                                        <Button type="button" variant="muted" className="ml-2" onClick={() => this.clear()}>Limpar</Button>
                                        <Button type="submit" className="text-white ml-2">Salvar</Button>
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