import React, { Component } from 'react';
import { Container, Row, Col, Form, Button, Modal } from "react-bootstrap";
import Layout from '../../components/Layout';
import Header from '../../components/Header';
import BtnAction from '../../components/BtnAction';
import CardList from '../../components/CardList';
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
                tensao: "220",
                consumo: "500",
            },
            {
                dm: "Dispositivo de Medição",
                serial: "Serial",
                modelo: "modelo",
                marca: "Electrolux",
                data_aquisicao: "1977-10-13",
                potencia: "10",
                tensao: "220",
                consumo: "500",
            },
            {
                dm: "Dispositivo de Medição",
                serial: "Serial",
                modelo: "modelo",
                marca: "Electrolux",
                data_aquisicao: "1977-10-13",
                potencia: "10",
                tensao: "220",
                consumo: "500",
            }
        ],
        equipment: [],
        index: -1
    }

    handleClose = () => this.setState({ show: false });
    handleShow = (index = -1, equipment = {}) => this.setState({ show: true, index, equipment });

    myChangeHandler = (event) => {
        let nam = event.target.name;
        let val = event.target.value;
        this.setState({ equipment: { ...this.state.equipment, [nam]: val } });
    }

    save = event => {
        event.preventDefault();
        let { equipments, equipment, index } = this.state;
        if (index === -1) {
            equipment.marca = "Electrolux";
            equipments.push(equipment);
            this.setState({ equipments });
        } else {
            for (let i = 0; i < equipments.length; i++) {
                if (i === index) {
                    equipments[i].dm = equipment.dm;
                    equipments[i].serial = equipment.serial;
                    equipments[i].modelo = equipment.modelo;
                    equipments[i].marca = equipment.marca;
                    equipments[i].data_aquisicao = equipment.data_aquisicao;
                    equipments[i].potencia = equipment.potencia;
                    equipments[i].tensao = equipment.tensao;
                    equipments[i].consumo = equipment.consumo;
                }
            }
            this.setState({ equipments });
        }
        this.handleClose();
    }

    delete = () => {
        let { equipments, index } = this.state;
        equipments.splice(index, 1)
        this.setState({ equipments });
        this.handleClose();
    }

    render() {
        const { equipments, equipment, show, index } = this.state;

        return (
            <>
                <Layout>
                    <Header title={"Equipamentos"}>
                        <Button variant="success" onClick={() => this.handleShow(-1, {})}>
                            Adicionar
                        </Button>
                    </Header>
                    <Container fluid>
                        <Row>
                            <Col xs={12}>
                                {equipments.map((equipment, index) => (
                                    <CardList key={index}>
                                        <Row>
                                            <Col xs={12} lg={3} className="d-flex align-items-start justify-content-center flex-column">
                                                <h6 className="mb-0">{equipment.dm}</h6>
                                                <p className="mb-0 text-muted">{equipment.serial}</p>
                                            </Col>
                                            <Col xs={12} lg={2} className="d-flex align-items-start justify-content-center flex-column">
                                                <h6 className="mb-0">{equipment.marca}</h6>
                                                <p className="mb-0 text-muted">{equipment.modelo}</p>
                                            </Col>
                                            <Col xs={12} lg={3} className="d-flex align-items-start justify-content-center flex-column">
                                                <h6 className="mb-0">Data de Aquisição</h6>
                                                <p className="mb-0 text-muted">{new Date(equipment.data_aquisicao).toLocaleDateString()}</p>
                                            </Col>
                                            <Col xs={12} lg={4} className="d-flex align-items-center justify-content-end">
                                                <BtnAction name={"Ver equipamento"} icon={"remove_red_eye"} action={() => window.alert(equipment.marca + " " + equipment.modelo)} />
                                                <BtnAction name={"Editar"} icon={"edit"} action={() => this.handleShow(index, equipment)} />
                                                <BtnAction name={"Excluir"} icon={"close"} action={() => this.delete(index, equipment)} />
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
                        <Modal.Title style={{ color: "rgba(0,0,0,.5)" }}>{(equipment._id !== undefined) ? "Editar" : "Adicionar"} equipamento</Modal.Title>
                        <Button variant="muted" onClick={this.handleClose}><MaterialIcon icon="close" /></Button>
                    </Modal.Header>
                    <Modal.Body>
                        <Container>
                            <Form onSubmit={this.save}>
                                <Row>
                                    <Col xs={12} lg={6} className="mb-3">
                                        <Form.Label>Dispositivo de Medição</Form.Label>
                                        <Form.Control type="text" name="dm" value={equipment.dm} onChange={this.myChangeHandler} required />
                                    </Col>
                                    <Col xs={12} lg={6} className="mb-3">
                                        <Form.Label>Serial</Form.Label>
                                        <Form.Control type="text" name="serial" value={equipment.serial} onChange={this.myChangeHandler} required />
                                    </Col>
                                    <Col xs={12} lg={6} className="mb-3">
                                        <Form.Label>Modelo</Form.Label>
                                        <Form.Control type="text" name="modelo" value={equipment.modelo} onChange={this.myChangeHandler} required />
                                    </Col>
                                    <Col xs={12} lg={6} className="mb-3">
                                        <Form.Label>Data de Aquisição</Form.Label>
                                        <Form.Control type="date" name="data_aquisicao" value={equipment.data_aquisicao} onChange={this.myChangeHandler} required />
                                    </Col>
                                    <Col xs={12} lg={6} className="mb-3">
                                        <Form.Label>Potência</Form.Label>
                                        <Form.Control type="number" name="potencia" value={equipment.potencia} onChange={this.myChangeHandler} required />
                                    </Col>
                                    <Col xs={12} lg={6} className="mb-3">
                                        <Form.Label>Tensão</Form.Label>
                                        <Form.Control type="number" name="tensao" value={equipment.tensao} onChange={this.myChangeHandler} required />
                                    </Col>
                                    <Col xs={12} lg={6} className="mb-3">
                                        <Form.Label>Consumo Estimado</Form.Label>
                                        <Form.Control type="number" name="consumo" value={equipment.consumo} onChange={this.myChangeHandler} required />
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