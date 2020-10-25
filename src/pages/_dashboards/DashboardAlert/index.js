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
        categories: [],
        totalAlerts: [],
        totalAlertsDanger: [],
        totalAlertsWarning: [],
        totalAlertsSuccess: [],
        startDate: '',
        endDate: '',
        brands: [],
        brand: [],
        show: false,
        equipments: [],
        alerts: [],
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
        const totalAlerts = [], totalAlertsDanger = [], totalAlertsWarning = [], totalAlertsSuccess = [], categories = [];
        for (let i = 0; i < arr.length; i++) {
            categories.push(arr[i].name);
            totalAlerts.push(arr[i].total.length);
            totalAlertsDanger.push(arr[i].total.filter(item => item.type === "danger").length);
            totalAlertsWarning.push(arr[i].total.filter(item => item.type === "warning").length);
            totalAlertsSuccess.push(arr[i].total.filter(item => item.type === "success").length);
        }
        this.setState({ totalAlerts, totalAlertsDanger, totalAlertsWarning, totalAlertsSuccess, categories })
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
        const { totalAlerts, totalAlertsDanger, totalAlertsWarning, totalAlertsSuccess, categories } = this.state;
        const data = [];
        for (let i = 0; i < categories.length; i++) {
            data.push({
                equipamento: categories[i],
                total: totalAlerts[i],
                danger: totalAlertsDanger[i],
                warning: totalAlertsWarning[i],
                success: totalAlertsSuccess[i],
            });
        }
        const options = {
            fieldSeparator: ',',
            quoteStrings: '"',
            decimalSeparator: '.',
            showLabels: true,
            showTitle: true,
            title: 'Total de alertas por equipamento',
            useTextFile: false,
            useBom: true,
            useKeysAsHeaders: true
        };
        const csvExporter = new ExportToCsv(options);
        csvExporter.generateCsv(data);
    }

    handleFilter = () => this.setState({ show: !this.state.show });

    render() {
        const { categories, totalAlerts, totalAlertsDanger, totalAlertsWarning, totalAlertsSuccess, startDate, endDate, brand, brands, show } = this.state;

        const options = {
            colors: ['#31b88a', "#A00", "rgb(255, 140, 0)", "#0A0"],
            credits: {
                enabled: false
            },
            chart: {
                type: 'bar',
                height: '50%'
            },
            title: {
                text: 'Total de alertas por equipamento'
            },
            xAxis: { categories: categories, crosshair: true },
            yAxis: [{ className: 'highcharts-color-0', min: 0, allowDecimals: false, title: { text: '' } }],
            tooltip: {
                headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
                pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                    '<td style="padding:0"><b> {point.y}</b></td></tr>',
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
                { name: "Total", data: totalAlerts },
                { name: "Urgente", data: totalAlertsDanger },
                { name: "Atenção", data: totalAlertsWarning },
                { name: "Bom", data: totalAlertsSuccess },
            ],

            responsive: {
                rules: [{
                    condition: {
                        maxWidth: 500
                    },
                    chartOptions: {
                        chart: {
                            height: '800px'
                        },
                    }
                }]
            }
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