import React, { Component } from 'react';
import { Container, Row, Col, Form, Button, Modal } from "react-bootstrap";
import Layout from '../../components/Layout';
import Header from '../../components/Header';
import BtnAction from '../../components/BtnAction';
import CardList from '../../components/CardList';
import CardListHeader from '../../components/CardListHeader';
import MaterialIcon from "material-icons-react";
import api from "../../config/api";

export default class Maintenance extends Component {

    state = {
        show: false,
        equipments: [],
        maintenances: [],
        maintenance: [],
    }

    componentDidMount() {
        this.getMaintenances();
        this.getEquipments();
    }

    getEquipments = async () => {
        const response = await api.get("/equipment");
        this.setState({ equipments: response.data });
    }

    getMaintenances = async () => {
        const response = await api.get("/maintenance");
        this.setState({ maintenances: response.data });
    }

    handleClose = () => this.setState({ show: false });
    handleShow = (maintenance = {}) => this.setState({ show: true, maintenance });

    myChangeHandler = (event) => {
        let nam = event.target.name;
        let val = event.target.value;
        this.setState({ maintenance: { ...this.state.maintenance, [nam]: val } });
    }

    save = async event => {
        event.preventDefault();
        const { maintenance } = this.state;
        if (maintenance.id !== undefined) {
            await api.put(`/maintenance/${maintenance.id}`, maintenance)
                .then(() => {
                    this.getMaintenances();
                })
                .catch(() => {

                })
        } else {
            await api.post("/maintenance", maintenance)
                .then(() => {
                    this.getMaintenances();
                })
                .catch(() => {

                })
        }
        this.handleClose();
    }

    delete = async maintenance => {
        await api.delete(`/maintenance/${maintenance.id}`, maintenance)
            .then(() => {
                this.getMaintenances();
            })
            .catch(() => {

            })
    }

    render() {
        const { maintenances, maintenance, show, equipments } = this.state;

        return (
            <>
                <Layout>
                    <Header title={"Manutenções"}>
                        <Button variant="success" onClick={() => this.handleShow()}>Adicionar</Button>
                    </Header>
                    <Container fluid>
                        <Row>
                            <Col xs={12}>
                                <CardListHeader>
                                    <Row>
                                        <Col xs={12} lg={2} className="font-weight-bold d-flex align-items-center">Equipamento</Col>
                                        <Col xs={12} lg={3} className="font-weight-bold d-flex align-items-center">Marca/Modelo</Col>
                                        <Col xs={12} lg={2} className="font-weight-bold d-flex align-items-center">Data</Col>
                                        <Col xs={12} lg={2} className="font-weight-bold d-flex align-items-center">Detalhes</Col>
                                        <Col xs={12} lg={3} className="font-weight-bold d-flex align-items-center"></Col>
                                    </Row>
                                </CardListHeader>
                                {maintenances.map((maintenance, index) => (
                                    <CardList key={index}>
                                        <Row>
                                            <Col xs={12} lg={2} className="d-flex align-items-center small">
                                                <span className="d-inline-flex d-lg-none text-success font-weight-bold mr-1">Equipamento:</span>{maintenance.name}
                                            </Col>
                                            <Col xs={12} lg={3} className="d-flex align-items-center small">
                                                <span className="d-inline-flex d-lg-none text-success font-weight-bold mr-1">Marca/Modelo:</span>{maintenance.brand} - {maintenance.model}
                                            </Col>
                                            <Col xs={12} lg={2} className="d-flex align-items-center small">
                                                <span className="d-inline-flex d-lg-none text-success font-weight-bold mr-1">Data:</span>{new Date(maintenance.date).toLocaleDateString()}
                                            </Col>
                                            <Col xs={12} lg={2} className="d-flex align-items-center small">
                                                <span className="d-inline-flex d-lg-none text-success font-weight-bold mr-1">Detalhes:</span>{maintenance.description}
                                            </Col>
                                            <Col xs={12} lg={3} className="d-flex align-items-center justify-content-end pt-3 pt-lg-0">
                                                <BtnAction name={"Editar"} icon={"edit"} action={() => this.handleShow(maintenance)} />
                                                <BtnAction name={"Excluir"} icon={"close"} action={() => this.delete(maintenance)} />
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
                        <Modal.Title style={{ color: "rgba(0,0,0,.5)" }}>{(maintenance.id !== undefined) ? "Editar" : "Adicionar"} manutenção</Modal.Title>
                        <Button variant="muted" onClick={this.handleClose}><MaterialIcon icon="close" /></Button>
                    </Modal.Header>
                    <Modal.Body>
                        <Container>
                            <Form onSubmit={this.save}>
                                <Row>
                                    <Col xs={12} lg={6} className="mb-3">
                                        <Form.Label>Equipamento</Form.Label>
                                        <Form.Control as="select" name="equipment_id" value={(maintenance.equipment_id !== undefined) ? maintenance.equipment_id : ""} onChange={this.myChangeHandler} required>
                                            <option></option>
                                            {equipments.map((item, index) => (
                                                <option value={item.id} key={index}>{item.name}</option>
                                            ))}
                                        </Form.Control>
                                    </Col>
                                    <Col xs={12} lg={6} className="mb-3">
                                        <Form.Label>Data</Form.Label>
                                        <Form.Control type="date" name="date" value={String(maintenance.date).substr(0, 10)} onChange={this.myChangeHandler} required />
                                    </Col>
                                    <Col xs={12} lg={12} className="mb-3">
                                        <Form.Label>Detalhes</Form.Label>
                                        <Form.Control as="textarea" name="description" rows="5" value={maintenance.description} onChange={this.myChangeHandler} required />
                                    </Col>
                                    <Col xs={12} lg={12} className="mb-3">
                                        <Button type="submit" variant="success" className="d-flex ml-auto">{(maintenance.id !== undefined) ? "Salvar" : "Adicionar"}</Button>
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