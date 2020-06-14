import React, { Component } from 'react';
import { Container, Row, Col, Form, Button, Modal } from "react-bootstrap";
import Layout from '../../components/Layout';
import Header from '../../components/Header';
import BtnAction from '../../components/BtnAction';
import CardList from '../../components/CardList';
import CardListHeader from '../../components/CardListHeader';
import MaterialIcon from "material-icons-react";
import data from "../../config/data";
import { formatDate } from "../../config/utils";

export default class Maintenance extends Component {

    state = {
        show: false,
        maintenances: data.maintenances,
        maintenance: [],
        index: -1
    }

    handleClose = () => this.setState({ show: false });
    handleShow = (index = -1, maintenance = {}) => this.setState({ show: true, index, maintenance });

    myChangeHandler = (event) => {
        let nam = event.target.name;
        let val = event.target.value;
        this.setState({ maintenance: { ...this.state.maintenance, [nam]: val } });
    }

    save = event => {
        event.preventDefault();
        let { maintenances, maintenance, index } = this.state;
        const { equipments = [] } = data;
        const [equipment] = equipments.filter(e => e.nome === maintenance.equipment);
        maintenance.marca = equipment.marca;
        maintenance.modelo = equipment.modelo;

        if (index === -1) {
            maintenances.push(maintenance);
            this.setState({ maintenances });
        } else {
            for (let i = 0; i < maintenances.length; i++) {
                if (i === index) {
                    maintenances[i].equipment = maintenance.equipment;
                    maintenances[i].data = maintenance.data;
                    maintenances[i].modelo = maintenance.modelo;
                    maintenances[i].marca = maintenance.marca;
                    maintenances[i].detalhes = maintenance.detalhes;
                }
            }
            this.setState({ maintenances });
        }
        this.handleClose();
    }

    delete = (index) => {
        let { maintenances } = this.state;
        maintenances.splice(index, 1)
        this.setState({ maintenances });
    }

    render() {
        const { maintenances, maintenance, show, index } = this.state;

        return (
            <>
                <Layout>
                    <Header title={"Manutenções"}>
                        <Button variant="success" onClick={() => this.handleShow(-1, {})}>
                            Adicionar
                        </Button>
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
                                {maintenances.map((maintenance, i) => (
                                    <CardList key={i}>
                                        <Row>
                                            <Col xs={12} lg={2} className="d-flex align-items-center small">
                                                <span className="d-inline-flex d-lg-none text-success font-weight-bold mr-1">Equipamento:</span>{maintenance.equipment}
                                            </Col>
                                            <Col xs={12} lg={3} className="d-flex align-items-center small">
                                                <span className="d-inline-flex d-lg-none text-success font-weight-bold mr-1">Marca/Modelo:</span>{maintenance.marca} - {maintenance.modelo}
                                            </Col>
                                            <Col xs={12} lg={2} className="d-flex align-items-center small">
                                                <span className="d-inline-flex d-lg-none text-success font-weight-bold mr-1">Data:</span>{formatDate(maintenance.data)}
                                            </Col>
                                            <Col xs={12} lg={2} className="d-flex align-items-center small">
                                                <span className="d-inline-flex d-lg-none text-success font-weight-bold mr-1">Detalhes:</span>{maintenance.detalhes}
                                            </Col>
                                            <Col xs={12} lg={3} className="d-flex align-items-center justify-content-end pt-3 pt-lg-0">
                                                <BtnAction name={"Editar"} icon={"edit"} action={() => this.handleShow(i, maintenance)} />
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
                        <Modal.Title style={{ color: "rgba(0,0,0,.5)" }}>{(index !== -1) ? "Editar" : "Adicionar"} manutenção</Modal.Title>
                        <Button variant="muted" onClick={this.handleClose}><MaterialIcon icon="close" /></Button>
                    </Modal.Header>
                    <Modal.Body>
                        <Container>
                            <Form onSubmit={this.save}>
                                <Row>
                                    <Col xs={12} lg={6} className="mb-3">
                                        <Form.Label>Equipamento</Form.Label>
                                        <Form.Control as="select" name="equipment" value={maintenance.equipment} onChange={this.myChangeHandler} required>
                                            <option></option>
                                            {data.equipments.map((equipment, index) => (
                                                <option value={equipment.nome} key={index}>{equipment.nome}</option>
                                            ))}
                                        </Form.Control>
                                    </Col>
                                    <Col xs={12} lg={6} className="mb-3">
                                        <Form.Label>Data</Form.Label>
                                        <Form.Control type="date" name="data" value={maintenance.data} onChange={this.myChangeHandler} required />
                                    </Col>
                                    <Col xs={12} lg={12} className="mb-3">
                                        <Form.Label>Detalhes</Form.Label>
                                        <Form.Control as="textarea" name="detalhes" rows="5" value={maintenance.detalhes} onChange={this.myChangeHandler} required />
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