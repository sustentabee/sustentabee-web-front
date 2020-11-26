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
        company_spectrum_arr: [],
        rangeColors: [],
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
        this.getCompanySpectrum();
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
            dataChartPrice.push(consumption * 0.8);
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
        const { rangeColors = [] } = this.state;
        for (let i = 0; i < rangeColors.length; i++) {
            if (value <= 0) {
                return "#fff";
            }
            else if (value <= rangeColors[i].value) {
                return rangeColors[i].color;
            }
        }
        return "#fff";
    }

    randomIntFromInterval = (min, max) => {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    getCompanySpectrum = async () => {
        const { estimatedConsumption } = this.state.equipment;
        const response = await api.get("/company-spectrum");
        const company_spectrum_arr = response.data;
        this.setState({ company_spectrum_arr });
        const arr = [];
        for (let i = 0; i < company_spectrum_arr.length; i++) {
            let vp = estimatedConsumption * parseFloat((company_spectrum_arr[i].percent >= 100) ? company_spectrum_arr[i].percent / 100 : "0." + company_spectrum_arr[i].percent);
            let total = (!isNaN(estimatedConsumption + vp)) ? estimatedConsumption + vp : 0;
            arr.push({ value: total, color: company_spectrum_arr[i].color })
        }
        this.setState({ rangeColors: arr });
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
                    data: (parseInt(equipment.serial) !== 1) ? dataChart : [250, 330, 400, 430, 270, 363, 420, 440, 390, 440, 500, 480]
                },
                {
                    name: 'Custo Estimado (R$)',
                    data: (parseInt(equipment.serial) !== 1) ? dataChartPrice : [150.50, 230.20, 300.00, 330.80, 170.20, 263.75, 320.27, 340.10, 290.30, 340.10, 400.50, 380.17]
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
                                        <Widget name={"Consumo no Mês (kWh)"} value={(parseInt(equipment.serial) !== 1) ? `${dataChart[new Date().getMonth()]}` : 478} />
                                    </Col>
                                    <Col xs={12} lg={6}>
                                        <Widget name={"Custo no Mês (R$)"} value={(parseInt(equipment.serial) !== 1) ? `${(!isNaN(parseFloat(dataChartPrice[new Date().getMonth()]).toFixed(2))) ? parseFloat(dataChartPrice[new Date().getMonth()]).toFixed(2) : 0}` : parseFloat(478 * 0.8).toFixed(2)} />
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
                                                {(parseInt(equipment.serial) !== 1) ?
                                                    <>
                                                        {notifications.map((alert, index) => {
                                                            if (index < 10) {
                                                                return (
                                                                    <Alert alert={alert} key={index} />
                                                                )
                                                            }
                                                            return null;
                                                        })}
                                                    </>
                                                    :
                                                    <>
                                                        <Alert alert={{ "id": 9, "serial": "1", "title": "Porta aberta mais que 15 segundos", "type": "warning", "created_at": "2020-11-19T01:15:50.058Z", "updated_at": "2020-11-19T01:15:50.058Z", "name": "Geladeira", "brand": "MARCA1", "model": "MODELO1", "equipment_id": 2 }} />
                                                        <Alert alert={{ "id": 2, "serial": "1", "title": "Temperatura interna alta", "type": "danger", "created_at": "2020-10-25T17:13:29.471Z", "updated_at": "2020-10-25T17:13:29.471Z", "name": "Geladeira", "brand": "MARCA1", "model": "MODELO1", "equipment_id": 2 }} />
                                                        <Alert alert={{ "id": 3, "serial": "1", "title": "Alto consumo de energia", "type": "danger", "created_at": "2020-10-24T17:15:30.463Z", "updated_at": "2020-10-25T17:13:29.471Z", "name": "Geladeira", "brand": "MARCA1", "model": "MODELO1", "equipment_id": 2 }} />
                                                    </>
                                                }
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
                                            {(parseInt(equipment.serial) !== 1) ?
                                                <>
                                                    <tbody>
                                                        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30].map((item, index) => (
                                                            <tr key={index}>
                                                                <th className="border-0 py-2">{item + 1}</th>
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
                                                </>
                                                :
                                                <>
                                                    <tbody>
                                                        {[
                                                            { day: "01", jan: this.randomIntFromInterval(230, 450), fev: this.randomIntFromInterval(230, 450), mar: this.randomIntFromInterval(230, 450), abr: this.randomIntFromInterval(230, 450), mai: this.randomIntFromInterval(230, 450), jun: this.randomIntFromInterval(230, 450), jul: this.randomIntFromInterval(230, 450), ago: this.randomIntFromInterval(230, 450), set: this.randomIntFromInterval(230, 450), out: this.randomIntFromInterval(230, 450), nov: this.randomIntFromInterval(230, 450), dez: this.randomIntFromInterval(230, 450) },
                                                            { day: "02", jan: this.randomIntFromInterval(230, 450), fev: this.randomIntFromInterval(230, 450), mar: this.randomIntFromInterval(230, 450), abr: this.randomIntFromInterval(230, 450), mai: this.randomIntFromInterval(230, 450), jun: this.randomIntFromInterval(230, 450), jul: this.randomIntFromInterval(230, 450), ago: this.randomIntFromInterval(230, 450), set: this.randomIntFromInterval(230, 450), out: this.randomIntFromInterval(230, 450), nov: this.randomIntFromInterval(230, 450), dez: this.randomIntFromInterval(230, 450) },
                                                            { day: "03", jan: this.randomIntFromInterval(230, 450), fev: this.randomIntFromInterval(230, 450), mar: this.randomIntFromInterval(230, 450), abr: this.randomIntFromInterval(230, 450), mai: this.randomIntFromInterval(230, 450), jun: this.randomIntFromInterval(230, 450), jul: this.randomIntFromInterval(230, 450), ago: this.randomIntFromInterval(230, 450), set: this.randomIntFromInterval(230, 450), out: this.randomIntFromInterval(230, 450), nov: this.randomIntFromInterval(230, 450), dez: this.randomIntFromInterval(230, 450) },
                                                            { day: "04", jan: this.randomIntFromInterval(230, 450), fev: this.randomIntFromInterval(230, 450), mar: this.randomIntFromInterval(230, 450), abr: this.randomIntFromInterval(230, 450), mai: this.randomIntFromInterval(230, 450), jun: this.randomIntFromInterval(230, 450), jul: this.randomIntFromInterval(230, 450), ago: this.randomIntFromInterval(230, 450), set: this.randomIntFromInterval(230, 450), out: this.randomIntFromInterval(230, 450), nov: this.randomIntFromInterval(230, 450), dez: this.randomIntFromInterval(230, 450) },
                                                            { day: "05", jan: this.randomIntFromInterval(230, 450), fev: this.randomIntFromInterval(230, 450), mar: this.randomIntFromInterval(230, 450), abr: this.randomIntFromInterval(230, 450), mai: this.randomIntFromInterval(230, 450), jun: this.randomIntFromInterval(230, 450), jul: this.randomIntFromInterval(230, 450), ago: this.randomIntFromInterval(230, 450), set: this.randomIntFromInterval(230, 450), out: this.randomIntFromInterval(230, 450), nov: this.randomIntFromInterval(230, 450), dez: this.randomIntFromInterval(230, 450) },
                                                            { day: "06", jan: this.randomIntFromInterval(230, 450), fev: this.randomIntFromInterval(230, 450), mar: this.randomIntFromInterval(230, 450), abr: this.randomIntFromInterval(230, 450), mai: this.randomIntFromInterval(230, 450), jun: this.randomIntFromInterval(230, 450), jul: this.randomIntFromInterval(230, 450), ago: this.randomIntFromInterval(230, 450), set: this.randomIntFromInterval(230, 450), out: this.randomIntFromInterval(230, 450), nov: this.randomIntFromInterval(230, 450), dez: this.randomIntFromInterval(230, 450) },
                                                            { day: "07", jan: this.randomIntFromInterval(230, 450), fev: this.randomIntFromInterval(230, 450), mar: this.randomIntFromInterval(230, 450), abr: this.randomIntFromInterval(230, 450), mai: this.randomIntFromInterval(230, 450), jun: this.randomIntFromInterval(230, 450), jul: this.randomIntFromInterval(230, 450), ago: this.randomIntFromInterval(230, 450), set: this.randomIntFromInterval(230, 450), out: this.randomIntFromInterval(230, 450), nov: this.randomIntFromInterval(230, 450), dez: this.randomIntFromInterval(230, 450) },
                                                            { day: "08", jan: this.randomIntFromInterval(230, 450), fev: this.randomIntFromInterval(230, 450), mar: this.randomIntFromInterval(230, 450), abr: this.randomIntFromInterval(230, 450), mai: this.randomIntFromInterval(230, 450), jun: this.randomIntFromInterval(230, 450), jul: this.randomIntFromInterval(230, 450), ago: this.randomIntFromInterval(230, 450), set: this.randomIntFromInterval(230, 450), out: this.randomIntFromInterval(230, 450), nov: this.randomIntFromInterval(230, 450), dez: this.randomIntFromInterval(230, 450) },
                                                            { day: "09", jan: this.randomIntFromInterval(230, 450), fev: this.randomIntFromInterval(230, 450), mar: this.randomIntFromInterval(230, 450), abr: this.randomIntFromInterval(230, 450), mai: this.randomIntFromInterval(230, 450), jun: this.randomIntFromInterval(230, 450), jul: this.randomIntFromInterval(230, 450), ago: this.randomIntFromInterval(230, 450), set: this.randomIntFromInterval(230, 450), out: this.randomIntFromInterval(230, 450), nov: this.randomIntFromInterval(230, 450), dez: this.randomIntFromInterval(230, 450) },
                                                            { day: "10", jan: this.randomIntFromInterval(230, 450), fev: this.randomIntFromInterval(230, 450), mar: this.randomIntFromInterval(230, 450), abr: this.randomIntFromInterval(230, 450), mai: this.randomIntFromInterval(230, 450), jun: this.randomIntFromInterval(230, 450), jul: this.randomIntFromInterval(230, 450), ago: this.randomIntFromInterval(230, 450), set: this.randomIntFromInterval(230, 450), out: this.randomIntFromInterval(230, 450), nov: this.randomIntFromInterval(230, 450), dez: this.randomIntFromInterval(230, 450) },
                                                            { day: "11", jan: this.randomIntFromInterval(230, 450), fev: this.randomIntFromInterval(230, 450), mar: this.randomIntFromInterval(230, 450), abr: this.randomIntFromInterval(230, 450), mai: this.randomIntFromInterval(230, 450), jun: this.randomIntFromInterval(230, 450), jul: this.randomIntFromInterval(230, 450), ago: this.randomIntFromInterval(230, 450), set: this.randomIntFromInterval(230, 450), out: this.randomIntFromInterval(230, 450), nov: this.randomIntFromInterval(230, 450), dez: this.randomIntFromInterval(230, 450) },
                                                            { day: "12", jan: this.randomIntFromInterval(230, 450), fev: this.randomIntFromInterval(230, 450), mar: this.randomIntFromInterval(230, 450), abr: this.randomIntFromInterval(230, 450), mai: this.randomIntFromInterval(230, 450), jun: this.randomIntFromInterval(230, 450), jul: this.randomIntFromInterval(230, 450), ago: this.randomIntFromInterval(230, 450), set: this.randomIntFromInterval(230, 450), out: this.randomIntFromInterval(230, 450), nov: this.randomIntFromInterval(230, 450), dez: this.randomIntFromInterval(230, 450) },
                                                            { day: "13", jan: this.randomIntFromInterval(230, 450), fev: this.randomIntFromInterval(230, 450), mar: this.randomIntFromInterval(230, 450), abr: this.randomIntFromInterval(230, 450), mai: this.randomIntFromInterval(230, 450), jun: this.randomIntFromInterval(230, 450), jul: this.randomIntFromInterval(230, 450), ago: this.randomIntFromInterval(230, 450), set: this.randomIntFromInterval(230, 450), out: this.randomIntFromInterval(230, 450), nov: this.randomIntFromInterval(230, 450), dez: this.randomIntFromInterval(230, 450) },
                                                            { day: "14", jan: this.randomIntFromInterval(230, 450), fev: this.randomIntFromInterval(230, 450), mar: this.randomIntFromInterval(230, 450), abr: this.randomIntFromInterval(230, 450), mai: this.randomIntFromInterval(230, 450), jun: this.randomIntFromInterval(230, 450), jul: this.randomIntFromInterval(230, 450), ago: this.randomIntFromInterval(230, 450), set: this.randomIntFromInterval(230, 450), out: this.randomIntFromInterval(230, 450), nov: this.randomIntFromInterval(230, 450), dez: this.randomIntFromInterval(230, 450) },
                                                            { day: "15", jan: this.randomIntFromInterval(230, 450), fev: this.randomIntFromInterval(230, 450), mar: this.randomIntFromInterval(230, 450), abr: this.randomIntFromInterval(230, 450), mai: this.randomIntFromInterval(230, 450), jun: this.randomIntFromInterval(230, 450), jul: this.randomIntFromInterval(230, 450), ago: this.randomIntFromInterval(230, 450), set: this.randomIntFromInterval(230, 450), out: this.randomIntFromInterval(230, 450), nov: this.randomIntFromInterval(230, 450), dez: this.randomIntFromInterval(230, 450) },
                                                            { day: "16", jan: this.randomIntFromInterval(230, 450), fev: this.randomIntFromInterval(230, 450), mar: this.randomIntFromInterval(230, 450), abr: this.randomIntFromInterval(230, 450), mai: this.randomIntFromInterval(230, 450), jun: this.randomIntFromInterval(230, 450), jul: this.randomIntFromInterval(230, 450), ago: this.randomIntFromInterval(230, 450), set: this.randomIntFromInterval(230, 450), out: this.randomIntFromInterval(230, 450), nov: this.randomIntFromInterval(230, 450), dez: this.randomIntFromInterval(230, 450) },
                                                            { day: "17", jan: this.randomIntFromInterval(230, 450), fev: this.randomIntFromInterval(230, 450), mar: this.randomIntFromInterval(230, 450), abr: this.randomIntFromInterval(230, 450), mai: this.randomIntFromInterval(230, 450), jun: this.randomIntFromInterval(230, 450), jul: this.randomIntFromInterval(230, 450), ago: this.randomIntFromInterval(230, 450), set: this.randomIntFromInterval(230, 450), out: this.randomIntFromInterval(230, 450), nov: this.randomIntFromInterval(230, 450), dez: this.randomIntFromInterval(230, 450) },
                                                            { day: "18", jan: this.randomIntFromInterval(230, 450), fev: this.randomIntFromInterval(230, 450), mar: this.randomIntFromInterval(230, 450), abr: this.randomIntFromInterval(230, 450), mai: this.randomIntFromInterval(230, 450), jun: this.randomIntFromInterval(230, 450), jul: this.randomIntFromInterval(230, 450), ago: this.randomIntFromInterval(230, 450), set: this.randomIntFromInterval(230, 450), out: this.randomIntFromInterval(230, 450), nov: this.randomIntFromInterval(230, 450), dez: this.randomIntFromInterval(230, 450) },
                                                            { day: "19", jan: this.randomIntFromInterval(230, 450), fev: this.randomIntFromInterval(230, 450), mar: this.randomIntFromInterval(230, 450), abr: this.randomIntFromInterval(230, 450), mai: this.randomIntFromInterval(230, 450), jun: this.randomIntFromInterval(230, 450), jul: this.randomIntFromInterval(230, 450), ago: this.randomIntFromInterval(230, 450), set: this.randomIntFromInterval(230, 450), out: this.randomIntFromInterval(230, 450), nov: this.randomIntFromInterval(230, 450), dez: this.randomIntFromInterval(230, 450) },
                                                            { day: "20", jan: this.randomIntFromInterval(230, 450), fev: this.randomIntFromInterval(230, 450), mar: this.randomIntFromInterval(230, 450), abr: this.randomIntFromInterval(230, 450), mai: this.randomIntFromInterval(230, 450), jun: this.randomIntFromInterval(230, 450), jul: this.randomIntFromInterval(230, 450), ago: this.randomIntFromInterval(230, 450), set: this.randomIntFromInterval(230, 450), out: this.randomIntFromInterval(230, 450), nov: this.randomIntFromInterval(230, 450), dez: this.randomIntFromInterval(230, 450) },
                                                            { day: "21", jan: this.randomIntFromInterval(230, 450), fev: this.randomIntFromInterval(230, 450), mar: this.randomIntFromInterval(230, 450), abr: this.randomIntFromInterval(230, 450), mai: this.randomIntFromInterval(230, 450), jun: this.randomIntFromInterval(230, 450), jul: this.randomIntFromInterval(230, 450), ago: this.randomIntFromInterval(230, 450), set: this.randomIntFromInterval(230, 450), out: this.randomIntFromInterval(230, 450), nov: this.randomIntFromInterval(230, 450), dez: this.randomIntFromInterval(230, 450) },
                                                            { day: "22", jan: this.randomIntFromInterval(230, 450), fev: this.randomIntFromInterval(230, 450), mar: this.randomIntFromInterval(230, 450), abr: this.randomIntFromInterval(230, 450), mai: this.randomIntFromInterval(230, 450), jun: this.randomIntFromInterval(230, 450), jul: this.randomIntFromInterval(230, 450), ago: this.randomIntFromInterval(230, 450), set: this.randomIntFromInterval(230, 450), out: this.randomIntFromInterval(230, 450), nov: this.randomIntFromInterval(230, 450), dez: this.randomIntFromInterval(230, 450) },
                                                            { day: "23", jan: this.randomIntFromInterval(230, 450), fev: this.randomIntFromInterval(230, 450), mar: this.randomIntFromInterval(230, 450), abr: this.randomIntFromInterval(230, 450), mai: this.randomIntFromInterval(230, 450), jun: this.randomIntFromInterval(230, 450), jul: this.randomIntFromInterval(230, 450), ago: this.randomIntFromInterval(230, 450), set: this.randomIntFromInterval(230, 450), out: this.randomIntFromInterval(230, 450), nov: this.randomIntFromInterval(230, 450), dez: this.randomIntFromInterval(230, 450) },
                                                            { day: "24", jan: this.randomIntFromInterval(230, 450), fev: this.randomIntFromInterval(230, 450), mar: this.randomIntFromInterval(230, 450), abr: this.randomIntFromInterval(230, 450), mai: this.randomIntFromInterval(230, 450), jun: this.randomIntFromInterval(230, 450), jul: this.randomIntFromInterval(230, 450), ago: this.randomIntFromInterval(230, 450), set: this.randomIntFromInterval(230, 450), out: this.randomIntFromInterval(230, 450), nov: this.randomIntFromInterval(230, 450), dez: this.randomIntFromInterval(230, 450) },
                                                            { day: "25", jan: this.randomIntFromInterval(230, 450), fev: this.randomIntFromInterval(230, 450), mar: this.randomIntFromInterval(230, 450), abr: this.randomIntFromInterval(230, 450), mai: this.randomIntFromInterval(230, 450), jun: this.randomIntFromInterval(230, 450), jul: this.randomIntFromInterval(230, 450), ago: this.randomIntFromInterval(230, 450), set: this.randomIntFromInterval(230, 450), out: this.randomIntFromInterval(230, 450), nov: this.randomIntFromInterval(230, 450), dez: this.randomIntFromInterval(230, 450) },
                                                            { day: "26", jan: this.randomIntFromInterval(230, 450), fev: this.randomIntFromInterval(230, 450), mar: this.randomIntFromInterval(230, 450), abr: this.randomIntFromInterval(230, 450), mai: this.randomIntFromInterval(230, 450), jun: this.randomIntFromInterval(230, 450), jul: this.randomIntFromInterval(230, 450), ago: this.randomIntFromInterval(230, 450), set: this.randomIntFromInterval(230, 450), out: this.randomIntFromInterval(230, 450), nov: this.randomIntFromInterval(230, 450), dez: this.randomIntFromInterval(230, 450) },
                                                            { day: "27", jan: this.randomIntFromInterval(230, 450), fev: this.randomIntFromInterval(230, 450), mar: this.randomIntFromInterval(230, 450), abr: this.randomIntFromInterval(230, 450), mai: this.randomIntFromInterval(230, 450), jun: this.randomIntFromInterval(230, 450), jul: this.randomIntFromInterval(230, 450), ago: this.randomIntFromInterval(230, 450), set: this.randomIntFromInterval(230, 450), out: this.randomIntFromInterval(230, 450), nov: this.randomIntFromInterval(230, 450), dez: this.randomIntFromInterval(230, 450) },
                                                            { day: "28", jan: this.randomIntFromInterval(230, 450), fev: this.randomIntFromInterval(230, 450), mar: this.randomIntFromInterval(230, 450), abr: this.randomIntFromInterval(230, 450), mai: this.randomIntFromInterval(230, 450), jun: this.randomIntFromInterval(230, 450), jul: this.randomIntFromInterval(230, 450), ago: this.randomIntFromInterval(230, 450), set: this.randomIntFromInterval(230, 450), out: this.randomIntFromInterval(230, 450), nov: this.randomIntFromInterval(230, 450), dez: this.randomIntFromInterval(230, 450) },
                                                            { day: "29", jan: this.randomIntFromInterval(230, 450), fev: "-", mar: this.randomIntFromInterval(230, 450), abr: this.randomIntFromInterval(230, 450), mai: this.randomIntFromInterval(230, 450), jun: this.randomIntFromInterval(230, 450), jul: this.randomIntFromInterval(230, 450), ago: this.randomIntFromInterval(230, 450), set: this.randomIntFromInterval(230, 450), out: this.randomIntFromInterval(230, 450), nov: this.randomIntFromInterval(230, 450), dez: this.randomIntFromInterval(230, 450) },
                                                            { day: "30", jan: this.randomIntFromInterval(230, 450), fev: "-", mar: this.randomIntFromInterval(230, 450), abr: this.randomIntFromInterval(230, 450), mai: this.randomIntFromInterval(230, 450), jun: this.randomIntFromInterval(230, 450), jul: this.randomIntFromInterval(230, 450), ago: this.randomIntFromInterval(230, 450), set: this.randomIntFromInterval(230, 450), out: this.randomIntFromInterval(230, 450), nov: this.randomIntFromInterval(230, 450), dez: this.randomIntFromInterval(230, 450) },
                                                            { day: "31", jan: this.randomIntFromInterval(230, 450), fev: "-", mar: this.randomIntFromInterval(230, 450), abr: "-", mai: this.randomIntFromInterval(230, 450), jun: "-", jul: this.randomIntFromInterval(230, 450), ago: this.randomIntFromInterval(230, 450), set: "-", out: this.randomIntFromInterval(230, 450), nov: "-", dez: this.randomIntFromInterval(230, 450) },
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
                                                </>}
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