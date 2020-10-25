import React, { Component } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { decodeToken } from "../../config/auth";
import Layout from "../../components/Layout";
import Header from "../../components/Header";
import Widget from "../../components/Widget";
import api from "../../config/api";
import Alert from '../../components/Alert';
import EquipmentHome from '../../components/EquipmentHome';
import io from "socket.io-client";
import { Link } from "react-router-dom";
require('dotenv').config();

export default class Home extends Component {
    state = {
        user: decodeToken(),
        consumoArr: [],
        month: [ "Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez", ],
        equipments: [],
        notifications: [],
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
    };

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

    render() {
        const { user } = this.state.user;
        const { equipments, notifications } = this.state;

        return (
            <>
                <Layout>
                    <Header title={`Bem vindo, ${user.name}`} />
                    <Container fluid>
                        <Row>
                            <Col xs={12} lg={6}>
                                <Widget name={"Total de Equipamentos"} value={equipments.length} />
                            </Col>
                            <Col xs={12} lg={6}>
                                <Widget name={"Consumo no Mês (kWh)"} value={`${0}`} />
                            </Col>
                        </Row>
                        <Row className="mb-4">
                            <Col xs={12} lg={6} className="text-center">
                                {/* <Card className="border-0 rounded shadow-sm h-100 justify-content-end pr-4">
                                    <Card.Body>
                                        
                                    </Card.Body>
                                </Card> */}
                            </Col>
                            <Col xs={12} lg={6} className="mt-5 mt-lg-0">
                                <Row className="mb-3">
                                    <Col xs={12} className="">
                                        <h6 className="mb-0">Alertas</h6>
                                    </Col>
                                </Row>
                                <Row className="home-card">
                                    <Col xs={12} className="">
                                        {notifications.map((alert, index) => (
                                            <Alert alert={alert} key={index} />
                                        ))}
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
                                            if(index < 6){
                                                return (
                                                    <Col xs={12} lg={4} className="mb-4" key={index}>
                                                        <EquipmentHome equipment={equipment} />
                                                    </Col>
                                                )
                                            }
                                            return <></>;
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
