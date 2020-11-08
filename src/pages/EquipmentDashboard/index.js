import React, { Component } from 'react';
import { Container, Row, Col, Card, Table, Image } from "react-bootstrap";
import Layout from '../../components/Layout';
import Header from '../../components/Header';
import Widget from '../../components/Widget';
import CardList from '../../components/CardList';
// import IconPowerBattery from "../../assets/img/power_battery.svg";
import IconFreezer from "../../assets/img/freezer.svg";
import Alert from '../../components/Alert';
import api from '../../config/api';
import io from "socket.io-client";
import { Link } from "react-router-dom";
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
require('dotenv').config();

export default class EquipmentDashboard extends Component {

    state = {
        equipment: [],
        month: ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez",],
        notifications: [],
        dataChart: [],
        dataChartPrice: [],
        m1: [], m2: [], m3: [], m4: [], m5: [], m6: [], m7: [], m8: [], m9: [], m10: [], m11: [], m12: [],
    }

    componentDidMount() {
        this.getEquipment();
        this.getMeasurement();
        this.registerToSocket();
    }

    getEquipment = async () => {
        const { id } = this.props.match.params;
        const response = await api.get(`/equipment/${id}`);
        this.setState({ equipment: response.data });
        this.getNotifications();
    }

    getMeasurement = async () => {
        const { id } = this.props.match.params;
        const response = await api.get(`/measurement/${id}`);
        this.setState({ measurements: response.data });
        this.createChart();
        this.generateMaph();
    };

    createChart = () => {
        const { measurements = [], month } = this.state;
        const dataChart = [], dataChartPrice = [];
        for (let i = 0; i < month.length; i++) {
            const items = measurements.filter(item => new Date(item.date).getMonth() === i && new Date(item.date).getFullYear() === new Date().getFullYear());
            let total = 0;
            for (let j = 0; j < items.length; j++) {
                total += items[j].power;
            }
            const consumption = (((parseFloat(total) / items.length) * 720) / 1000);
            dataChart.push((isNaN(consumption)) ? 0 : parseInt(consumption));
            dataChartPrice.push(consumption * 0.518);
        }
        this.setState({ dataChart, dataChartPrice });
    }

    registerToSocket = async () => {
        const socket = io(`${process.env.REACT_APP_API_URL}`);

        socket.on("notification", (newNotification) => {
            const { equipment } = this.state;
            if (newNotification.serial === parseInt(equipment.serial)) {
                this.setState({
                    notifications: [newNotification, ...this.state.notifications],
                });
            }
        });
    };

    getNotifications = async () => {
        const { equipment } = this.state;
        const response = await api.get("/notification");
        const { data = [] } = response;
        this.setState({ notifications: data.filter(item => item.serial === equipment.serial) });
    };

    generateMaph = () => {
        const m1 = [], m2 = [], m3 = [], m4 = [], m5 = [], m6 = [], m7 = [], m8 = [], m9 = [], m10 = [], m11 = [], m12 = [];
        const { measurements = [] } = this.state;
        for (let i = 0; i < 31; i++) {
            m1.push(this.calcularConsumo(measurements.filter(item => new Date(item.date).getDate() === i && new Date(item.date).getMonth() === 0)));
            m2.push(this.calcularConsumo(measurements.filter(item => new Date(item.date).getDate() === i && new Date(item.date).getMonth() === 1)));
            m3.push(this.calcularConsumo(measurements.filter(item => new Date(item.date).getDate() === i && new Date(item.date).getMonth() === 2)));
            m4.push(this.calcularConsumo(measurements.filter(item => new Date(item.date).getDate() === i && new Date(item.date).getMonth() === 3)));
            m5.push(this.calcularConsumo(measurements.filter(item => new Date(item.date).getDate() === i && new Date(item.date).getMonth() === 4)));
            m6.push(this.calcularConsumo(measurements.filter(item => new Date(item.date).getDate() === i && new Date(item.date).getMonth() === 5)));
            m7.push(this.calcularConsumo(measurements.filter(item => new Date(item.date).getDate() === i && new Date(item.date).getMonth() === 6)));
            m8.push(this.calcularConsumo(measurements.filter(item => new Date(item.date).getDate() === i && new Date(item.date).getMonth() === 7)));
            m9.push(this.calcularConsumo(measurements.filter(item => new Date(item.date).getDate() === i && new Date(item.date).getMonth() === 8)));
            m10.push(this.calcularConsumo(measurements.filter(item => new Date(item.date).getDate() === i && new Date(item.date).getMonth() === 9)));
            m11.push(this.calcularConsumo(measurements.filter(item => new Date(item.date).getDate() === i && new Date(item.date).getMonth() === 10)));
            m12.push(this.calcularConsumo(measurements.filter(item => new Date(item.date).getDate() === i && new Date(item.date).getMonth() === 11)));
        }
        console.log(measurements)
        this.setState({ m1, m2, m3, m4, m5, m6, m7, m8, m9, m10, m11, m12 })
    }

    calcularConsumo = (items) => {
        let total = 0;
        for (let j = 0; j < items.length; j++) {
            total += items[j].power;
        }
        const consumption = (((parseFloat(total) / items.length) * 720) / 1000);
        return (isNaN(consumption)) ? 0 : parseInt(consumption);
    }

    generateColor = value => {
        if (value === "-" || value === 0 || value === undefined) {
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
        const { equipment, notifications, month, dataChart, dataChartPrice, m1 = [], m2 = [], m3 = [], m4 = [], m5 = [], m6 = [], m7 = [], m8 = [], m9 = [], m10 = [], m11 = [], m12 = [] } = this.state;

        const options = {
            colors: ['#31b88a', '#333333'],
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
                {equipment.length === 0 ?
                    <>
                        <Layout>
                            <div className="d-flex align-items-center justify-content-center flex-column py-5">
                                <h3 className="mb-4">Equipamento não encontrado</h3>
                                <Link to={"/equipamentos"} className="btn btn-success">Voltar para equipamentos</Link>
                            </div>
                        </Layout>
                    </>
                    :
                    <>
                        <Layout>
                            <Header title={equipment.name} />
                            <Container fluid>
                                <Row className="mb-3">
                                    <Col xs={12}>
                                        <CardList>
                                            <Row>
                                                <Col xs={12} lg={2} className="text-center d-none d-lg-flex">
                                                    <Image src={IconFreezer} className="img-fluid" width="100px" />
                                                </Col>
                                                <Col xs={12} lg={10}>
                                                    <Row>
                                                        <Col xs={6} lg={3}>
                                                            <h6 className="small mb-0 text-muted">Nome</h6>
                                                            <p className="font-weight-bold">{equipment.name}</p>
                                                        </Col>
                                                        <Col xs={6} lg={3}>
                                                            <h6 className="small mb-0 text-muted">Data de Aquisição</h6>
                                                            <p className="font-weight-bold">{new Date(equipment.dateAcquisition).toLocaleDateString()}</p>
                                                        </Col>
                                                        <Col xs={6} lg={3}>
                                                            <h6 className="small mb-0 text-muted">Marca</h6>
                                                            <p className="font-weight-bold">{equipment.brand}</p>
                                                        </Col>
                                                        <Col xs={6} lg={3}>
                                                            <h6 className="small mb-0 text-muted">Modelo</h6>
                                                            <p className="font-weight-bold">{equipment.model}</p>
                                                        </Col>
                                                        <Col xs={6} lg={3}>
                                                            <h6 className="small mb-0 text-muted">Serial</h6>
                                                            <p className="font-weight-bold">{equipment.serial}</p>
                                                        </Col>
                                                        <Col xs={6} lg={3}>
                                                            <h6 className="small mb-0 text-muted">Potência</h6>
                                                            <p className="font-weight-bold">{equipment.potency}W</p>
                                                        </Col>
                                                        <Col xs={6} lg={3}>
                                                            <h6 className="small mb-0 text-muted">Tensão</h6>
                                                            <p className="font-weight-bold">{equipment.voltage}V</p>
                                                        </Col>
                                                    </Row>
                                                </Col>
                                            </Row>
                                        </CardList>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col xs={12} lg={6}>
                                        <Widget name={"Consumo no Mês (kWh)"} value={`${dataChart[new Date().getMonth()]}`} />
                                    </Col>
                                    <Col xs={12} lg={6}>
                                        <Widget name={"Custo no Mês (R$)"} value={`${(!isNaN(parseFloat(dataChartPrice[new Date().getMonth()]).toFixed(2))) ? parseFloat(dataChartPrice[new Date().getMonth()]).toFixed(2) : 0}`} />
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
                                                {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30].map((item, index) => (
                                                    <tr key={index}>
                                                        <th className="border-0 py-2">{item+1}</th>
                                                        <td className="small border-0 py-2" style={{ verticalAlign: "middle", background: this.generateColor(m1[item]) }}>{m1[item]} kWh</td>
                                                        <td className="small border-0 py-2" style={{ verticalAlign: "middle", background: this.generateColor(m2[item]) }}>{m2[item]} kWh</td>
                                                        <td className="small border-0 py-2" style={{ verticalAlign: "middle", background: this.generateColor(m3[item]) }}>{m3[item]} kWh</td>
                                                        <td className="small border-0 py-2" style={{ verticalAlign: "middle", background: this.generateColor(m4[item]) }}>{m4[item]} kWh</td>
                                                        <td className="small border-0 py-2" style={{ verticalAlign: "middle", background: this.generateColor(m5[item]) }}>{m5[item]} kWh</td>
                                                        <td className="small border-0 py-2" style={{ verticalAlign: "middle", background: this.generateColor(m6[item]) }}>{m6[item]} kWh</td>
                                                        <td className="small border-0 py-2" style={{ verticalAlign: "middle", background: this.generateColor(m7[item]) }}>{m7[item]} kWh</td>
                                                        <td className="small border-0 py-2" style={{ verticalAlign: "middle", background: this.generateColor(m8[item]) }}>{m8[item]} kWh</td>
                                                        <td className="small border-0 py-2" style={{ verticalAlign: "middle", background: this.generateColor(m9[item]) }}>{m9[item]} kWh</td>
                                                        <td className="small border-0 py-2" style={{ verticalAlign: "middle", background: this.generateColor(m10[item]) }}>{m10[item]} kWh</td>
                                                        <td className="small border-0 py-2" style={{ verticalAlign: "middle", background: this.generateColor(m11[item]) }}>{m11[item]} kWh</td>
                                                        <td className="small border-0 py-2" style={{ verticalAlign: "middle", background: this.generateColor(m12[item]) }}>{m12[item]} kWh</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </Table>
                                    </Col>
                                </Row>
                            </Container>
                        </Layout>
                    </>}
            </>
        )
    }
}