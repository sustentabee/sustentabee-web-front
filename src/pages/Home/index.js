import React, { Component } from 'react';
import { Container, /* Row, Col, Card */ } from "react-bootstrap";
import { decodeToken } from '../../config/auth';
import Layout from '../../components/Layout';
import Header from '../../components/Header';
// import Widget from "../../components/Widget";
// import IconPowerBattery from "../../assets/img/power_battery.svg";
// import IconFreezer from "../../assets/img/freezer.svg";
// import Highcharts from 'highcharts';
// import HighchartsReact from 'highcharts-react-official';
// import { Link } from 'react-router-dom';
// import data from "../../config/data";
// import Alert from '../../components/Alert';
// import EquipmentHome from '../../components/EquipmentHome';

export default class Home extends Component {

    state = {
        user: decodeToken(),

    }

    render() {
        const { user } = this.state.user;

        // const options = {
        //     colors: ['#7FFF7F', '#333'],
        //     chart: { type: 'line' },
        //     title: {
        //         text: 'Consumo x Economia de Energia'
        //     },
        //     xAxis: { categories: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'], crosshair: true },
        //     yAxis: [{ className: 'highcharts-color-0', min: 0, title: { text: '' } }],
        //     tooltip: {
        //         headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
        //         pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
        //             '<td style="padding:0"><b> {point.y} kWh</b></td></tr>',
        //         footerFormat: '</table>',
        //         shared: true,
        //         useHTML: true
        //     },
        //     plotOptions: {
        //         column: {
        //             pointPadding: 0.2,
        //             borderWidth: 0
        //         }
        //     },
        //     series: [
        //         {
        //             name: "Consumo de Energia",
        //             data: [90, 80, 70, 60, 50, 60, 70, 60, 50, 50, 30, 10]
        //         },
        //         {
        //             name: "Economia de Energia",
        //             data: [0, 10, 20, 30, 40, 30, 20, 30, 40, 40, 50, 60]
        //         }
        //     ]
        // }

        return (
            <>
                <Layout>
                    <Header title={`Bem vindo, ${user.name}`} />
                    <Container fluid>
                        {/* <Row>
                            <Col xs={12} lg={6}>
                                <Widget icon={IconFreezer} name={"Total de Equipamentos"} value={`${data.equipments.length}`} />
                            </Col>
                            <Col xs={12} lg={6}>
                                <Widget icon={IconPowerBattery} name={"Consumo no Mês"} value={`${Math.floor(Math.random() * 100000)} kWh`} />
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
                                        <Link to={"/dashboard"} className="small mt-2">Ir para Dashboards</Link>
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
                                        {data.alerts.map((alert, index) => (
                                            <Alert alert={alert} key={index} />
                                        ))}
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
                                    <Card.Body className="home-card">
                                        {data.equipments.map((equipment, index) => (
                                            <EquipmentHome equipment={equipment} key={index} />
                                        ))}
                                    </Card.Body>
                                    <Card.Footer className="border-0 bg-white">
                                        <Row className="py-3">
                                            <Col xs={12} className="d-flex align-items-center justify-content-end">
                                                <Link to={"/equipamentos"} className="small">Ver todos</Link>
                                            </Col>
                                        </Row>
                                    </Card.Footer>
                                </Card>
                            </Col>
                        </Row> */}
                    </Container>
                </Layout>
            </>
        )
    }
}