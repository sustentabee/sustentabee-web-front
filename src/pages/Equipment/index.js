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

export default class Equipment extends Component {

    state = {
        show: false,
        equipments: data.equipments,
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
            equipments.push(equipment);
            this.setState({ equipments });
        } else {
            for (let i = 0; i < equipments.length; i++) {
                if (i === index) {
                    equipments[i].nome = equipment.nome;
                    equipments[i].dM = equipment.dM;
                    equipments[i].serial = equipment.serial;
                    equipments[i].modelo = equipment.modelo;
                    equipments[i].marca = equipment.marca;
                    equipments[i].dataAquisicao = equipment.dataAquisicao;
                    equipments[i].potencia = equipment.potencia;
                    equipments[i].tensao = equipment.tensao;
                    equipments[i].consumo = equipment.consumo;
                }
            }
            this.setState({ equipments });
        }
        this.handleClose();
    }

    delete = (index) => {
        let { equipments } = this.state;
        equipments.splice(index, 1)
        this.setState({ equipments });
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
                                <CardListHeader>
                                    <Row>
                                        <Col xs={12} lg={2} className="font-weight-bold d-flex align-items-center">Nome</Col>
                                        <Col xs={12} lg={1} className="font-weight-bold d-flex align-items-center">Disp. de Medição</Col>
                                        <Col xs={12} lg={1} className="font-weight-bold d-flex align-items-center">Serial</Col>
                                        <Col xs={12} lg={2} className="font-weight-bold d-flex align-items-center">Marca/Modelo</Col>
                                        <Col xs={12} lg={2} className="font-weight-bold d-flex align-items-center">Data de Aquisição</Col>
                                        <Col xs={12} lg={2} className="font-weight-bold d-flex align-items-center"></Col>
                                    </Row>
                                </CardListHeader>
                                {equipments.map((equipment, i) => (
                                    <CardList key={i}>
                                        <Row>
                                            <Col xs={12} lg={2} className="d-flex align-items-center small">
                                                {equipment.nome}
                                            </Col>
                                            <Col xs={12} lg={1} className="d-flex align-items-center small">
                                                {equipment.dM}
                                            </Col>
                                            <Col xs={12} lg={1} className="d-flex align-items-center small">
                                                {equipment.serial}
                                            </Col>
                                            <Col xs={12} lg={2} className="d-flex align-items-center small">
                                                {equipment.marca} - {equipment.modelo}
                                            </Col>
                                            <Col xs={12} lg={2} className="d-flex align-items-center small">
                                                {formatDate(equipment.dataAquisicao)}
                                            </Col>
                                            <Col xs={12} lg={4} className="d-flex align-items-center justify-content-end">
                                                <BtnAction name={"Ver equipamento"} icon={"remove_red_eye"} action={() => window.location.href = "/equipamento/" + equipment.nome + "/dashboard"} />
                                                <BtnAction name={"Editar"} icon={"edit"} action={() => this.handleShow(i, equipment)} />
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
                        <Modal.Title style={{ color: "rgba(0,0,0,.5)" }}>{(index !== -1) ? "Editar" : "Adicionar"} equipamento</Modal.Title>
                        <Button variant="muted" onClick={this.handleClose}><MaterialIcon icon="close" /></Button>
                    </Modal.Header>
                    <Modal.Body>
                        <Container>
                            <Form onSubmit={this.save}>
                                <Row>
                                    <Col xs={12} lg={6} className="mb-3">
                                        <Form.Label>Nome</Form.Label>
                                        <Form.Control type="text" name="nome" value={equipment.nome} onChange={this.myChangeHandler} required />
                                    </Col>
                                    <Col xs={12} lg={6} className="mb-3">
                                        <Form.Label>Dispositivo de Medição</Form.Label>
                                        <Form.Control type="text" name="dM" value={equipment.dM} onChange={this.myChangeHandler} required />
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
                                        <Form.Label>Marca</Form.Label>
                                        <Form.Control type="text" name="marca" value={equipment.marca} onChange={this.myChangeHandler} required />
                                    </Col>
                                    <Col xs={12} lg={6} className="mb-3">
                                        <Form.Label>Data de Aquisição</Form.Label>
                                        <Form.Control type="date" name="dataAquisicao" value={equipment.dataAquisicao} onChange={this.myChangeHandler} required />
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
                                        <Form.Control type="number" name="consumoEstim" value={equipment.consumoEstim} onChange={this.myChangeHandler} required />
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