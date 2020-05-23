import React, { Component } from 'react';
import { Container, Row, Col, Card, Image } from "react-bootstrap";
import Layout from '../../components/Layout';
import Header from '../../components/Header';
import Widget from "../../components/Widget";
import IconPowerBattery from "../../assets/img/power_battery.svg";
import IconFreezer from "../../assets/img/freezer.svg";
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { Link } from 'react-router-dom';

export default class Home extends Component {

    state = {
        email: '',
        company: '',
        user: ''
    }

    componentDidMount() {
        const email = localStorage.getItem("email");
        const user = email.split("@")[0];
        const company = localStorage.getItem("company");
        this.setState({ email, company, user });
    }

    render() {
        const { user } = this.state;

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
                    data: [90, 80, 70, 60, 50, 60, 70, 60, 50, 50, 30, 10]
                },
                {
                    name: "Economia de Energia",
                    data: [0, 10, 20, 30, 40, 30, 20, 30, 40, 40, 50, 60]
                }
            ]
        }

        return (
            <>
                <Layout>
                    <Header title={`Bem vindo, ${user}`} />
                    <Container fluid>
                        <Row>
                            <Col xs={12} lg={6}>
                                <Widget icon={IconFreezer} name={"Total de Equipamentos"} value={"70"} />
                            </Col>
                            <Col xs={12} lg={6}>
                                <Widget icon={IconPowerBattery} name={"Consumo no Mês"} value={"5000 kWh"} />
                            </Col>
                        </Row>
                        <Row className="mb-4">
                            <Col xs={12} lg={6}>
                                <Card className="border-0 rounded shadow-sm h-100">
                                    <Card.Body>
                                        <HighchartsReact
                                            highcharts={Highcharts}
                                            options={options}
                                        />
                                    </Card.Body>
                                </Card>
                            </Col>
                            <Col xs={12} lg={6} className="mt-5 mt-lg-0">
                                <Row className="mb-3">
                                    <Col xs={6} className="">
                                        <h6 className="mb-0">Alertas</h6>
                                    </Col>
                                    <Col xs={6} className="text-right">
                                        <Link to={"#"} className="small mr-1 mb-0">Ver mais</Link>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col xs={12} className="mb-3">
                                        <Card className="border-0 rounded shadow-sm">
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
                                                        <Link to={"/equipamentos"} className="small">Ver equipamento</Link>
                                                    </Col>
                                                </Row>
                                            </Card.Body>
                                        </Card>
                                        <Card className="border-0 rounded shadow-sm">
                                            <Card.Body>
                                                <Row>
                                                    <Col xs={12} lg={9} className="d-flex align-items-center">
                                                        <div className="d-flex h-100 mr-3 rounded" style={{ width: "6px", background: "#ff8c00" }}></div>
                                                        <div>
                                                            <span className="d-flex">Equipamento aberto mais de 5 minutos</span>
                                                            <span className="d-flex small text-muted">Electrolux - FE22 - 173L</span>
                                                        </div>
                                                    </Col>
                                                    <Col xs={12} lg={3} className="d-flex align-items-center justify-content-end">
                                                        <Link to={"/equipamentos"} className="small">Ver equipamento</Link>
                                                    </Col>
                                                </Row>
                                            </Card.Body>
                                        </Card>
                                        <Card className="border-0 rounded shadow-sm">
                                            <Card.Body>
                                                <Row>
                                                    <Col xs={12} lg={9} className="d-flex align-items-center">
                                                        <div className="d-flex h-100 mr-3 rounded" style={{ width: "6px", background: "#0A0" }}></div>
                                                        <div>
                                                            <span className="d-flex">Economia de 15% de energia</span>
                                                            <span className="d-flex small text-muted">Electrolux - FE22 - 173L</span>
                                                        </div>
                                                    </Col>
                                                    <Col xs={12} lg={3} className="d-flex align-items-center justify-content-end">
                                                        <Link to={"/equipamentos"} className="small">Ver equipamento</Link>
                                                    </Col>
                                                </Row>
                                            </Card.Body>
                                        </Card>
                                        <Card className="border-0 rounded shadow-sm">
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
                                                        <Link to={"/equipamentos"} className="small">Ver equipamento</Link>
                                                    </Col>
                                                </Row>
                                            </Card.Body>
                                        </Card>
                                        <Card className="border-0 rounded shadow-sm">
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
                                                        <Link to={"/equipamentos"} className="small">Ver equipamento</Link>
                                                    </Col>
                                                </Row>
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={12} className="mb-3">
                                <h6 className="mb-0">Equipamentos</h6>
                            </Col>
                            <Col xs={12}>
                                <Card className="border-0 rounded shadow-sm">
                                    <Card.Body>
                                        <Row className="border-bottom border-grey py-3">
                                            <Col xs={3} lg={1} className="d-flex align-items-center justify-content-start">
                                                <Image src={IconFreezer} width="50" />
                                            </Col>
                                            <Col xs={9} lg={4} className="d-flex align-items-center justify-content-start mb-lg-0 mb-2">
                                                <div className="d-flex align-items-start justify-content-center flex-column">
                                                    <h6 className="mb-0">Freezer Vertical</h6>
                                                    <p className="mb-0 small">Consumo no Mês: 80 kWh</p>
                                                </div>
                                            </Col>
                                            <Col xs={9} lg={4} className="d-flex align-items-center justify-content-start mb-lg-0 mb-2 offset-3 offset-lg-0">
                                                <div className="d-flex align-items-start justify-content-center flex-column">
                                                    <h6 className="mb-0">Electrolux</h6>
                                                    <p className="mb-0 small">FE22 - 173L</p>
                                                </div>
                                            </Col>
                                            <Col xs={12} lg={3} className="d-flex align-items-center justify-content-end">
                                                <div className="d-flex align-items-start justify-content-center">
                                                    <Link to={"/equipamentos"} className="small">Ver equipamento</Link>
                                                </div>
                                            </Col>
                                        </Row>
                                        <Row className="border-bottom border-grey py-3">
                                            <Col xs={3} lg={1} className="d-flex align-items-center justify-content-start">
                                                <Image src={IconFreezer} width="50" />
                                            </Col>
                                            <Col xs={9} lg={4} className="d-flex align-items-center justify-content-start mb-lg-0 mb-2">
                                                <div className="d-flex align-items-start justify-content-center flex-column">
                                                    <h6 className="mb-0">Freezer Vertical</h6>
                                                    <p className="mb-0 small">Consumo no Mês: 80 kWh</p>
                                                </div>
                                            </Col>
                                            <Col xs={9} lg={4} className="d-flex align-items-center justify-content-start mb-lg-0 mb-2 offset-3 offset-lg-0">
                                                <div className="d-flex align-items-start justify-content-center flex-column">
                                                    <h6 className="mb-0">Electrolux</h6>
                                                    <p className="mb-0 small">FE22 - 173L</p>
                                                </div>
                                            </Col>
                                            <Col xs={12} lg={3} className="d-flex align-items-center justify-content-end">
                                                <div className="d-flex align-items-start justify-content-center">
                                                    <Link to={"/equipamentos"} className="small">Ver equipamento</Link>
                                                </div>
                                            </Col>
                                        </Row>
                                        <Row className="border-bottom border-grey py-3">
                                            <Col xs={3} lg={1} className="d-flex align-items-center justify-content-start">
                                                <Image src={IconFreezer} width="50" />
                                            </Col>
                                            <Col xs={9} lg={4} className="d-flex align-items-center justify-content-start mb-lg-0 mb-2">
                                                <div className="d-flex align-items-start justify-content-center flex-column">
                                                    <h6 className="mb-0">Freezer Vertical</h6>
                                                    <p className="mb-0 small">Consumo no Mês: 80 kWh</p>
                                                </div>
                                            </Col>
                                            <Col xs={9} lg={4} className="d-flex align-items-center justify-content-start mb-lg-0 mb-2 offset-3 offset-lg-0">
                                                <div className="d-flex align-items-start justify-content-center flex-column">
                                                    <h6 className="mb-0">Electrolux</h6>
                                                    <p className="mb-0 small">FE22 - 173L</p>
                                                </div>
                                            </Col>
                                            <Col xs={12} lg={3} className="d-flex align-items-center justify-content-end">
                                                <div className="d-flex align-items-start justify-content-center">
                                                    <Link to={"/equipamentos"} className="small">Ver equipamento</Link>
                                                </div>
                                            </Col>
                                        </Row>
                                        <Row className="pt-3">
                                            <Col xs={12} className="d-flex align-items-center justify-content-end">
                                                <Link to={"/equipamentos"} className="small">Ver todos</Link>
                                            </Col>
                                        </Row>
                                    </Card.Body>
                                </Card>
                            </Col>
                        </Row>
                    </Container>
                </Layout>
            </>
        )
    }
}