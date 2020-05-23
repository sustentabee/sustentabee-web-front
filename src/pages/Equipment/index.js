import React, { Component } from 'react';
import { Container, Row, Col, Form, Button, Modal, Card, Accordion } from "react-bootstrap";
import Layout from '../../components/Layout';
import Header from '../../components/Header';
import MaterialIcon from "material-icons-react";

export default class Equipment extends Component {

    state = {
        show: false,
        equipments: [
            {
                dm: "Dispositivo de Medição",
                serial: "Serial",
                modelo: "modelo",
                marca: "Consul",
                data_aquisicao: "1977-10-13",
                potencia: "10",
                tensao: "220v",
                consumo: "500",
            },
            {
                dm: "Dispositivo de Medição",
                serial: "Serial",
                modelo: "modelo",
                marca: "Electrolux",
                data_aquisicao: "1977-10-13",
                potencia: "10",
                tensao: "220v",
                consumo: "500",
            },
            {
                dm: "Dispositivo de Medição",
                serial: "Serial",
                modelo: "modelo",
                marca: "Electrolux",
                data_aquisicao: "1977-10-13",
                potencia: "10",
                tensao: "220v",
                consumo: "500",
            }
        ],
        equipment: [],
    }

    handleClose = () => this.setState({ show: false });
    handleShow = (equipment = {}) => this.setState({ show: true, equipment });

    myChangeHandler = (event) => {
        let nam = event.target.name;
        let val = event.target.value;
        this.setState({ equipment: { ...this.state.equipment, [nam]: val } });
    }

    save = event => {
        event.preventDefault();
        let { equipments, equipment } = this.state;
        equipment.marca = "Electrolux";
        equipments.push(equipment);
        this.setState({ equipments });
        this.handleClose();
    }

    render() {
        const { equipments, equipment, show } = this.state;

        return (
            <>
                <Layout>
                    <Header title={"Equipamentos"}>
                        <Button variant="success" onClick={this.handleShow}>
                            Adicionar
                        </Button>
                    </Header>
                    <Container fluid>
                        <Row>
                            <Col xs={12}>
                                <Accordion>
                                    {equipments.map((equipment, index) => (
                                        <Card className="border-0 mb-2" key={index}>
                                            <Card.Header className="border-0 bg-white">
                                                <Row>
                                                    <Col xs={12} lg={3} className="d-flex align-items-start justify-content-center flex-column">
                                                        <h6 className="mb-0">{equipment.dm}</h6>
                                                        <p className="mb-0 text-muted">{equipment.serial}</p>
                                                    </Col>
                                                    <Col xs={12} lg={3} className="d-flex align-items-start justify-content-center flex-column">
                                                        <h6 className="mb-0">{equipment.marca}</h6>
                                                        <p className="mb-0 text-muted">{equipment.modelo}</p>
                                                    </Col>
                                                    <Col xs={12} lg={3} className="d-flex align-items-start justify-content-center flex-column">
                                                        <h6 className="mb-0">Data de Aquisição</h6>
                                                        <p className="mb-0 text-muted">{new Date(equipment.data_aquisicao).toLocaleDateString()}</p>
                                                    </Col>
                                                    <Col xs={12} lg={3} className="d-flex align-items-center justify-content-end">
                                                        <Accordion.Toggle as={Button} className="btn-sm" variant="success" eventKey={index}>
                                                            Ver mais
                                                        </Accordion.Toggle>
                                                    </Col>
                                                </Row>

                                            </Card.Header>
                                            <Accordion.Collapse eventKey={index}>
                                                <Card.Body>
                                                    <Row>
                                                        <Col xs={12} lg={4} className="d-flex align-items-start justify-content-center flex-column mb-3">
                                                            <h6 className="mb-0 text-success">Dispositivo de Medição</h6>
                                                            <p className="mb-0 text-muted">{equipment.dm}</p>
                                                        </Col>
                                                        <Col xs={12} lg={4} className="d-flex align-items-start justify-content-center flex-column mb-3">
                                                            <h6 className="mb-0 text-success">Serial</h6>
                                                            <p className="mb-0 text-muted">{equipment.serial}</p>
                                                        </Col>
                                                        <Col xs={12} lg={4} className="d-flex align-items-start justify-content-center flex-column mb-3">
                                                            <h6 className="mb-0 text-success">Marca</h6>
                                                            <p className="mb-0 text-muted">{equipment.marca}</p>
                                                        </Col>
                                                        <Col xs={12} lg={4} className="d-flex align-items-start justify-content-center flex-column mb-3">
                                                            <h6 className="mb-0 text-success">Modelo</h6>
                                                            <p className="mb-0 text-muted">{equipment.modelo}</p>
                                                        </Col>
                                                        <Col xs={12} lg={4} className="d-flex align-items-start justify-content-center flex-column mb-3">
                                                            <h6 className="mb-0 text-success">Marca</h6>
                                                            <p className="mb-0 text-muted">{equipment.marca}</p>
                                                        </Col>
                                                        <Col xs={12} lg={4} className="d-flex align-items-start justify-content-center flex-column mb-3">
                                                            <h6 className="mb-0 text-success">Data de Aquisição</h6>
                                                            <p className="mb-0 text-muted">{new Date(equipment.data_aquisicao).toLocaleDateString()}</p>
                                                        </Col>
                                                        <Col xs={12} lg={4} className="d-flex align-items-start justify-content-center flex-column mb-3">
                                                            <h6 className="mb-0 text-success">Potência</h6>
                                                            <p className="mb-0 text-muted">{equipment.potencia}</p>
                                                        </Col>
                                                        <Col xs={12} lg={4} className="d-flex align-items-start justify-content-center flex-column mb-3">
                                                            <h6 className="mb-0 text-success">Tensão</h6>
                                                            <p className="mb-0 text-muted">{equipment.tensao}</p>
                                                        </Col>
                                                        <Col xs={12} lg={4} className="d-flex align-items-start justify-content-center flex-column mb-3">
                                                            <h6 className="mb-0 text-success">Consumo</h6>
                                                            <p className="mb-0 text-muted">{equipment.consumo}</p>
                                                        </Col>
                                                    </Row>
                                                </Card.Body>
                                            </Accordion.Collapse>
                                        </Card>
                                    ))}
                                </Accordion>
                            </Col>
                        </Row>
                    </Container>
                </Layout>
                <Modal show={show} size={"lg"} onHide={this.handleClose}>
                    <Modal.Header className="border-0">
                        <Modal.Title style={{ color: "rgba(0,0,0,.5)" }}>{(equipment._id !== undefined) ? "Editar" : "Adicionar"} equipamento</Modal.Title>
                        <Button variant="muted" onClick={this.handleClose}><MaterialIcon icon="close" /></Button>
                    </Modal.Header>
                    <Modal.Body>
                        <Container>
                            <Form onSubmit={this.save}>
                                <Row>
                                    <Col xs={12} lg={6} className="mb-3">
                                        <Form.Label>Dispositivo de Medição</Form.Label>
                                        <Form.Control type="text" name="dm" onChange={this.myChangeHandler} required />
                                    </Col>
                                    <Col xs={12} lg={6} className="mb-3">
                                        <Form.Label>Serial</Form.Label>
                                        <Form.Control type="text" name="serial" onChange={this.myChangeHandler} required />
                                    </Col>
                                    <Col xs={12} lg={6} className="mb-3">
                                        <Form.Label>Modelo</Form.Label>
                                        <Form.Control type="text" name="modelo" onChange={this.myChangeHandler} required />
                                    </Col>
                                    <Col xs={12} lg={6} className="mb-3">
                                        <Form.Label>Data de Aquisição</Form.Label>
                                        <Form.Control type="date" name="data_aquisicao" onChange={this.myChangeHandler} required />
                                    </Col>
                                    <Col xs={12} lg={6} className="mb-3">
                                        <Form.Label>Potência</Form.Label>
                                        <Form.Control type="number" name="potencia" onChange={this.myChangeHandler} required />
                                    </Col>
                                    <Col xs={12} lg={6} className="mb-3">
                                        <Form.Label>Tensão</Form.Label>
                                        <Form.Control type="number" name="tensao" onChange={this.myChangeHandler} required />
                                    </Col>
                                    <Col xs={12} lg={6} className="mb-3">
                                        <Form.Label>Consumo Estimado</Form.Label>
                                        <Form.Control type="number" name="consumo" onChange={this.myChangeHandler} required />
                                    </Col>
                                    <Col xs={12} lg={12} className="mb-3">
                                        <Button type="submit" variant="success" className="d-flex ml-auto">{(equipment._id !== undefined) ? "Salvar" : "Adicionar"}</Button>
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