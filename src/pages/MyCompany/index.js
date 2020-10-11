import React, { Component } from 'react';
import { Container, Row, Col, Form, Button, Card, Spinner } from "react-bootstrap";
import NavbarCompany from '../../components/NavbarCompany';
import api from "../../config/api";
import { decodeToken } from '../../config/auth';
import Header from '../../components/Header';
import swal from 'sweetalert';
import BtnAction from '../../components/BtnAction';
import axios from "axios";
import { formatCNPJ, formatCellphone } from '../../config/utils';

export default class MyCompany extends Component {

    state = {
        companies: [],
        user: decodeToken(),
        company: [],
        load: false,
    }

    componentDidMount() {
        this.getCompanies();
    }

    myChangeHandler = (event) => {
        let nam = event.target.name;
        let val = event.target.value;

        if (nam === "zipcode") {
            this.getAddress(val);
        }

        this.setState({
            company: {
                ...this.state.company,
                [nam]: val
            }
        });

    }

    getAddress = async (zipcode) => {
        zipcode = String(zipcode).normalize('NFD').replace(/([\u0300-\u036f]|[^0-9a-zA-Z])/g, '');
        if (zipcode.length >= 8) {
            const response = await axios.get(`https://cors-anywhere.herokuapp.com/https://viacep.com.br/ws/${zipcode}/json/`);
            if (response.data !== null) {
                this.setState({
                    company: {
                        ...this.state.company,
                        zipcode: zipcode,
                        address: response.data.logradouro,
                        neighborhood: response.data.bairro,
                        city: response.data.localidade,
                        state: response.data.uf,
                    }
                })
            }
        }
    }

    getCompanies = async () => {
        const response = await api.get("/company");
        this.setState({ companies: response.data });
    }

    edit = async (company) => this.setState({ company });

    save = async (event) => {
        event.preventDefault();
        const { company = [] } = this.state;
        this.setState({ load: true });
        if (company.id !== undefined) {
            await api.put(`/company/${company.id}`, company)
                .then(() => {
                    this.getCompanies();
                    swal({ icon: "success", title: "Sucesso!", text: "Empresa editada com sucesso." });
                    this.setState({ load: false });
                })
                .catch(() => {
                    swal({ icon: "error", title: "Erro!", text: "Erro ao editar a empresa, tente novamente mais tarde." });
                    this.setState({ load: false });
                })
        } else {
            await api.post(`/company`, company)
                .then(() => {
                    this.getCompanies();
                    swal({ icon: "success", title: "Sucesso!", text: "Empresa cadastrada com sucesso." });
                    this.setState({ load: false });
                })
                .catch(() => {
                    swal({ icon: "error", title: "Erro!", text: "Erro ao cadastrar a empresa, tente novamente mais tarde." });
                    this.setState({ load: false });
                })
        }
        this.setState({ company: [] })
        this.clear();
    }

    delete = async (company) => {
        swal({
            title: "Atenção",
            text: "Deseja excluir esta empresa?",
            icon: "warning",
            buttons: ["Cancelar", "OK"],
            dangerMode: false,
        })
            .then(async (res) => {
                if (res) {
                    await api.delete(`/company/${company.id}`)
                        .then(() => {
                            this.getCompanies();
                            swal({ icon: "success", title: "Sucesso!", text: "Empresa removida com sucesso." });
                        })
                        .catch(error => {
                            swal({ icon: "error", title: "Erro!", text: "Erro ao remover a empresa, tente novamente mais tarde." });
                        })
                }
            });
    }

    clear = () => { this.setState({ company: { name: "", document_number: "", phone: "", zipcode: "", address: "", neighborhood: "", city: "", state: "", number: "", complement: "" } }) }

    render() {
        const { companies = [], company, load = false } = this.state;

        return (
            <>
                <NavbarCompany />
                <Header title={"Minhas empresas"} />
                <Container className="mt-3" fluid>
                    <Row className="justify-content-center">
                        <Col xs={12} lg={6}>
                            <Form onSubmit={this.save} >
                                <Row>
                                    <Col xs={12} lg={6} className="mb-4">
                                        <Form.Label>Nome</Form.Label>
                                        <Form.Control type="text" name="name" value={company.name} onChange={this.myChangeHandler} required />
                                    </Col>
                                    <Col xs={12} lg={6} className="mb-4">
                                        <Form.Label>CNPJ</Form.Label>
                                        <Form.Control type="text" maxLength="18" name="document_number" value={formatCNPJ(company.document_number) || ""} onChange={this.myChangeHandler} required />
                                    </Col>
                                    <Col xs={12} lg={6} className="mb-4">
                                        <Form.Label>Telefone</Form.Label>
                                        <Form.Control type="text" maxLength="14" name="phone" value={formatCellphone(company.phone) || ""} onChange={this.myChangeHandler} required />
                                    </Col>
                                    <Col xs={12} lg={6} className="mb-4">
                                        <Form.Label>CEP</Form.Label>
                                        <Form.Control type="text" name="zipcode" value={company.zipcode} onChange={this.myChangeHandler} required />
                                    </Col>
                                    <Col xs={12} lg={12} className="mb-4">
                                        <Form.Label>Endereço</Form.Label>
                                        <Form.Control type="text" name="address" value={company.address} onChange={this.myChangeHandler} required />
                                    </Col>
                                    <Col xs={12} lg={6} className="mb-4">
                                        <Form.Label>Bairro</Form.Label>
                                        <Form.Control type="text" name="neighborhood" value={company.neighborhood} onChange={this.myChangeHandler} required />
                                    </Col>
                                    <Col xs={12} lg={6} className="mb-4">
                                        <Form.Label>Cidade</Form.Label>
                                        <Form.Control type="text" name="city" value={company.city} onChange={this.myChangeHandler} required />
                                    </Col>
                                    <Col xs={12} lg={6} className="mb-4">
                                        <Form.Label>Estado</Form.Label>
                                        <Form.Control type="text" name="state" value={company.state} onChange={this.myChangeHandler} required />
                                    </Col>
                                    <Col xs={12} lg={6} className="mb-4">
                                        <Form.Label>Número</Form.Label>
                                        <Form.Control type="text" name="number" value={company.number} onChange={this.myChangeHandler} required />
                                    </Col>
                                    <Col xs={12} lg={12} className="mb-4">
                                        <Form.Label>Complemento</Form.Label>
                                        <Form.Control type="text" name="complement" value={company.complement} onChange={this.myChangeHandler} />
                                    </Col>
                                    <Col xs={12} className="mb-4 text-right" >
                                        <Button type="button" variant="muted" className="button-outline ml-2" onClick={() => this.clear()}>Limpar</Button>
                                        {(load) ?
                                            <Button variant="success" className="button ml-2" disabled>
                                                <Spinner
                                                    as="span"
                                                    animation="border"
                                                    size="sm"
                                                    role="status"
                                                    aria-hidden="true"
                                                />
                                                <span className="ml-3">Carregando...</span>
                                            </Button>
                                            : <Button type="submit" className="button ml-2">Salvar</Button>}
                                    </Col>
                                </Row>
                            </Form>
                        </Col>
                        <Col xs={12} lg={6}>
                            <Row>
                                {companies.map((company, index) => (
                                    <Col xs={12} lg={12} key={index} >
                                        <Card className="border-0 shadow-sm mb-2">
                                            <Card.Body>
                                                <Row>
                                                    <Col xs={12} lg={9}>
                                                        <h6 className="mb-0">{company.name}</h6>
                                                        <p className="text-muted mb-0 small">{formatCellphone(company.phone)} - {formatCNPJ(company.document_number)}</p>
                                                        <p className="text-muted mb-0 small">{company.address} - {company.neighborhood} - Número {company.number}</p>
                                                        <p className="text-muted mb-0 small">{company.city} - {company.state} - {company.zipcode}</p>
                                                        <p className="text-muted mb-0 small">{company.complement}</p>
                                                    </Col>
                                                    <Col xs={12} lg={3} className="d-flex align-items-center justify-content-end">
                                                        <BtnAction name={"Editar"} icon={"edit"} action={() => this.edit(company)} />
                                                        <BtnAction name={"Excluir"} icon={"close"} action={() => this.delete(company)} />
                                                    </Col>
                                                </Row>
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                ))}
                            </Row>
                        </Col>
                    </Row>
                </Container>
            </>
        )
    }
}