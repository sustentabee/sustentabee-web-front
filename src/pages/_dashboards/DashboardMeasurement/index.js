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
import { calcularConsumo, calcularTempo } from '../../../config/utils';
import api from "../../../config/api";

export default class DashboardMeasurement extends Component {

    state = {
        categories: [],
        totalConsumo: [],
        startDate: '',
        endDate: '',
        brands: [],
        brand: [],
        show: false,
        equipments: []
    }

    componentDidMount() {
        this.getEquipments();
    }

    getMeasurement = async () => {
        const response = await api.get("/measurement");
        this.setState({ measurements: response.data });
        this.createChart();
    }

    getEquipments = async () => {
        const response = await api.get("/equipment");
        this.setState({ equipments: response.data });
        this.getMeasurement();
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
        let { equipments, measurements } =  this.state;

        if (brand !== null) {
            if (brand.length !== 0) {
                const b = brand.map(item => item.value);
                equipments = equipments.filter(equipment => b.indexOf(equipment.brand) !== -1)
            }
        }

        if (startDate !== "") {
            const dateFilter = moment(new Date(startDate));
            measurements = measurements.filter(measurement => {
                const dateMaintenance = moment(new Date(measurement.created_at));
                const duration = moment.duration(dateFilter.diff(dateMaintenance));
                const days = duration.asDays();
                return (days <= 0) ? measurement : "";
            })
        }
        if (endDate !== "") {
            const dateFilter = moment(new Date(endDate));
            measurements = measurements.filter(measurement => {
                const dateMaintenance = moment(new Date(measurement.date));
                const duration = moment.duration(dateFilter.diff(dateMaintenance));
                const days = duration.asDays();
                return (days >= 0) ? measurement : "";
            })
        }


        for (let i = 0; i < equipments.length; i++) {
            console.log(equipments.length);
            let totalConsumo = 0;
            let consumo = measurements.map(measurement => (measurement.name === equipments[i].name) ? calcularConsumo(calcularTempo(measurement.created_at, measurement.updated_at), measurement.power, 1) : 0);
           
            for (let i = 0; i < consumo.length; i++) {
                totalConsumo += parseFloat(consumo[i]);
            }
    
            arr.push({
                name: equipments[i].name,
                total: totalConsumo
            })
        }
        const totalConsumo = [], categories = [];
        for (let i = 0; i < arr.length; i++) {
            categories.push(arr[i].name);
            totalConsumo.push(arr[i].total);
        }
        this.setState({ totalConsumo, categories })
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
        const { totalConsumo, categories } = this.state;
        const data = [];
        for (let i = 0; i < categories.length; i++) {
            data.push({
                equipamento: categories[i],
                consumo: totalConsumo[i]
            });
        }
        const options = {
            fieldSeparator: ',',
            quoteStrings: '"',
            decimalSeparator: '.',
            showLabels: true,
            showTitle: true,
            title: 'Total de medições por equipamento',
            useTextFile: false,
            useBom: true,
            useKeysAsHeaders: true
        };
        const csvExporter = new ExportToCsv(options);
        csvExporter.generateCsv(data);
    }

    handleFilter = () => this.setState({ show: !this.state.show });

    render() {
        const { categories, totalConsumo, startDate, endDate, brand, brands, show } = this.state;

        const options = {
            colors: ['#7FFF7F', "#333", "grey"],
            credits: {
                enabled: false
            },
            chart: {
                type: 'bar',
                height: '50%'
            },
            title: {
                text: 'Total de medições por equipamento'
            },
            xAxis: { categories: categories, crosshair: true },
            yAxis: [{ className: 'highcharts-color-0', min: 0, title: { text: '' } }],
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
                { name: "Consumo", data: totalConsumo },
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
                    <Header title="Dashboard de Medição">
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