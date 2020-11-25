import React, { Component } from 'react';
import { Container, Row, Col, Card, Button, Form } from "react-bootstrap";
import Layout from '../../../components/Layout';
import Header from '../../../components/Header';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import MaterialIcon from "material-icons-react";
import Select from 'react-select';
import moment from "moment";
import { ExportToCsv } from 'export-to-csv';
import api from "../../../config/api";

export default class DashboardAlert extends Component {

    state = {
        startDate: '',
        endDate: '',
        brands: [],
        brand: [],
        show: false,
        equipments: [],
        alerts: [],
        data_chart: [],
    }

    componentDidMount() {
        this.getEquipments();
    }

    getAlerts = async () => {
        const response = await api.get("/notification");
        this.setState({ alerts: response.data });
        this.createChart();
    }

    getEquipments = async () => {
        const response = await api.get("/equipment");
        this.setState({ equipments: response.data });
        this.getAlerts();
        const brands = [];
        const { data } = response;
        for (let i = 0; i < data.length; i++) {
            let add = true;
            for (let j = 0; j < brands.length; j++) {
                if (brands[j].value === data[i].name) {
                    add = false;
                }
            }
            if (add) {
                brands.push({ value: data[i].brand, label: data[i].brand })
            }
        }
        this.setState({ brands });
    }

    createChart = (brand = this.state.brand, startDate = this.state.startDate, endDate = this.state.endDate) => {
        const arr = [];
        let { equipments, alerts } = this.state;

        if (brand !== null) {
            if (brand.length !== 0) {
                const b = brand.map(item => item.value);
                equipments = equipments.filter(equipment => b.indexOf(equipment.brand) !== -1)
            }
        }

        if (startDate !== "") {
            const dateFilter = moment(new Date(startDate));
            alerts = alerts.filter(alert => {
                const dateAlert = moment(new Date(alert.created_at));
                const duration = moment.duration(dateFilter.diff(dateAlert));
                const days = duration.asDays();
                return (days <= 0) ? alert : "";
            })
        }
        if (endDate !== "") {
            const dateFilter = moment(new Date(endDate));
            alerts = alerts.filter(alert => {
                const dateAlert = moment(new Date(alert.created_at));
                const duration = moment.duration(dateFilter.diff(dateAlert));
                const days = duration.asDays();
                return (days >= 0) ? alert : "";
            })
        }

        for (let i = 0; i < equipments.length; i++) {
            arr.push({
                name: equipments[i].name,
                total: alerts.filter(alert => alert.equipment_id === equipments[i].id),
            })
        }

        const titles = [];
        for (let i = 0; i < arr.length; i++) {
            const { total } = arr[i];
            for (let j = 0; j < total.length; j++) {
                titles.push(total[j].title);
            }
        }
        const items = [...new Set(titles)];

        const data_chart = [];
        for (let i = 0; i < items.length; i++) {
            let total = 0;
            for (let j = 0; j < arr.length; j++) {
                total += arr[j].total.filter(item => item.title === items[i]).length;
            }
            data_chart.push({ name: items[i], y: total })
        }
        this.setState({ data_chart });
    }

    filterDate = (event) => {
        this.setState({ [event.target.name]: event.target.value });
        const { startDate, endDate, brand } = this.state;
        if (event.target.name === "startDate") {
            this.createChart(brand, event.target.value, endDate)
        }
        if (event.target.name === "endDate") {
            this.createChart(brand, startDate, event.target.value)
        }
    }

    filterBrand = brand => {
        this.setState({ brand });
        this.createChart(brand);
    }

    export = () => {
        const { data_chart } = this.state;
        const data = [];
        for (let i = 0; i < data_chart.length; i++) {
            data.push({
                alerta: data_chart[i].name,
                total: data_chart[i].y
            });
        }
        const options = {
            fieldSeparator: ',',
            quoteStrings: '"',
            decimalSeparator: '.',
            showLabels: true,
            showTitle: true,
            title: 'Total de alertas',
            useTextFile: false,
            useBom: true,
            useKeysAsHeaders: true
        };
        const csvExporter = new ExportToCsv(options);
        csvExporter.generateCsv(data);
    }

    handleFilter = () => this.setState({ show: !this.state.show });

    render() {
        const { startDate, endDate, brand, brands, show, data_chart = [] } = this.state;

        const pieColors = (function () {
            let colors = [],
                base = "#31b88a",
                i;

            for (i = 0; i < 10; i += 1) {
                colors.push(Highcharts.color(base).brighten((i - 3) / 7).get());
            }
            return colors;
        }());

        const options = {
            chart: {
                plotBackgroundColor: null,
                plotBorderWidth: null,
                plotShadow: false,
                type: 'pie'
            },
            credits: {
                enabled: false
            },
            title: {
                text: ''
            },
            tooltip: {
                pointFormat: '{series.name}: <b>{point.y}</b>'
            },
            accessibility: {
                point: {
                    valueSuffix: ''
                }
            },
            plotOptions: {
                pie: {
                    allowPointSelect: true,
                    cursor: 'pointer',
                    colors: pieColors,
                    dataLabels: {
                        enabled: true,
                        format: '<b>{point.name}</b>: {point.y}'
                    }
                }
            },
            series: [{
                name: 'Total',
                colorByPoint: true,
                data: data_chart
            }]
        }

        return (
            <>
                <Layout>
                    <Header title="Dashboard de Alertas">
                        <Button variant="muted" onClick={() => this.handleFilter()} className="bg-white" style={{ fontSize: "24px", lineHeight: 0 }}><MaterialIcon icon="filter_alt" /></Button>
                        <Button variant="success" onClick={() => this.export()} className="ml-3">Exportar</Button>
                    </Header>
                    <Container fluid>
                        <Row className={(show) ? "d-flex mb-4" : "d-none mb-4"} >
                            <Col xs={12} >
                                <Form>
                                    <Row className="justify-content-end">
                                        <Col xs={12} lg={6}>
                                            <Form.Label className="text-muted small">Marca</Form.Label>
                                            <Select name="brand" value={brand} onChange={this.filterBrand.bind(this)} options={brands} isMulti />
                                        </Col>
                                        <Col xs={12} lg={3}>
                                            <Form.Label className="text-muted small">Data inicial</Form.Label>
                                            <Form.Control type="date" name="startDate" value={startDate} onChange={this.filterDate.bind(this)} className="border-0 shadow-sm" />
                                        </Col>
                                        <Col xs={12} lg={3}>
                                            <Form.Label className="text-muted small">Data final</Form.Label>
                                            <Form.Control type="date" name="endDate" value={endDate} onChange={this.filterDate.bind(this)} className="border-0 shadow-sm" />
                                        </Col>
                                    </Row>

                                </Form>
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={12}>
                                <Card className="border-0 rounded shadow-sm h-100 justify-content-end pr-4 w-100">
                                    <Card.Body>
                                        <HighchartsReact
                                            highcharts={Highcharts}
                                            options={options}
                                        />
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