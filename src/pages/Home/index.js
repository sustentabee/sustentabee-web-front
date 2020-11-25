import React, { Component } from "react";
import { Container, Row, Col, Card, Button, Form } from "react-bootstrap";
import { decodeToken } from "../../config/auth";
import Layout from "../../components/Layout";
import Header from "../../components/Header";
import Widget from "../../components/Widget";
import api from "../../config/api";
import Alert from '../../components/Alert';
import EquipmentHome from '../../components/EquipmentHome';
import io from "socket.io-client";
import { Link } from "react-router-dom";
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import MaterialIcon from "material-icons-react";
require('dotenv').config();

export default class Home extends Component {
    state = {
        user: decodeToken(),
        month: ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez",],
        equipments: [],
        notifications: [],
        dataChart: [],
        dataChartPrice: [],
        equipment: '',
        show: false,
    };

    componentDidMount() {
        this.getNotifications();
        this.registerToSocket();
        this.getEquipments();
        this.getMeasurement();
    }

    getEquipments = async () => {
        const response = await api.get("/equipment");
        this.setState({ equipments: response.data });
    };

    getMeasurement = async () => {
        const response = await api.get("/measurement");
        this.setState({ measurements: response.data });
        this.createChart();
    };

    createChart = (equipment = this.state.equipment,) => {
        const { month } = this.state;
        let { measurements = [] } = this.state;

        if (equipment !== null && equipment !== "") {
            measurements = measurements.filter(item => item.name === equipment)
        }

        const dataChart = [], dataChartPrice = [];
        for (let i = 0; i < month.length; i++) {
            const items = measurements.filter(item => new Date(item.date).getMonth() === i && new Date(item.date).getFullYear() === new Date().getFullYear());
            let total = 0;
            for (let j = 0; j < items.length; j++) {
                total += items[j].power;
            }
            const consumption = (((parseFloat(total) / items.length) * 720) / 1000);
            dataChart.push((isNaN(consumption)) ? 0 : parseInt(consumption));
            const price = consumption * 0.8;
            dataChartPrice.push((isNaN(price)) ? 0 : parseFloat(price));
        }
        this.setState({ dataChart, dataChartPrice });
        console.log({ dataChart, dataChartPrice });
    }

    registerToSocket = async () => {
        const socket = io(`${process.env.REACT_APP_API_URL}`);

        socket.on("notification", (newNotification) => {
            this.setState({
                notifications: [newNotification, ...this.state.notifications],
            });
        });
    };

    getNotifications = async () => {
        const response = await api.get("/notification");
        this.setState({ notifications: response.data });
    };

    handleFilter = () => this.setState({ show: !this.state.show });

    filterEquipment = (event) => {
        this.setState({ [event.target.name]: event.target.value });
        this.createChart(event.target.value)
    }

    render() {
        const { user } = this.state.user;
        const { equipments, notifications, month, dataChart, dataChartPrice, equipment = '', show } = this.state;

        const options = {
            colors: ['#31b88a', '#333'],
            credits: {
                enabled: false
            },
            chart: {
                type: 'column'
            },
            title: {
                text: 'Consumo Total (kWh)'
            },
            subtitle: {
                text: ''
            },
            xAxis: {
                categories: month,
                crosshair: true
            },
            yAxis: {
                min: 0,
                title: {
                    text: ''
                }
            },
            tooltip: {
                headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
                pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                    '<td style="padding:0"><b>{point.y:.1f}</b></td></tr>',
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
                    name: 'Consumo Total (kWh)',
                    data: dataChart
                },
                {
                    name: 'Custo Estimado (R$)',
                    data: dataChartPrice
                }
            ]
        }

        return (
            <>
                <Layout>
                    <Header title={`Bem vindo, ${user.name}`}>
                        <Button variant="muted" onClick={() => this.handleFilter()} className="bg-white" style={{ fontSize: "24px", lineHeight: 0 }}><MaterialIcon icon="filter_alt" /></Button>
                    </Header>
                    <Container fluid>
                        <Row className={(show) ? "d-flex mb-4" : "d-none mb-4"} >
                            <Col xs={12} >
                                <Form>
                                    <Row className="justify-content-start">
                                        <Col xs={12} lg={6}>
                                            <Form.Label className="text-muted small">Equipamento</Form.Label>
                                            <Form.Control as="select" name="equipment" value={equipment} onChange={this.filterEquipment.bind(this)} className="border-0 shadow-sm">
                                                <option value="">Nenhum</option>
                                                {equipments.map((item, index) => (
                                                    <option value={item.name} key={index}>{item.name}</option>
                                                ))}
                                            </Form.Control>
                                        </Col>
                                    </Row>
                                </Form>
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={12} lg={6}>
                                <Widget name={"Total de Equipamentos"} value={equipments.length} />
                            </Col>
                            <Col xs={12} lg={6}>
                                <Widget name={"Consumo no Mês (kWh)"} value={`${dataChart[new Date().getMonth()]}`} />
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
                                    </Card.Body>
                                </Card>
                            </Col>
                            <Col xs={12} lg={6} className="mt-5 mt-lg-0">
                                <Row className="mb-3">
                                    <Col xs={12} className="">
                                        <h6 className="mb-0">Alertas</h6>
                                    </Col>
                                </Row>
                                <Row className="home-card">
                                    <Col xs={12} className="">
                                        {notifications.map((alert, index) => {
                                            if (index < 10) {
                                                return (
                                                    <Alert alert={alert} key={index} />
                                                )
                                            }
                                            return null;
                                        })}
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                        <Row className="mb-4">
                            <Col xs={12} className="d-flex align-items-center justify-content-between mb-3">
                                <h5 className="mb-2 text-muted">Últimos equipamentos cadastrados</h5>
                                <Link to={"/equipamentos"} className="small">Ver todos</Link>
                            </Col>
                            <Col xs={12}>
                                <Row>
                                    {equipments.map(
                                        (equipment, index) => {
                                            if (index < 6) {
                                                return (
                                                    <Col xs={12} lg={4} className="mb-4" key={index}>
                                                        <EquipmentHome equipment={equipment} />
                                                    </Col>
                                                )
                                            }
                                            return null;
                                        }
                                    )}
                                </Row>
                            </Col>
                        </Row>
                    </Container>
                </Layout>
            </>
        );
    }
}
