import React, { Component } from 'react';
import { Container, Row, Col } from "react-bootstrap";
import Layout from '../../components/Layout';
import Header from '../../components/Header';
import CardList from '../../components/CardList';
import CardListHeader from '../../components/CardListHeader';
import api from "../../config/api";

export default class Measurement extends Component {

    state = {
        measurements: [],
    }

    componentDidMount() {
        this.getMeasurements();
    }

    getMeasurements = async () => {
        const response = await api.get("/measurement");
        this.setState({ measurements: response.data });
    }

    render() {
        const { measurements } = this.state;
        return (
            <>
                <Layout>
                    <Header title={"Medições"} />
                    <Container fluid>
                        <Row>
                            <Col xs={12}>
                                <CardListHeader>
                                    <Row>
                                        <Col xs={12} lg={2} className="font-weight-bold d-flex align-items-center text-primary">Equipamento</Col>
                                        <Col xs={12} lg={2} className="font-weight-bold d-flex align-items-center text-primary">Marca/Modelo</Col>
                                        <Col xs={12} lg={2} className="font-weight-bold d-flex align-items-center text-primary">Data</Col>
                                        <Col xs={12} lg={2} className="font-weight-bold d-flex align-items-center text-primary">Temperatura (ºC)</Col>
                                        <Col xs={12} lg={2} className="font-weight-bold d-flex align-items-center text-primary">Tensão (V)</Col>
                                        <Col xs={12} lg={2} className="font-weight-bold d-flex align-items-center text-primary">Potência (W)</Col>
                                    </Row>
                                </CardListHeader>
                                {measurements.map((measurement, index) => (
                                    <CardList key={index}>
                                        <Row>
                                            <Col xs={12} lg={2} className="d-flex align-items-center small text-muted">
                                                <span className="d-inline-flex d-lg-none text-success font-weight-bold mr-1">Equipamento:</span>{measurement.name}
                                            </Col>
                                            <Col xs={12} lg={2} className="d-flex align-items-center small text-muted">
                                                <span className="d-inline-flex d-lg-none text-success font-weight-bold mr-1">Marca/Modelo:</span>{measurement.brand} - {measurement.model}
                                            </Col>
                                            <Col xs={12} lg={2} className="d-flex align-items-center small text-muted">
                                                <span className="d-inline-flex d-lg-none text-success font-weight-bold mr-1">Data:</span>{new Date(measurement.date).toLocaleDateString()}
                                            </Col>
                                            <Col xs={12} lg={2} className="d-flex align-items-center small text-muted">
                                                <span className="d-inline-flex d-lg-none text-success font-weight-bold mr-1">Temperatura (ºC):</span>{String(measurement.temperature).replace(".", ",")}
                                            </Col>
                                            <Col xs={12} lg={2} className="d-flex align-items-center small text-muted">
                                                <span className="d-inline-flex d-lg-none text-success font-weight-bold mr-1">Tensão (V):</span>{measurement.voltage}
                                            </Col>
                                            <Col xs={12} lg={2} className="d-flex align-items-center small text-muted">
                                                <span className="d-inline-flex d-lg-none text-success font-weight-bold mr-1">Potência (W):</span>{String(measurement.power).replace(".", ",")}
                                            </Col>
                                        </Row>
                                    </CardList>
                                ))}
                            </Col>
                        </Row>
                    </Container>
                </Layout>
            </>
        )
    }
}