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

export default class Settings extends Component {

    state = {
        show: false,
        equipments: [],
        company_spectrum_arr: [],
        company_spectrum: [],
        load: false,
    }

    componentDidMount() {
        this.getCompanySpectrum();
    }

    getCompanySpectrum = async () => {
        const response = await api.get("/company-spectrum");
        this.setState({ company_spectrum_arr: response.data });
    }

    handleClose = () => this.setState({ show: false });
    handleShow = (company_spectrum = {}) => this.setState({ show: true, company_spectrum });

    myChangeHandler = (event) => {
        let nam = event.target.name;
        let val = event.target.value;
        this.setState({ company_spectrum: { ...this.state.company_spectrum, [nam]: val } });
    }

    save = async event => {
        event.preventDefault();
        const { company_spectrum } = this.state;
        this.setState({ load: true });
        
        if (company_spectrum.id !== undefined) {
            await api.put(`/company-spectrum/${company_spectrum.id}`, company_spectrum)
                .then(() => {
                    this.getCompanySpectrum();
                    swal({ icon: "success", title: "Sucesso!", text: "Registro editado com sucesso." });
                    this.setState({ load: false });
                })
                .catch(() => {
                    swal({ icon: "error", title: "Erro!", text: "Erro ao editar, tente novamente mais tarde." });
                    this.setState({ load: false });
                })
        } else {
            await api.post("/company-spectrum", company_spectrum)
                .then(() => {
                    this.getCompanySpectrum();
                    swal({ icon: "success", title: "Sucesso!", text: "Registro cadastrado com sucesso." });
                    this.setState({ load: false });
                })
                .catch(() => {
                    swal({ icon: "error", title: "Erro!", text: "Erro ao cadastrar, tente novamente mais tarde." });
                    this.setState({ load: false });
                })
        }
        this.handleClose();
    }

    delete = async company_spectrum => {
        swal({
            title: "Atenção",
            text: "Deseja excluir este registro?",
            icon: "warning",
            buttons: ["Cancelar", "OK"],
            dangerMode: false,
        })
            .then(async (res) => {
                if (res) {
                    await api.delete(`/company-spectrum/${company_spectrum.id}`, company_spectrum)
                        .then(() => {
                            this.getCompanySpectrum();
                            swal({ icon: "success", title: "Sucesso!", text: "Registro removido com sucesso." });
                        })
                        .catch(() => {
                            swal({ icon: "error", title: "Erro!", text: "Erro ao remover, tente novamente mais tarde." });
                        })
                }
            });
    }

    render() {
        const { company_spectrum_arr = [], company_spectrum, show, load = false } = this.state;

        return (
            <>
                <Layout>
                    <Header title={"Configurações"}>
                    </Header>
                    <Container fluid>
                        <Row>
                            <Col xs={12} lg={12} className="d-flex align-items-center justify-content-between mb-2">
                                <h5 className="text-primary mb-0">Espectro de Equipamento</h5>
                                <Button variant="success" className="button" onClick={() => this.handleShow()}>Adicionar</Button>
                            </Col>
                            <Col xs={12}>
                                <CardListHeader>
                                    <Row>
                                        <Col xs={12} lg={4} className="font-weight-bold d-flex align-items-center text-primary">Porcentagem</Col>
                                        <Col xs={12} lg={4} className="font-weight-bold d-flex align-items-center text-primary">Cor</Col>
                                        <Col xs={12} lg={4} className="font-weight-bold d-flex align-items-center text-primary"></Col>
                                    </Row>
                                </CardListHeader>
                                {company_spectrum_arr.map((company_spectrum, index) => (
                                    <CardList key={index}>
                                        <Row>
                                            <Col xs={12} lg={4} className="d-flex align-items-center small text-muted">
                                                <span className="d-inline-flex d-lg-none text-success font-weight-bold mr-1">Porcentagem:</span>{company_spectrum.percent}%
                                            </Col>
                                            <Col xs={12} lg={4} className="d-flex align-items-center small text-muted">
                                                <span className="d-inline-flex d-lg-none text-success font-weight-bold mr-1">Cor:</span><div className="d-flex w-25 h-100 text-center" style={{ height: "10px", background: company_spectrum.color }} />
                                            </Col>
                                            <Col xs={12} lg={4} className="d-flex align-items-center justify-content-end pt-3 pt-lg-0">
                                                <BtnAction name={"Editar"} icon={"edit"} action={() => this.handleShow(company_spectrum)} />
                                                <BtnAction name={"Excluir"} icon={"close"} action={() => this.delete(company_spectrum)} />
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
                        <Modal.Title style={{ color: "rgba(0,0,0,.5)" }}>{(company_spectrum.id !== undefined) ? "Editar" : "Adicionar"} manutenção</Modal.Title>
                        <Button variant="muted" onClick={this.handleClose}><MaterialIcon icon="close" /></Button>
                    </Modal.Header>
                    <Modal.Body>
                        <Container>
                            <Form onSubmit={this.save}>
                                <Row>
                                    <Col xs={12} lg={6} className="mb-3">
                                        <Form.Label>Porcentagem</Form.Label>
                                        <Form.Control type="number" name="percent" value={company_spectrum.percent} onChange={this.myChangeHandler} required max="1000" min="0" />
                                    </Col>
                                    <Col xs={12} lg={6} className="mb-3">
                                        <Form.Label>Cor</Form.Label>
                                        <Form.Control type="color" name="color" value={company_spectrum.color} onChange={this.myChangeHandler} required />
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
                                            : <Button type="submit" variant="success" className="button d-flex ml-auto">{(company_spectrum.id !== undefined) ? "Salvar" : "Adicionar"}</Button>}
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