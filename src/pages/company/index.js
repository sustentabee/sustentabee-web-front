import React, { Component } from 'react';
import { Container, Row, Col, Form, Button, Modal } from "react-bootstrap";
import Layout from '../../components/Layout';
import Header from '../../components/Header';
import BtnAction from '../../components/BtnAction';
import CardList from '../../components/CardList';
import CardListHeader from '../../components/CardListHeader';
import MaterialIcon from "material-icons-react";
import data from "../../config/data";

export default class Company extends Component {

    state = {
        show: false,
        companies: data.company,
        company: [],
        index: -1
    }

    handleClose = () => this.setState({ show: false });
    handleShow = (index = -1, company = {}) => this.setState({ show: true, index, company });

    myChangeHandler = (event) => {
        let nam = event.target.name;
        let val = event.target.value;
        this.setState({ company: { ...this.state.company, [nam]: val } });
    }

    save = event => {
        event.preventDefault();
        let { companies, company, index } = this.state;
        if (index === -1) {
            companies.push(company);
            this.setState({ companies });
        } else {
            for (let i = 0; i < companies.length; i++) {
                if (i === index) {
                    companies[i].name = company.name;
                    companies[i].email = company.email;
                    companies[i].company = company.company;
                    companies[i].permission = company.permission;
                }
            }
            this.setState({ companies });
        }
        this.handleClose();
    }

    delete = (index) => {
        let { companies } = this.state;
        companies.splice(index, 1)
        this.setState({ companies });
    }

    render() {
        const { companies, company, show, index } = this.state;

        return (
            <>
                <Layout>
                    <Header title={"Usuarios"}>
                        <Button variant="success" onClick={() => this.handleShow(-1, {})}>
                            Adicionar
                        </Button>
                    </Header>
                    <Container fluid>
                        <Row>
                            <Col xs={12}>
                                <CardListHeader>
                                    <Row>
                                        <Col xs={12} lg={2} className="font-weight-bold d-flex align-items-center">Nome</Col>
                                        <Col xs={12} lg={2} className="font-weight-bold d-flex align-items-center">Endereço</Col>
                                        <Col xs={12} lg={2} className="font-weight-bold d-flex align-items-center">Contato</Col>
                                        <Col xs={12} lg={2} className="font-weight-bold d-flex align-items-center">CNPJ</Col>
                                        <Col xs={12} lg={2} className="font-weight-bold d-flex align-items-center"></Col>
                                    </Row>
                                </CardListHeader>
                                {companies.map((company, i) => (
                                    <CardList key={i}>
                                        <Row>
                                            <Col xs={12} lg={2} className="d-flex align-items-center small">
                                                <span className="d-inline-flex d-lg-none text-success font-weight-bold mr-1">Nome:</span>{company.name}
                                            </Col>
                                            <Col xs={12} lg={2} className="d-flex align-items-center small">
                                                <span className="d-inline-flex d-lg-none text-success font-weight-bold mr-1">Endereço:</span>{company.adress}
                                            </Col>
                                            <Col xs={12} lg={2} className="d-flex align-items-center small">
                                                <span className="d-inline-flex d-lg-none text-success font-weight-bold mr-1">Contato:</span>{company.phoneNumber}
                                            </Col>
                                            <Col xs={12} lg={2} className="d-flex align-items-center small">
                                                <span className="d-inline-flex d-lg-none text-success font-weight-bold mr-1">CNPJ:</span>{company.CNPJ}
                                            </Col>
                                            <Col xs={12} lg={4} className="d-flex align-items-center justify-content-center justify-content-lg-end pt-3 pt-lg-0">
                                                <BtnAction name={"Editar"} icon={"edit"} action={() => this.handleShow(i, company)} />
                                                <BtnAction name={"Excluir"} icon={"close"} action={() => this.delete(i)} />
                                            </Col>
                                        </Row>
                                    </CardList>
                                ))}
                            </Col>
                        </Row>
                    </Container>
                </Layout>
                <Modal show={show} size={"lg"} onHide={this.handleClose}>
                    <Modal.Header className="border-0">
                        <Modal.Title style={{ color: "rgba(0,0,0,.5)" }}>{(index !== -1) ? "Editar" : "Adicionar"} Usuario</Modal.Title>
                        <Button variant="muted" onClick={this.handleClose}><MaterialIcon icon="close" /></Button>
                    </Modal.Header>
                    <Modal.Body>
                        <Container>
                            <Form onSubmit={this.save}>
                                <Row>
                                    <Col xs={12} lg={6} className="mb-3">
                                        <Form.Label>Nome</Form.Label>
                                        <Form.Control type="text" name="name" value={company.name} onChange={this.myChangeHandler} required />
                                    </Col>
                                    <Col xs={12} lg={6} className="mb-3">
                                        <Form.Label>Endereço</Form.Label>
                                        <Form.Control type="text" name="adress" value={company.adress} onChange={this.myChangeHandler} required />
                                    </Col>
                                    <Col xs={12} lg={6} className="mb-3">
                                        <Form.Label>Contato</Form.Label>
                                        <Form.Control type="text" name="phone" value={company.phoneNumber} onChange={this.myChangeHandler} required />
                                    </Col>
                                    <Col xs={12} lg={6} className="mb-3">
                                        <Form.Label>CNPJ</Form.Label>
                                        <Form.Control type="text" maxLength='14' name="cpnj" value={company.CNPJ} onChange={this.myChangeHandler} required />
                                    </Col>
                                    <Col xs={12} lg={12} className="mb-3">
                                        <Button type="submit" variant="success" className="d-flex ml-auto">{(index !== -1) ? "Salvar" : "Adicionar"}</Button>
                                    </Col>
                                </Row>
                            </Form>
                        </Container>
                    </Modal.Body>
                </Modal>
            </>
        )
    }
}