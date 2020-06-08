import React, { Component } from 'react';
import { Container, Row, Col, Card } from "react-bootstrap";
import Layout from '../../components/Layout';
import Header from '../../components/Header';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import Multiselect from 'react-bootstrap-multiselect'
// import DatePicker from 'react-bootstrap-date-picker'
import './dashboardFilter.css';
import "../../../node_modules/react-bootstrap-multiselect/css/bootstrap-multiselect.css"

export default class Dashboard extends Component {
    constructor(props) {
        super(props);

        this.state = {
            large: [{ value: 'One' }, { value: 'Two' }, { value: 'Three' }, { value: 'Four', label: 'Four Label' }],
            email: '',
            company: '',
            isFilterBarOpened: false
        }
    }

    componentDidMount() {
        const email = localStorage.getItem("email");
        const company = localStorage.getItem("company");
        this.setState({ email, company });
    }

    toggleFilterBar() {
        this.setState({ isFilterBarOpened: !this.state.isFilterBarOpened })
    }

    render() {
        const options = {
            colors: ['#7FFF7F', '#333'],
            chart: {
                type: 'line',
                height: '43%'
            },
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
                    <Header title="Dashboard interativo" />
                    <Container fluid>
                        <Row>
                            <Card className="border-0 rounded shadow-sm h-100 justify-content-end pr-4 w-100">
                                <Card.Body>
                                    <HighchartsReact
                                        highcharts={Highcharts}
                                        options={options}
                                    />
                                </Card.Body>
                            </Card>
                        </Row>
                        <Row>
                            <div className={"filter" + (this.state.isFilterBarOpened ? " filter-opened" : "")}>
                                <div className="filter-handle" align="center" onClick={() => this.toggleFilterBar()}>Filtros rápidos</div>
                                <div className="filter-container">
                                    <Container fluid>
                                        <Row>
                                            <Col xs={5}>
                                                <Row>
                                                    <Col>
                                                        <span className="font-weight-bold">Por equipamento:</span>
                                                        <Multiselect
                                                            data={this.state.large}
                                                            multiple
                                                        />
                                                    </Col>
                                                </Row>
                                                <Row>
                                                    <Col>
                                                        <span className="font-weight-bold">Por fabricante:</span>
                                                        <Multiselect
                                                            data={this.state.large}
                                                            multiple
                                                        />
                                                    </Col>
                                                </Row>
                                                <Row>
                                                    <Col>
                                                        <span className="font-weight-bold">Por modelo:</span>
                                                        <Multiselect
                                                            data={this.state.large}
                                                            multiple
                                                        />
                                                    </Col>
                                                </Row>
                                            </Col>
                                            <Col>
                                                <Row><Col className="font-weight-bold">Por data de medição:</Col></Row><br />
                                                <Row>
                                                    <Col className="font-weight-bold">Até:</Col>
                                                    <input type="date" />
                                                </Row>
                                                <Row>
                                                    <Col className="font-weight-bold">De:</Col>
                                                    <input type="date" />
                                                </Row>
                                            </Col>
                                            <Col>
                                                <Row className="font-weight-bold"><Col>Por data de Fabricação:</Col></Row><br />
                                                <Row>
                                                    <Col className="font-weight-bold">Até:</Col>
                                                    <input type="date" />
                                                </Row>
                                                <Row>
                                                    <Col className="font-weight-bold">De:</Col>
                                                    <input type="date" />
                                                </Row>
                                            </Col>
                                        </Row>
                                    </Container>
                                </div>
                            </div>
                        </Row>
                    </Container>
                </Layout>
            </>
        )
    }
}