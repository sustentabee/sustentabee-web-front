import React, { Component } from 'react';
import { Container, Row, Col, Form, Button, Modal, Spinner } from "react-bootstrap";
import Layout from '../../components/Layout';
import Header from '../../components/Header';
import BtnAction from '../../components/BtnAction';
import CardList from '../../components/CardList';
import CardListHeader from '../../components/CardListHeader';
import MaterialIcon from "material-icons-react";
import api from "../../config/api";
import swal from "sweetalert";

export default class Equipment extends Component {

    state = {
        show: false,
        equipments: [],
        equipment: [],
        load: false,
    }

    componentDidMount() {
        this.getEquipments();
    }

    getEquipments = async () => {
        const response = await api.get("/equipment");
        this.setState({ equipments: response.data });
    }

    handleClose = () => this.setState({ show: false });
    handleShow = (equipment = {}) => this.setState({ show: true, equipment });

    myChangeHandler = (event) => {
        let nam = event.target.name;
        let val = event.target.value;
        this.setState({ equipment: { ...this.state.equipment, [nam]: val } });
    }

    save = async event => {
        event.preventDefault();
        this.setState({ load: true });
        const { equipment } = this.state;
        if (equipment.id !== undefined) {
            await api.put(`/equipment/${equipment.id}`, equipment)
                .then(() => {
                    this.getEquipments();
                    swal({ icon: "success", title: "Sucesso!", text: "Equipamento editado com sucesso." });
                    this.setState({ load: false });
                })
                .catch(() => {
                    swal({ icon: "error", title: "Erro!", text: "Erro ao editar o equipamento, tente novamente mais tarde." });
                    this.setState({ load: false });
                })
        } else {
            await api.post("/equipment", equipment)
                .then(() => {
                    this.getEquipments();
                    swal({ icon: "success", title: "Sucesso!", text: "Equipamento cadastrado com sucesso." });
                    this.setState({ load: false });
                })
                .catch(() => {
                    swal({ icon: "error", title: "Erro!", text: "Erro ao cadastrar o equipamento, tente novamente mais tarde." });
                    this.setState({ load: false });
                })
        }
        this.handleClose();
    }

    delete = async equipment => {
        swal({
            title: "Atenção",
            text: "Deseja excluir este equipamento?",
            icon: "warning",
            buttons: ["Cancelar", "OK"],
            dangerMode: false,
        })
            .then(async (res) => {
                if (res) {
                    await api.delete(`/equipment/${equipment.id}`, equipment)
                        .then(() => {
                            this.getEquipments();
                            swal({ icon: "success", title: "Sucesso!", text: "Equipamento removido com sucesso." });
                        })
                        .catch(() => {
                            swal({ icon: "error", title: "Erro!", text: "Erro ao remover o equipamento, tente novamente mais tarde." });
                        })
                }
            });
    }

    render() {
        const { equipments, equipment, show, load = false } = this.state;

        return (
            <>
                <Layout>
                    <Header title={"Equipamentos"}>
                        <Button variant="success" className="button" onClick={() => this.handleShow()}>Adicionar</Button>
                    </Header>
                    <Container fluid>
                        <Row>
                            <Col xs={12}>
                                <CardListHeader>
                                    <Row>
                                        <Col xs={12} lg={2} className="font-weight-bold d-flex align-items-center text-primary">Nome</Col>
                                        <Col xs={12} lg={2} className="font-weight-bold d-flex align-items-center text-primary">Serial</Col>
                                        <Col xs={12} lg={2} className="font-weight-bold d-flex align-items-center text-primary">Marca/Modelo</Col>
                                        <Col xs={12} lg={2} className="font-weight-bold d-flex align-items-center text-primary">Data de Aquisição</Col>
                                        <Col xs={12} lg={2} className="font-weight-bold d-flex align-items-center text-primary"></Col>
                                    </Row>
                                </CardListHeader>
                                {equipments.map((equipment, index) => (
                                    <CardList key={index}>
                                        <Row>
                                            <Col xs={12} lg={2} className="d-flex align-items-center small text-muted">
                                                <span className="d-inline-flex d-lg-none text-success font-weight-bold mr-1">Nome:</span>{equipment.name}
                                            </Col>
                                            <Col xs={12} lg={2} className="d-flex align-items-center small text-muted">
                                                <span className="d-inline-flex d-lg-none text-success font-weight-bold mr-1">Serial:</span>{equipment.serial}
                                            </Col>
                                            <Col xs={12} lg={2} className="d-flex align-items-center small text-muted">
                                                <span className="d-inline-flex d-lg-none text-success font-weight-bold mr-1">Marca/Modelo:</span>{equipment.brand} - {equipment.model}
                                            </Col>
                                            <Col xs={12} lg={2} className="d-flex align-items-center small text-muted">
                                                <span className="d-inline-flex d-lg-none text-success font-weight-bold mr-1">Data de Aquisição:</span>{new Date(equipment.dateAcquisition).toLocaleDateString()}
                                            </Col>
                                            <Col xs={12} lg={4} className="d-flex align-items-center justify-content-center justify-content-lg-end pt-3 pt-lg-0">
                                                <BtnAction name={"Ver equipamento"} icon={"remove_red_eye"} action={() => window.location.href = "/equipamento/" + equipment.id + "/dashboard"} />
                                                <BtnAction name={"Editar"} icon={"edit"} action={() => this.handleShow(equipment)} />
                                                <BtnAction name={"Excluir"} icon={"close"} action={() => this.delete(equipment)} />
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
                        <Modal.Title style={{ color: "rgba(0,0,0,.5)" }}>{(equipment.id !== undefined) ? "Editar" : "Adicionar"} equipamento</Modal.Title>
                        <Button variant="muted" onClick={this.handleClose}><MaterialIcon icon="close" /></Button>
                    </Modal.Header>
                    <Modal.Body>
                        <Container>
                            <Form onSubmit={this.save}>
                                <Row>
                                    <Col xs={12} lg={6} className="mb-3">
                                        <Form.Label>Nome</Form.Label>
                                        <Form.Control type="text" name="name" value={equipment.name} onChange={this.myChangeHandler} required />
                                    </Col>
                                    <Col xs={12} lg={6} className="mb-3">
                                        <Form.Label>Serial</Form.Label>
                                        <Form.Control type="text" name="serial" value={equipment.serial} onChange={this.myChangeHandler} required />
                                    </Col>
                                    <Col xs={12} lg={6} className="mb-3">
                                        <Form.Label>Marca</Form.Label>
                                        <Form.Control type="text" name="brand" value={equipment.brand} onChange={this.myChangeHandler} required />
                                    </Col>
                                    <Col xs={12} lg={6} className="mb-3">
                                        <Form.Label>Modelo</Form.Label>
                                        <Form.Control type="text" name="model" value={equipment.model} onChange={this.myChangeHandler} required />
                                    </Col>
                                    <Col xs={12} lg={6} className="mb-3">
                                        <Form.Label>Data de Aquisição</Form.Label>
                                        <Form.Control type="date" name="dateAcquisition" value={String(equipment.dateAcquisition).substr(0, 10)} onChange={this.myChangeHandler} required />
                                    </Col>
                                    <Col xs={12} lg={6} className="mb-3">
                                        <Form.Label>Potência</Form.Label>
                                        <Form.Control type="number" name="potency" value={equipment.potency} onChange={this.myChangeHandler} required />
                                    </Col>
                                    <Col xs={12} lg={6} className="mb-3">
                                        <Form.Label>Tensão</Form.Label>
                                        <Form.Control type="number" name="voltage" value={equipment.voltage} onChange={this.myChangeHandler} required />
                                    </Col>
                                    <Col xs={12} lg={6} className="mb-3">
                                        <Form.Label>Consumo Estimado</Form.Label>
                                        <Form.Control type="number" name="estimatedConsumption" value={equipment.estimatedConsumption} onChange={this.myChangeHandler} required />
                                    </Col>
                                    <Col xs={12} lg={12} className="mb-3">
                                        {(load) ?
                                            <Button variant="success" className="button d-flex ml-auto d-flex align-items-center" disabled>
                                                <Spinner
                                                    as="span"
                                                    animation="border"
                                                    size="sm"
                                                    role="status"
                                                    aria-hidden="true"
                                                />
                                                <span className="ml-3">Carregando...</span>
                                            </Button>
                                            : <Button type="submit" variant="success" className="button d-flex ml-auto">{(equipment.id !== undefined) ? "Salvar" : "Adicionar"}</Button>}
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