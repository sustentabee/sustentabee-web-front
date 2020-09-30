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

export default class Maintenance extends Component {

    state = {
        show: false,
        equipments: [],
        maintenances: [],
        maintenance: [],
        load: false,
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
        this.setState({ load: true });
        if (maintenance.id !== undefined) {
            await api.put(`/maintenance/${maintenance.id}`, maintenance)
                .then(() => {
                    this.getMaintenances();
                    swal({ icon: "success", title: "Sucesso!", text: "Manutenção editada com sucesso." });
                    this.setState({ load: false });
                })
                .catch(() => {
                    swal({ icon: "error", title: "Erro!", text: "Erro ao editar a manutenção, tente novamente mais tarde." });
                    this.setState({ load: false });
                })
        } else {
            await api.post("/maintenance", maintenance)
                .then(() => {
                    this.getMaintenances();
                    swal({ icon: "success", title: "Sucesso!", text: "Manutenção cadastrada com sucesso." });
                    this.setState({ load: false });
                })
                .catch(() => {
                    swal({ icon: "error", title: "Erro!", text: "Erro ao cadastrar a manutenção, tente novamente mais tarde." });
                    this.setState({ load: false });
                })
        }
        this.handleClose();
    }

    delete = async maintenance => {
        swal({
            title: "Atenção",
            text: "Deseja excluir esta manutenção?",
            icon: "warning",
            buttons: ["Cancelar", "OK"],
            dangerMode: false,
        })
            .then(async (res) => {
                if (res) {
                    await api.delete(`/maintenance/${maintenance.id}`, maintenance)
                        .then(() => {
                            this.getMaintenances();
                            swal({ icon: "success", title: "Sucesso!", text: "Manutenção removida com sucesso." });
                        })
                        .catch(() => {
                            swal({ icon: "error", title: "Erro!", text: "Erro ao remover a manutenção, tente novamente mais tarde." });
                        })
                }
            });
    }

    render() {
        const { maintenances, maintenance, show, equipments, load = false } = this.state;

        return (
            <>
                <Layout>
                    <Header title={"Manutenções"}>
                        <Button variant="success" className="button" onClick={() => this.handleShow()}>Adicionar</Button>
                    </Header>
                    <Container fluid>
                        <Row>
                            <Col xs={12}>
                                <CardListHeader>
                                    <Row>
                                        <Col xs={12} lg={2} className="font-weight-bold d-flex align-items-center text-primary">Equipamento</Col>
                                        <Col xs={12} lg={3} className="font-weight-bold d-flex align-items-center text-primary">Marca/Modelo</Col>
                                        <Col xs={12} lg={2} className="font-weight-bold d-flex align-items-center text-primary">Data</Col>
                                        <Col xs={12} lg={2} className="font-weight-bold d-flex align-items-center text-primary">Detalhes</Col>
                                        <Col xs={12} lg={3} className="font-weight-bold d-flex align-items-center text-primary"></Col>
                                    </Row>
                                </CardListHeader>
                                {maintenances.map((maintenance, index) => (
                                    <CardList key={index}>
                                        <Row>
                                            <Col xs={12} lg={2} className="d-flex align-items-center small text-muted">
                                                <span className="d-inline-flex d-lg-none text-success font-weight-bold mr-1">Equipamento:</span>{maintenance.name}
                                            </Col>
                                            <Col xs={12} lg={3} className="d-flex align-items-center small text-muted">
                                                <span className="d-inline-flex d-lg-none text-success font-weight-bold mr-1">Marca/Modelo:</span>{maintenance.brand} - {maintenance.model}
                                            </Col>
                                            <Col xs={12} lg={2} className="d-flex align-items-center small text-muted">
                                                <span className="d-inline-flex d-lg-none text-success font-weight-bold mr-1">Data:</span>{new Date(maintenance.date).toLocaleDateString()}
                                            </Col>
                                            <Col xs={12} lg={2} className="d-flex align-items-center small text-muted">
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
                                            : <Button type="submit" variant="success" className="button d-flex ml-auto">{(maintenance.id !== undefined) ? "Salvar" : "Adicionar"}</Button>}
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