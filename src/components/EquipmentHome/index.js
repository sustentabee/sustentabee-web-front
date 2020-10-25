import React, { Component } from 'react';
import { Row, Col, Image, Card } from "react-bootstrap";
import IconFreezer from "../../assets/img/freezer.svg";
import { Link } from 'react-router-dom';

export default class EquipmentHome extends Component {

    render() {
        const { equipment = [] } = this.props;

        return (
            <Link to={`equipamento/${equipment.id}/dashboard`} style={{ textDecoration: "none" }}>
                <Card className="border-0 shadow-sm">
                    <Card.Body>
                        <Row className="align-items-center">
                            <Col xs={4}>
                                <Row>
                                    <Col xs={12} className="d-flex align-items-center justify-content-center">
                                        <Image src={IconFreezer} width={80} />
                                    </Col>
                                </Row>
                            </Col>
                            <Col xs={8}>
                                <Row>
                                    <Col xs={12} className="d-flex align-items-center">
                                        <h6 className="mb-2">{equipment.name}</h6>
                                    </Col>
                                    <Col xs={12} className="d-flex align-items-center">
                                        <h6 className="mb-0 small text-muted">{equipment.brand} - {equipment.model}</h6>
                                    </Col>
                                    <Col xs={12} className="d-flex align-items-center">
                                        <p className="mb-0 small text-muted">Serial: {equipment.serial}</p>
                                    </Col>
                                    <Col xs={12} className="d-flex align-items-center">
                                        <p className="mb-0 small text-muted">Potência: {equipment.potency} W</p>
                                    </Col>
                                    <Col xs={12} className="d-flex align-items-center">
                                        <p className="mb-0 small text-muted">Tensão: {equipment.voltage} V</p>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </Card.Body>
                </Card>
            </Link>
        )
    }
}