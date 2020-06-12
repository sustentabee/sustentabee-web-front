import React, { Component } from 'react';
import { Container, Row, Col } from "react-bootstrap";
import Layout from '../../components/Layout';
import Header from '../../components/Header';
import CardList from '../../components/CardList';
import CardListHeader from '../../components/CardListHeader';
import data from "../../config/data";
import { formatDate, calcularConsumo, calcularTempo } from "../../config/utils";

export default class Measurement extends Component {

    state = {
        measurements: data.measurements,
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
                                        <Col xs={12} lg={2} className="font-weight-bold d-flex align-items-center">Equipamento</Col>
                                        <Col xs={12} lg={2} className="font-weight-bold d-flex align-items-center">Marca/Modelo</Col>
                                        <Col xs={12} lg={2} className="font-weight-bold d-flex align-items-center">Data</Col>
                                        <Col xs={12} lg={2} className="font-weight-bold d-flex align-items-center">Bandeira</Col>
                                        <Col xs={12} lg={2} className="font-weight-bold d-flex align-items-center">Tempo Registrado</Col>
                                        <Col xs={12} lg={2} className="font-weight-bold d-flex align-items-center">Consumo</Col>
                                    </Row>
                                </CardListHeader>
                                {measurements.map((measurement, i) => (
                                    <CardList key={i}>
                                        <Row>
                                            <Col xs={12} lg={2} className="d-flex align-items-center small">
                                                {measurement.equipment}
                                            </Col>
                                            <Col xs={12} lg={2} className="d-flex align-items-center small">
                                                {measurement.marca} - {measurement.modelo}
                                            </Col>
                                            <Col xs={12} lg={2} className="d-flex align-items-center small">
                                                {formatDate(measurement.data)}
                                            </Col>
                                            <Col xs={12} lg={2} className="d-flex align-items-center small">
                                                {measurement.bandeira}
                                            </Col>
                                            <Col xs={12} lg={2} className="d-flex align-items-center small">
                                                {calcularTempo(measurement.measurementStart, measurement.measurementEnd)}
                                            </Col>
                                            <Col xs={12} lg={2} className="d-flex align-items-center small">
                                                {calcularConsumo(calcularTempo(measurement.measurementStart, measurement.measurementEnd), measurement.potencia, 1).toFixed(4)} kWh
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