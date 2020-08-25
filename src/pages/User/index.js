import React, { Component } from 'react';
import { Container, Row, Col, Form, Button, Modal } from "react-bootstrap";
import Layout from '../../components/Layout';
import Header from '../../components/Header';
import BtnAction from '../../components/BtnAction';
import CardList from '../../components/CardList';
import CardListHeader from '../../components/CardListHeader';
import MaterialIcon from "material-icons-react";
import data from "../../config/data";

export default class User extends Component {

    state = {
        show: false,
        users: data.user,
        user: [],
        index: -1
    }

    handleClose = () => this.setState({ show: false });
    handleShow = (index = -1, user = {}) => this.setState({ show: true, index, user });

    myChangeHandler = (event) => {
        let nam = event.target.name;
        let val = event.target.value;
        this.setState({ user: { ...this.state.user, [nam]: val } });
    }

    save = event => {
        event.preventDefault();
        let { users, user, index } = this.state;
        if (index === -1) {
            users.push(user);
            this.setState({ users });
        } else {
            for (let i = 0; i < users.length; i++) {
                if (i === index) {
                    users[i].name = user.name;
                    users[i].email = user.email;
                    users[i].company = user.company;
                    users[i].permission = user.permission;
                }
            }
            this.setState({ users });
        }
        this.handleClose();
    }

    delete = (index) => {
        let { users } = this.state;
        users.splice(index, 1)
        this.setState({ users });
    }

    render() {
        const { users, user, show, index } = this.state;

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
                                        <Col xs={12} lg={2} className="font-weight-bold d-flex align-items-center">Empresa</Col>
                                        <Col xs={12} lg={2} className="font-weight-bold d-flex align-items-center">E-mail</Col>
                                        <Col xs={12} lg={2} className="font-weight-bold d-flex align-items-center">Permissão</Col>
                                        <Col xs={12} lg={2} className="font-weight-bold d-flex align-items-center"></Col>
                                    </Row>
                                </CardListHeader>
                                {users.map((user, i) => (
                                    <CardList key={i}>
                                        <Row>
                                            <Col xs={12} lg={2} className="d-flex align-items-center small">
                                                <span className="d-inline-flex d-lg-none text-success font-weight-bold mr-1">Nome:</span>{user.name}
                                            </Col>
                                            <Col xs={12} lg={2} className="d-flex align-items-center small">
                                                <span className="d-inline-flex d-lg-none text-success font-weight-bold mr-1">E-mail:</span>{user.email}
                                            </Col>
                                            <Col xs={12} lg={2} className="d-flex align-items-center small">
                                                <span className="d-inline-flex d-lg-none text-success font-weight-bold mr-1">Empresa:</span>{user.company}
                                            </Col>
                                            <Col xs={12} lg={2} className="d-flex align-items-center small">
                                                <span className="d-inline-flex d-lg-none text-success font-weight-bold mr-1">Permissão:</span>{user.permission}
                                            </Col>
                                            <Col xs={12} lg={4} className="d-flex align-items-center justify-content-center justify-content-lg-end pt-3 pt-lg-0">
                                                <BtnAction name={"Editar"} icon={"edit"} action={() => this.handleShow(i, user)} />
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
                                        <Form.Control type="text" name="name" value={user.name} onChange={this.myChangeHandler} required />
                                    </Col>
                                    <Col xs={12} lg={6} className="mb-3">
                                        <Form.Label>Empresa</Form.Label>
                                        <Form.Control type="text" name="email" value={user.email} onChange={this.myChangeHandler} required />
                                    </Col>
                                    <Col xs={12} lg={6} className="mb-3">
                                        <Form.Label>E-mail</Form.Label>
                                        <Form.Control type="text" name="company" value={user.company} onChange={this.myChangeHandler} required />
                                    </Col>
                                    <Col xs={12} lg={6} className="mb-3">
                                        <Form.Label>Permissão</Form.Label>
                                        <Form.Control type="text" name="permission" value={user.permission} onChange={this.myChangeHandler} required />
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