import React, { Component } from 'react';
import { Container, Row, Col, Card } from "react-bootstrap";
import { decodeToken } from '../../config/auth';
import Layout from '../../components/Layout';
import Header from '../../components/Header';
import Widget from "../../components/Widget";
import IconFreezer from "../../assets/img/freezer.svg";
import api from "../../config/api";
import Highcharts from 'highcharts';
import moment from "moment";
import HighchartsReact from 'highcharts-react-official';
import { calcularConsumo, calcularTempo } from '../../config/utils';
// import data from "../../config/data";
// import Alert from '../../components/Alert';
// import EquipmentHome from '../../components/EquipmentHome';

export default class Home extends Component {

    state = {
        user: decodeToken(),
        consumoArr: [],
        month: ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"],
        equipments: [],

    }

    componentDidMount() {
        this.getEquipments();
        this.getMeasurement();
    }

    getEquipments = async () => {
        const response = await api.get("/equipment");
        this.setState({ equipments: response.data });
    }

    getMeasurement = async () => {
        const response = await api.get("/measurement");
        this.setState({ measurements: response.data });
        this.createChart()
    }

    createChart = () => {
        const { measurements, month } = this.state;
        const arr = [];
        const consumoArr = []
        for (let i = 0; i < month.length; i++) {
            arr.push({
                month: month[i],
                data: measurements.filter(item => new Date(item.date).getMonth() === i)
            });
        }
        for (let i = 0; i < arr.length; i++) {
            let total = 0;
            for (let j = 0; j < arr[i].data.length; j++) {
                const data = arr[i].data[j];
                total += calcularConsumo(data.date, data.power, 30)
            }
            consumoArr.push(total);
        }
        this.setState({ consumoArr });
    }

    render() {
        const { user } = this.state.user;
        const { equipments, consumoArr, month } = this.state;

        const options = {
            colors: ['#31b88a'],
            chart: {
                type: 'column'
            },
            title: {
                text: 'Consumo Mensal'
            },
            subtitle: {
                text: ''
            },
            xAxis: { categories: month, crosshair: true },
            yAxis: {
                min: 0,
                title: {
                    text: 'KWh'
                }
            },
            tooltip: {
                headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
                pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                    '<td style="padding:0"><b>{point.y:.1f} kWh</b></td></tr>',
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
            series: [{
                name: 'Consumo Mensal',
                data: consumoArr
            }]
            // consumoArr
        }

        return (
            <>
                <Layout>
                    <Header title={`Bem vindo, ${user.name}`} />
                    <Container fluid>
                        <Row>
                            <Col xs={12} lg={6}>
                                <Widget icon={IconFreezer} name={"Total de Equipamentos"} value={equipments.length} />
                            </Col>
                            {/* <Col xs={12} lg={6}>
                                <Widget icon={IconPowerBattery} name={"Consumo no Mês"} value={`${0} kWh`} />
                            </Col> */}
                        </Row>
                        {<Row className="mb-4">
                            <Col xs={12} lg={6} className="text-center">
                                <Card className="border-0 rounded shadow-sm h-100 justify-content-end pr-4">
                                    <Card.Body>
                                        <HighchartsReact
                                            highcharts={Highcharts}
                                            options={options}
                                        />
                                        <br />
                                        {//<Link to={"/dashboard"} className="small mt-2">Ir para Dashboards</Link>
                                        }
                                    </Card.Body>
                                </Card>
                            </Col>

                        </Row>
                        /*<Row>
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