import React, { Component } from 'react';
import { Container, Row, Col, Card, Table } from "react-bootstrap";
import Layout from '../../components/Layout';
import Header from '../../components/Header';
import { Link } from 'react-router-dom';
import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts';
import Widget from '../../components/Widget';
import IconPowerBattery from "../../assets/img/power_battery.svg";

export default class EquipmentDashboard extends Component {

    generateColor = value => {
        if (value === "-") {
            return "#fff";
        }
        else if (value > 900) {
            return "#ff0000";
        } else if (value > 800) {
            return "#ff4c4c";
        } else if (value > 700) {
            return "#ff9999";
        } else if (value > 600) {
            return "#ffe5e5";
        } else if (value > 500) {
            return "#ffff00";
        } else if (value > 400) {
            return "#ffffb2";
        } else if (value > 300) {
            return "#cce5cc";
        } else if (value > 100) {
            return "#99cc99";
        } else if (value > 200) {
            return "#4ca64c";
        } else {
            return "#008000";
        }
    }

    render() {

        const options = {
            colors: ['#7FFF7F', '#333'],
            chart: { type: 'line' },
            title: {
                text: 'Consumo x Economia de Energia'
            },
            xAxis: { categories: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'], crosshair: true },
            yAxis: [{ className: 'highcharts-color-0', min: 0, title: { text: '' } }],
            tooltip: {
                headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
                pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                    '<td style="padding:0"><b> {point.y} kWh</b></td></tr>',
                footerFormat: '</table>',
                shared: true,
                useHTML: true
            },
            plotOptions: {
                column: {
                    pointPadding: 0.2,
                    borderWidth: 0
                }
            },
            series: [
                {
                    name: "Consumo de Energia",
                    data: [120, 110, 100, 90, 80, 70, 60, 50, 40, 30, 20, 10]
                },
                {
                    name: "Economia de Energia",
                    data: [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 110]
                }
            ]
        }

        return (
            <>
                <Layout>
                    <Header title={"Electrolux - FE22 - 173L"} />
                    <Container fluid>
                        <Row>
                            <Col xs={12} lg={6}>
                                <Widget icon={IconPowerBattery} name={"Consumo no Mês"} value={"2340 kWh"} />
                            </Col>
                            <Col xs={12} lg={6}>
                                <Widget icon={IconPowerBattery} name={"Consumo no Ano"} value={"23140 kWh"} />
                            </Col>
                        </Row>
                        <Row className="mb-4">
                            <Col xs={12} lg={6} className="text-center">
                                <Card className="border-0 rounded shadow-sm h-100 justify-content-end pr-4">
                                    <Card.Body>
                                        <HighchartsReact
                                            highcharts={Highcharts}
                                            options={options}
                                        />
                                        <br />
                                        <Link to={"#"} className="small mt-2">Ir para Dashboards</Link>
                                    </Card.Body>
                                </Card>
                            </Col>
                            <Col xs={12} lg={6} className="mt-5 mt-lg-0">
                                <Row className="mb-3">
                                    <Col xs={6} className="">
                                        <h6 className="mb-0">Alertas</h6>
                                    </Col>
                                    <Col xs={6} className="text-right">
                                        <Link to={"#"} className="small mr-1 mb-0">Ver todos</Link>
                                    </Col>
                                </Row>
                                <Row className="home-card">
                                    <Col xs={12} className="">
                                        <Card className="border-0 rounded shadow-sm">
                                            <Card.Body>
                                                <Row>
                                                    <Col xs={12} lg={7} className="d-flex align-items-center">
                                                        <div className="d-flex h-100 mr-3 rounded" style={{ width: "6px", background: "#A00" }}></div>
                                                        <div>
                                                            <span className="d-flex">Alto consumo de energia</span>
                                                            <span className="d-flex small text-muted">Electrolux - FE22 - 173L</span>
                                                        </div>
                                                    </Col>
                                                    <Col xs={12} lg={4} className="d-flex align-items-center justify-content-center">
                                                        <div className="text-center">
                                                            <span className="d-flex small text-muted">21/05/2020 </span>
                                                            <span className="d-flex small text-muted">19:35</span>
                                                        </div>
                                                    </Col>
                                                    <Col xs={12} lg={1} className="d-flex align-items-center justify-content-end">
                                                        <Link to={"/equipamentos"} className="small">Detalhes</Link>
                                                    </Col>
                                                </Row>
                                            </Card.Body>
                                        </Card>
                                        <Card className="border-0 rounded shadow-sm mt-3">
                                            <Card.Body>
                                                <Row>
                                                    <Col xs={12} lg={7} className="d-flex align-items-center">
                                                        <div className="d-flex h-100 mr-3 rounded" style={{ width: "6px", background: "#ff8c00" }}></div>
                                                        <div>
                                                            <span className="d-flex">Aberto mais de 5 minutos</span>
                                                            <span className="d-flex small text-muted">Electrolux - FE22 - 173L</span>
                                                        </div>
                                                    </Col>
                                                    <Col xs={12} lg={4} className="d-flex align-items-center justify-content-center">
                                                        <div className="text-center">
                                                            <span className="d-flex small text-muted">21/05/2020 </span>
                                                            <span className="d-flex small text-muted">19:35</span>
                                                        </div>
                                                    </Col>
                                                    <Col xs={12} lg={1} className="d-flex align-items-center justify-content-end">
                                                        <Link to={"/equipamentos"} className="small">Detalhes</Link>
                                                    </Col>
                                                </Row>
                                            </Card.Body>
                                        </Card>
                                        <Card className="border-0 rounded shadow-sm mt-3">
                                            <Card.Body>
                                                <Row>
                                                    <Col xs={12} lg={7} className="d-flex align-items-center">
                                                        <div className="d-flex h-100 mr-3 rounded" style={{ width: "6px", background: "#0A0" }}></div>
                                                        <div>
                                                            <span className="d-flex">Economia de 15% de energia</span>
                                                            <span className="d-flex small text-muted">Electrolux - FE22 - 173L</span>
                                                        </div>
                                                    </Col>
                                                    <Col xs={12} lg={4} className="d-flex align-items-center justify-content-center">
                                                        <div className="text-center">
                                                            <span className="d-flex small text-muted">21/05/2020 </span>
                                                            <span className="d-flex small text-muted">19:35</span>
                                                        </div>
                                                    </Col>
                                                    <Col xs={12} lg={1} className="d-flex align-items-center justify-content-end">
                                                        <Link to={"/equipamentos"} className="small">Detalhes</Link>
                                                    </Col>
                                                </Row>
                                            </Card.Body>
                                        </Card>
                                        <Card className="border-0 rounded shadow-sm mt-3">
                                            <Card.Body>
                                                <Row>
                                                    <Col xs={12} lg={7} className="d-flex align-items-center">
                                                        <div className="d-flex h-100 mr-3 rounded" style={{ width: "6px", background: "#A00" }}></div>
                                                        <div>
                                                            <span className="d-flex">Alto consumo de energia</span>
                                                            <span className="d-flex small text-muted">Electrolux - FE22 - 173L</span>
                                                        </div>
                                                    </Col>
                                                    <Col xs={12} lg={4} className="d-flex align-items-center justify-content-center">
                                                        <div className="text-center">
                                                            <span className="d-flex small text-muted">21/05/2020 </span>
                                                            <span className="d-flex small text-muted">19:35</span>
                                                        </div>
                                                    </Col>
                                                    <Col xs={12} lg={1} className="d-flex align-items-center justify-content-end">
                                                        <Link to={"/equipamentos"} className="small">Detalhes</Link>
                                                    </Col>
                                                </Row>
                                            </Card.Body>
                                        </Card>
                                        <Card className="border-0 rounded shadow-sm mt-3">
                                            <Card.Body>
                                                <Row>
                                                    <Col xs={12} lg={7} className="d-flex align-items-center">
                                                        <div className="d-flex h-100 mr-3 rounded" style={{ width: "6px", background: "#A00" }}></div>
                                                        <div>
                                                            <span className="d-flex">Alto consumo de energia</span>
                                                            <span className="d-flex small text-muted">Electrolux - FE22 - 173L</span>
                                                        </div>
                                                    </Col>
                                                    <Col xs={12} lg={4} className="d-flex align-items-center justify-content-center">
                                                        <div className="text-center">
                                                            <span className="d-flex small text-muted">21/05/2020 </span>
                                                            <span className="d-flex small text-muted">19:35</span>
                                                        </div>
                                                    </Col>
                                                    <Col xs={12} lg={1} className="d-flex align-items-center justify-content-end">
                                                        <Link to={"/equipamentos"} className="small">Detalhes</Link>
                                                    </Col>
                                                </Row>
                                            </Card.Body>
                                        </Card>
                                        <Card className="border-0 rounded shadow-sm mt-3">
                                            <Card.Body>
                                                <Row>
                                                    <Col xs={12} lg={9} className="d-flex align-items-center">
                                                        <div className="d-flex h-100 mr-3 rounded" style={{ width: "6px", background: "#A00" }}></div>
                                                        <div>
                                                            <span className="d-flex">Alto consumo de energia</span>
                                                            <span className="d-flex small text-muted">Electrolux - FE22 - 173L</span>
                                                        </div>
                                                    </Col>
                                                    <Col xs={12} lg={3} className="d-flex align-items-center justify-content-end">
                                                        <Link to={"/equipamentos"} className="small">Detalhes</Link>
                                                    </Col>
                                                </Row>
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                        <Row className="mb-3">
                            <Col xs={12}>
                                <h6 className="mb-0">Consumo total</h6>
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={12}>
                                <Table size="sm" responsive className="text-center">
                                    <thead>
                                        <tr>
                                            <th className="border-0 py-2"></th>
                                            <th className="border-0 py-2">Janeiro</th>
                                            <th className="border-0 py-2">Fevereiro</th>
                                            <th className="border-0 py-2">Março</th>
                                            <th className="border-0 py-2">Abril</th>
                                            <th className="border-0 py-2">Maio</th>
                                            <th className="border-0 py-2">Junho</th>
                                            <th className="border-0 py-2">Julho</th>
                                            <th className="border-0 py-2">Agosto</th>
                                            <th className="border-0 py-2">Setembro</th>
                                            <th className="border-0 py-2">Outubro</th>
                                            <th className="border-0 py-2">Novembro</th>
                                            <th className="border-0 py-2">Dezembro</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {[
                                            { day: "01", jan: Math.floor(Math.random() * 1000), fev: Math.floor(Math.random() * 1000), mar: Math.floor(Math.random() * 1000), abr: Math.floor(Math.random() * 1000), mai: Math.floor(Math.random() * 1000), jun: Math.floor(Math.random() * 1000), jul: Math.floor(Math.random() * 1000), ago: Math.floor(Math.random() * 1000), set: Math.floor(Math.random() * 1000), out: Math.floor(Math.random() * 1000), nov: Math.floor(Math.random() * 1000), dez: Math.floor(Math.random() * 1000) },
                                            { day: "02", jan: Math.floor(Math.random() * 1000), fev: Math.floor(Math.random() * 1000), mar: Math.floor(Math.random() * 1000), abr: Math.floor(Math.random() * 1000), mai: Math.floor(Math.random() * 1000), jun: Math.floor(Math.random() * 1000), jul: Math.floor(Math.random() * 1000), ago: Math.floor(Math.random() * 1000), set: Math.floor(Math.random() * 1000), out: Math.floor(Math.random() * 1000), nov: Math.floor(Math.random() * 1000), dez: Math.floor(Math.random() * 1000) },
                                            { day: "03", jan: Math.floor(Math.random() * 1000), fev: Math.floor(Math.random() * 1000), mar: Math.floor(Math.random() * 1000), abr: Math.floor(Math.random() * 1000), mai: Math.floor(Math.random() * 1000), jun: Math.floor(Math.random() * 1000), jul: Math.floor(Math.random() * 1000), ago: Math.floor(Math.random() * 1000), set: Math.floor(Math.random() * 1000), out: Math.floor(Math.random() * 1000), nov: Math.floor(Math.random() * 1000), dez: Math.floor(Math.random() * 1000) },
                                            { day: "04", jan: Math.floor(Math.random() * 1000), fev: Math.floor(Math.random() * 1000), mar: Math.floor(Math.random() * 1000), abr: Math.floor(Math.random() * 1000), mai: Math.floor(Math.random() * 1000), jun: Math.floor(Math.random() * 1000), jul: Math.floor(Math.random() * 1000), ago: Math.floor(Math.random() * 1000), set: Math.floor(Math.random() * 1000), out: Math.floor(Math.random() * 1000), nov: Math.floor(Math.random() * 1000), dez: Math.floor(Math.random() * 1000) },
                                            { day: "05", jan: Math.floor(Math.random() * 1000), fev: Math.floor(Math.random() * 1000), mar: Math.floor(Math.random() * 1000), abr: Math.floor(Math.random() * 1000), mai: Math.floor(Math.random() * 1000), jun: Math.floor(Math.random() * 1000), jul: Math.floor(Math.random() * 1000), ago: Math.floor(Math.random() * 1000), set: Math.floor(Math.random() * 1000), out: Math.floor(Math.random() * 1000), nov: Math.floor(Math.random() * 1000), dez: Math.floor(Math.random() * 1000) },
                                            { day: "06", jan: Math.floor(Math.random() * 1000), fev: Math.floor(Math.random() * 1000), mar: Math.floor(Math.random() * 1000), abr: Math.floor(Math.random() * 1000), mai: Math.floor(Math.random() * 1000), jun: Math.floor(Math.random() * 1000), jul: Math.floor(Math.random() * 1000), ago: Math.floor(Math.random() * 1000), set: Math.floor(Math.random() * 1000), out: Math.floor(Math.random() * 1000), nov: Math.floor(Math.random() * 1000), dez: Math.floor(Math.random() * 1000) },
                                            { day: "07", jan: Math.floor(Math.random() * 1000), fev: Math.floor(Math.random() * 1000), mar: Math.floor(Math.random() * 1000), abr: Math.floor(Math.random() * 1000), mai: Math.floor(Math.random() * 1000), jun: Math.floor(Math.random() * 1000), jul: Math.floor(Math.random() * 1000), ago: Math.floor(Math.random() * 1000), set: Math.floor(Math.random() * 1000), out: Math.floor(Math.random() * 1000), nov: Math.floor(Math.random() * 1000), dez: Math.floor(Math.random() * 1000) },
                                            { day: "08", jan: Math.floor(Math.random() * 1000), fev: Math.floor(Math.random() * 1000), mar: Math.floor(Math.random() * 1000), abr: Math.floor(Math.random() * 1000), mai: Math.floor(Math.random() * 1000), jun: Math.floor(Math.random() * 1000), jul: Math.floor(Math.random() * 1000), ago: Math.floor(Math.random() * 1000), set: Math.floor(Math.random() * 1000), out: Math.floor(Math.random() * 1000), nov: Math.floor(Math.random() * 1000), dez: Math.floor(Math.random() * 1000) },
                                            { day: "09", jan: Math.floor(Math.random() * 1000), fev: Math.floor(Math.random() * 1000), mar: Math.floor(Math.random() * 1000), abr: Math.floor(Math.random() * 1000), mai: Math.floor(Math.random() * 1000), jun: Math.floor(Math.random() * 1000), jul: Math.floor(Math.random() * 1000), ago: Math.floor(Math.random() * 1000), set: Math.floor(Math.random() * 1000), out: Math.floor(Math.random() * 1000), nov: Math.floor(Math.random() * 1000), dez: Math.floor(Math.random() * 1000) },
                                            { day: "10", jan: Math.floor(Math.random() * 1000), fev: Math.floor(Math.random() * 1000), mar: Math.floor(Math.random() * 1000), abr: Math.floor(Math.random() * 1000), mai: Math.floor(Math.random() * 1000), jun: Math.floor(Math.random() * 1000), jul: Math.floor(Math.random() * 1000), ago: Math.floor(Math.random() * 1000), set: Math.floor(Math.random() * 1000), out: Math.floor(Math.random() * 1000), nov: Math.floor(Math.random() * 1000), dez: Math.floor(Math.random() * 1000) },
                                            { day: "11", jan: Math.floor(Math.random() * 1000), fev: Math.floor(Math.random() * 1000), mar: Math.floor(Math.random() * 1000), abr: Math.floor(Math.random() * 1000), mai: Math.floor(Math.random() * 1000), jun: Math.floor(Math.random() * 1000), jul: Math.floor(Math.random() * 1000), ago: Math.floor(Math.random() * 1000), set: Math.floor(Math.random() * 1000), out: Math.floor(Math.random() * 1000), nov: Math.floor(Math.random() * 1000), dez: Math.floor(Math.random() * 1000) },
                                            { day: "12", jan: Math.floor(Math.random() * 1000), fev: Math.floor(Math.random() * 1000), mar: Math.floor(Math.random() * 1000), abr: Math.floor(Math.random() * 1000), mai: Math.floor(Math.random() * 1000), jun: Math.floor(Math.random() * 1000), jul: Math.floor(Math.random() * 1000), ago: Math.floor(Math.random() * 1000), set: Math.floor(Math.random() * 1000), out: Math.floor(Math.random() * 1000), nov: Math.floor(Math.random() * 1000), dez: Math.floor(Math.random() * 1000) },
                                            { day: "13", jan: Math.floor(Math.random() * 1000), fev: Math.floor(Math.random() * 1000), mar: Math.floor(Math.random() * 1000), abr: Math.floor(Math.random() * 1000), mai: Math.floor(Math.random() * 1000), jun: Math.floor(Math.random() * 1000), jul: Math.floor(Math.random() * 1000), ago: Math.floor(Math.random() * 1000), set: Math.floor(Math.random() * 1000), out: Math.floor(Math.random() * 1000), nov: Math.floor(Math.random() * 1000), dez: Math.floor(Math.random() * 1000) },
                                            { day: "14", jan: Math.floor(Math.random() * 1000), fev: Math.floor(Math.random() * 1000), mar: Math.floor(Math.random() * 1000), abr: Math.floor(Math.random() * 1000), mai: Math.floor(Math.random() * 1000), jun: Math.floor(Math.random() * 1000), jul: Math.floor(Math.random() * 1000), ago: Math.floor(Math.random() * 1000), set: Math.floor(Math.random() * 1000), out: Math.floor(Math.random() * 1000), nov: Math.floor(Math.random() * 1000), dez: Math.floor(Math.random() * 1000) },
                                            { day: "15", jan: Math.floor(Math.random() * 1000), fev: Math.floor(Math.random() * 1000), mar: Math.floor(Math.random() * 1000), abr: Math.floor(Math.random() * 1000), mai: Math.floor(Math.random() * 1000), jun: Math.floor(Math.random() * 1000), jul: Math.floor(Math.random() * 1000), ago: Math.floor(Math.random() * 1000), set: Math.floor(Math.random() * 1000), out: Math.floor(Math.random() * 1000), nov: Math.floor(Math.random() * 1000), dez: Math.floor(Math.random() * 1000) },
                                            { day: "16", jan: Math.floor(Math.random() * 1000), fev: Math.floor(Math.random() * 1000), mar: Math.floor(Math.random() * 1000), abr: Math.floor(Math.random() * 1000), mai: Math.floor(Math.random() * 1000), jun: Math.floor(Math.random() * 1000), jul: Math.floor(Math.random() * 1000), ago: Math.floor(Math.random() * 1000), set: Math.floor(Math.random() * 1000), out: Math.floor(Math.random() * 1000), nov: Math.floor(Math.random() * 1000), dez: Math.floor(Math.random() * 1000) },
                                            { day: "17", jan: Math.floor(Math.random() * 1000), fev: Math.floor(Math.random() * 1000), mar: Math.floor(Math.random() * 1000), abr: Math.floor(Math.random() * 1000), mai: Math.floor(Math.random() * 1000), jun: Math.floor(Math.random() * 1000), jul: Math.floor(Math.random() * 1000), ago: Math.floor(Math.random() * 1000), set: Math.floor(Math.random() * 1000), out: Math.floor(Math.random() * 1000), nov: Math.floor(Math.random() * 1000), dez: Math.floor(Math.random() * 1000) },
                                            { day: "18", jan: Math.floor(Math.random() * 1000), fev: Math.floor(Math.random() * 1000), mar: Math.floor(Math.random() * 1000), abr: Math.floor(Math.random() * 1000), mai: Math.floor(Math.random() * 1000), jun: Math.floor(Math.random() * 1000), jul: Math.floor(Math.random() * 1000), ago: Math.floor(Math.random() * 1000), set: Math.floor(Math.random() * 1000), out: Math.floor(Math.random() * 1000), nov: Math.floor(Math.random() * 1000), dez: Math.floor(Math.random() * 1000) },
                                            { day: "19", jan: Math.floor(Math.random() * 1000), fev: Math.floor(Math.random() * 1000), mar: Math.floor(Math.random() * 1000), abr: Math.floor(Math.random() * 1000), mai: Math.floor(Math.random() * 1000), jun: Math.floor(Math.random() * 1000), jul: Math.floor(Math.random() * 1000), ago: Math.floor(Math.random() * 1000), set: Math.floor(Math.random() * 1000), out: Math.floor(Math.random() * 1000), nov: Math.floor(Math.random() * 1000), dez: Math.floor(Math.random() * 1000) },
                                            { day: "20", jan: Math.floor(Math.random() * 1000), fev: Math.floor(Math.random() * 1000), mar: Math.floor(Math.random() * 1000), abr: Math.floor(Math.random() * 1000), mai: Math.floor(Math.random() * 1000), jun: Math.floor(Math.random() * 1000), jul: Math.floor(Math.random() * 1000), ago: Math.floor(Math.random() * 1000), set: Math.floor(Math.random() * 1000), out: Math.floor(Math.random() * 1000), nov: Math.floor(Math.random() * 1000), dez: Math.floor(Math.random() * 1000) },
                                            { day: "21", jan: Math.floor(Math.random() * 1000), fev: Math.floor(Math.random() * 1000), mar: Math.floor(Math.random() * 1000), abr: Math.floor(Math.random() * 1000), mai: Math.floor(Math.random() * 1000), jun: Math.floor(Math.random() * 1000), jul: Math.floor(Math.random() * 1000), ago: Math.floor(Math.random() * 1000), set: Math.floor(Math.random() * 1000), out: Math.floor(Math.random() * 1000), nov: Math.floor(Math.random() * 1000), dez: Math.floor(Math.random() * 1000) },
                                            { day: "22", jan: Math.floor(Math.random() * 1000), fev: Math.floor(Math.random() * 1000), mar: Math.floor(Math.random() * 1000), abr: Math.floor(Math.random() * 1000), mai: Math.floor(Math.random() * 1000), jun: Math.floor(Math.random() * 1000), jul: Math.floor(Math.random() * 1000), ago: Math.floor(Math.random() * 1000), set: Math.floor(Math.random() * 1000), out: Math.floor(Math.random() * 1000), nov: Math.floor(Math.random() * 1000), dez: Math.floor(Math.random() * 1000) },
                                            { day: "23", jan: Math.floor(Math.random() * 1000), fev: Math.floor(Math.random() * 1000), mar: Math.floor(Math.random() * 1000), abr: Math.floor(Math.random() * 1000), mai: Math.floor(Math.random() * 1000), jun: Math.floor(Math.random() * 1000), jul: Math.floor(Math.random() * 1000), ago: Math.floor(Math.random() * 1000), set: Math.floor(Math.random() * 1000), out: Math.floor(Math.random() * 1000), nov: Math.floor(Math.random() * 1000), dez: Math.floor(Math.random() * 1000) },
                                            { day: "24", jan: Math.floor(Math.random() * 1000), fev: Math.floor(Math.random() * 1000), mar: Math.floor(Math.random() * 1000), abr: Math.floor(Math.random() * 1000), mai: Math.floor(Math.random() * 1000), jun: Math.floor(Math.random() * 1000), jul: Math.floor(Math.random() * 1000), ago: Math.floor(Math.random() * 1000), set: Math.floor(Math.random() * 1000), out: Math.floor(Math.random() * 1000), nov: Math.floor(Math.random() * 1000), dez: Math.floor(Math.random() * 1000) },
                                            { day: "25", jan: Math.floor(Math.random() * 1000), fev: Math.floor(Math.random() * 1000), mar: Math.floor(Math.random() * 1000), abr: Math.floor(Math.random() * 1000), mai: Math.floor(Math.random() * 1000), jun: Math.floor(Math.random() * 1000), jul: Math.floor(Math.random() * 1000), ago: Math.floor(Math.random() * 1000), set: Math.floor(Math.random() * 1000), out: Math.floor(Math.random() * 1000), nov: Math.floor(Math.random() * 1000), dez: Math.floor(Math.random() * 1000) },
                                            { day: "26", jan: Math.floor(Math.random() * 1000), fev: Math.floor(Math.random() * 1000), mar: Math.floor(Math.random() * 1000), abr: Math.floor(Math.random() * 1000), mai: Math.floor(Math.random() * 1000), jun: Math.floor(Math.random() * 1000), jul: Math.floor(Math.random() * 1000), ago: Math.floor(Math.random() * 1000), set: Math.floor(Math.random() * 1000), out: Math.floor(Math.random() * 1000), nov: Math.floor(Math.random() * 1000), dez: Math.floor(Math.random() * 1000) },
                                            { day: "27", jan: Math.floor(Math.random() * 1000), fev: Math.floor(Math.random() * 1000), mar: Math.floor(Math.random() * 1000), abr: Math.floor(Math.random() * 1000), mai: Math.floor(Math.random() * 1000), jun: Math.floor(Math.random() * 1000), jul: Math.floor(Math.random() * 1000), ago: Math.floor(Math.random() * 1000), set: Math.floor(Math.random() * 1000), out: Math.floor(Math.random() * 1000), nov: Math.floor(Math.random() * 1000), dez: Math.floor(Math.random() * 1000) },
                                            { day: "28", jan: Math.floor(Math.random() * 1000), fev: Math.floor(Math.random() * 1000), mar: Math.floor(Math.random() * 1000), abr: Math.floor(Math.random() * 1000), mai: Math.floor(Math.random() * 1000), jun: Math.floor(Math.random() * 1000), jul: Math.floor(Math.random() * 1000), ago: Math.floor(Math.random() * 1000), set: Math.floor(Math.random() * 1000), out: Math.floor(Math.random() * 1000), nov: Math.floor(Math.random() * 1000), dez: Math.floor(Math.random() * 1000) },
                                            { day: "29", jan: Math.floor(Math.random() * 1000), fev: "-", mar: Math.floor(Math.random() * 1000), abr: Math.floor(Math.random() * 1000), mai: Math.floor(Math.random() * 1000), jun: Math.floor(Math.random() * 1000), jul: Math.floor(Math.random() * 1000), ago: Math.floor(Math.random() * 1000), set: Math.floor(Math.random() * 1000), out: Math.floor(Math.random() * 1000), nov: Math.floor(Math.random() * 1000), dez: Math.floor(Math.random() * 1000) },
                                            { day: "30", jan: Math.floor(Math.random() * 1000), fev: "-", mar: Math.floor(Math.random() * 1000), abr: Math.floor(Math.random() * 1000), mai: Math.floor(Math.random() * 1000), jun: Math.floor(Math.random() * 1000), jul: Math.floor(Math.random() * 1000), ago: Math.floor(Math.random() * 1000), set: Math.floor(Math.random() * 1000), out: Math.floor(Math.random() * 1000), nov: Math.floor(Math.random() * 1000), dez: Math.floor(Math.random() * 1000) },
                                            { day: "31", jan: Math.floor(Math.random() * 1000), fev: "-", mar: Math.floor(Math.random() * 1000), abr: "-", mai: Math.floor(Math.random() * 1000), jun: "-", jul: Math.floor(Math.random() * 1000), ago: Math.floor(Math.random() * 1000), set: "-", out: Math.floor(Math.random() * 1000), nov: "-", dez: Math.floor(Math.random() * 1000) },
                                        ].map((item, index) => (
                                            <tr key={index}>
                                                <th className="border-0 py-2">{item.day}</th>
                                                <td className="small border-0 py-2" style={{ verticalAlign: "middle", background: this.generateColor(item.jan) }}>{(item.jan !== "-") ? <strong>{item.jan} kWh</strong> : "-"}</td>
                                                <td className="small border-0 py-2" style={{ verticalAlign: "middle", background: this.generateColor(item.fev) }}>{(item.fev !== "-") ? <strong>{item.fev} kWh</strong> : "-"}</td>
                                                <td className="small border-0 py-2" style={{ verticalAlign: "middle", background: this.generateColor(item.mar) }}>{(item.mar !== "-") ? <strong>{item.mar} kWh</strong> : "-"}</td>
                                                <td className="small border-0 py-2" style={{ verticalAlign: "middle", background: this.generateColor(item.abr) }}>{(item.abr !== "-") ? <strong>{item.abr} kWh</strong> : "-"}</td>
                                                <td className="small border-0 py-2" style={{ verticalAlign: "middle", background: this.generateColor(item.mai) }}>{(item.mai !== "-") ? <strong>{item.mai} kWh</strong> : "-"}</td>
                                                <td className="small border-0 py-2" style={{ verticalAlign: "middle", background: this.generateColor(item.jun) }}>{(item.jun !== "-") ? <strong>{item.jun} kWh</strong> : "-"}</td>
                                                <td className="small border-0 py-2" style={{ verticalAlign: "middle", background: this.generateColor(item.jul) }}>{(item.jul !== "-") ? <strong>{item.jul} kWh</strong> : "-"}</td>
                                                <td className="small border-0 py-2" style={{ verticalAlign: "middle", background: this.generateColor(item.ago) }}>{(item.ago !== "-") ? <strong>{item.ago} kWh</strong> : "-"}</td>
                                                <td className="small border-0 py-2" style={{ verticalAlign: "middle", background: this.generateColor(item.set) }}>{(item.set !== "-") ? <strong>{item.set} kWh</strong> : "-"}</td>
                                                <td className="small border-0 py-2" style={{ verticalAlign: "middle", background: this.generateColor(item.out) }}>{(item.out !== "-") ? <strong>{item.out} kWh</strong> : "-"}</td>
                                                <td className="small border-0 py-2" style={{ verticalAlign: "middle", background: this.generateColor(item.nov) }}>{(item.nov !== "-") ? <strong>{item.nov} kWh</strong> : "-"}</td>
                                                <td className="small border-0 py-2" style={{ verticalAlign: "middle", background: this.generateColor(item.dez) }}>{(item.dez !== "-") ? <strong>{item.dez} kWh</strong> : "-"}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </Table>
                            </Col>
                        </Row>
                    </Container>
                </Layout>
            </>
        )
    }
}